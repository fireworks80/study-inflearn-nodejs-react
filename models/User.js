const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
  password: {
    type: String,
    minlength: 5
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
    // console.log('modify pw');
    bcrypt.genSalt(saltRounds, function (err, salt) { 
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

userSchema.methods.comparePassword = function (plainPassword, cb) { 
  // plainpassword
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) { 
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) { 
  // jsonweebtoken
  const user = this;

  const token = jwt.sign(user._id.toHexString(), 'secretToken');
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;