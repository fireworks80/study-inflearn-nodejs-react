const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const User = require('./models/User');
const config = require('./config/key');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// application/json
app.use(bodyParser.json());

app.use(cookieParser());

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('mongodb connect....'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('hello world !!'));

app.post('/register', (req, res) => { 
  // 회원 가입 정보를 client에서 받아서 db에 넣어 준다.

  const user = new User(req.body);

  user.save((err, userInfo) => { 
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    });
  });
});

app.post('/login', (req, res) => { 
  // 요청 이메일이 db에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => { 
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저 없음'
      });
    }

    // 요청된 이메일이 db에 있다면 pw가 맞는지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ loginSuccess: false, message: '비밀번호가 틀렸다'});
      }
      // pw까지 맞다면 token을 생성하기

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. where ? cookie, localstorage
        res.cookie('x_auth', user.token).status(200).json({loginSuccess: true, userId: user._id});
      });
    });
  });


});


app.listen(port, () => { 
  console.log(`listening port ls ${port}`);
});


