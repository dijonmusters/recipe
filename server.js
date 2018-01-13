const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const dev = app.get('env') !== 'production';
console.log(dev)
if (dev) {
  app.use(morgan('dev'));
} else {
  app.disable('x-powered-by');
  app.use(compression());
  app.use(morgan('common'));
  app.use(express.static(path.resolve(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
