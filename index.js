const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// application/json
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://seungchulhan800624:avalon1!@cluster0.43cuz.mongodb.net/<dbname>?retryWrites=true&w=majority', {
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

app.listen(port, () => { 
  console.log(`listening port ls ${port}`);
});


