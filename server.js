const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const path = require('path');
const mongoose = require('mongoose');
const Config = require('./config');
const User = require('./models/user');
const app = express();
const dev = app.get('env') !== 'production';
const port = process.env.PORT || 5000;

mongoose.connect(Config.mongoUrl, { useMongoClient: true });

if (dev) {
  app.use(morgan('dev'));
} else {
  app.disable('x-powered-by');
  app.use(compression());
  app.use(morgan('common'));
  app.use(express.static(path.resolve(__dirname, 'build')));
  
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/ping', (req, res) => {
  const test = [5, 7, 9];
  return res.json(test)
});

app.get('/api/recipe', (req, res) => {
  const recipe = { name: "this is data coming from the api" };
  res.json(recipe);
});

app.get('/api/users', (req, res) => {
  console.log('finding users')
  User.find({}, (err, users) => {
    if (err) throw err;
    console.log(users);
    res.send(users);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
