const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const User = require('./models/User');
const config = require('./config/key');
const auth = require('./middleware/auth');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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

// cors 허용 방법 1 - 헤더를 변경
// app.all('/*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });


app.get('/', (req, res) => res.send('hello world !!'));

app.get('/api/hello', (req, res) => {
  res.send('안녕하세요');
});


app.post('/api/users/register', (req, res) => { 
  // 회원 가입 정보를 client에서 받아서 db에 넣어 준다.

  const user = new User(req.body);

  user.save((err, userInfo) => { 
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    });
  });
});

app.post('/api/users/login', (req, res) => { 
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

app.get('/api/users/auth', auth, (req, res) => { 
  // ahthentication이 true 라는 뜻
  // role 이 0이 아니면 관리자 0 -> 일반 유저

  const { _id, role, email, name, lastname, image} = req.user;
  res.status(200).json({
    _id,
    isAdmin: role ? true : false,
    isAuth: true,
    email,
    name,
    lastname,
    role,
    image
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  // console.log(req);
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => { 
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});


app.listen(port, () => { 
  console.log(`listening port ls ${port}`);
});


