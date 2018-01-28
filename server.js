const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const path = require('path');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');
const multer = require('multer');
const http = require("http");
const Config = require('./config');
const User = require('./models/user');
const Recipe = require('./models/recipe');
const app = express();
const dev = app.get('env') !== 'production';
const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect(Config.mongoUrl, { useMongoClient: true });

cloudinary.config({
  cloud_name: Config.cloudinaryName,
  api_key: Config.cloudinaryApiKey,
  api_secret: Config.cloudinaryApiSecret
});

const upload = multer({ dest: 'uploads/' });

setInterval(function() {
  http.get('https://jon-me-for-dinner.herokuapp.com');
}, 300000); // ping self every 5 minutes (300000)

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

app.get('/api/recipes', (req, res) => {
  Recipe.find({}, (err, recipes) => {
    if (err) throw err;
    res.status(200).send(recipes);
  });
});

app.get('/api/recipes/:id', (req, res) => {
  const { id } = req.params;
  Recipe.findOne({ "_id": id }, (err, recipe) => {
    if (err) throw err;
    res.status(200).send(recipe);
  });
});

app.get('/api/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) throw err;
    res.status(200).send(users);
  });
});

app.post('/api/addrecipe', (req, res) => {
  const recipe = req.body;
  Recipe.insertMany(recipe, (err, response) => {
    err ? res.status(400).send(err) : res.status(200).send(response)
  });
});

app.post('/api/upload-img', upload.single('file'), (req, res) => {
  const file = req.file.path;
  cloudinary.uploader.upload(file, (response) => {
    res.status(200).send({url: response.url});
  });
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
