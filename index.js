const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://seungchulhan800624:avalon1!@cluster0.43cuz.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('mongodb connect....'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('hello world'));

app.listen(port, () => { 
  console.log(`listening port ls ${port}`);
});

