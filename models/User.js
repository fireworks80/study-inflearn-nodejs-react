const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: true
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

userSchema.pre('save', function(next) { 
  // 비밀번호 암호화
  const user = this;

  if (user.isModified('password')) {

    bcrypt.getSalt(saltRounds, function(err, salt) { 
      if (err) return next(err);
  
      bcrypt.hash(user.password, salt, function (err, hash) { 
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;