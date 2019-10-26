const express = require('express');
var bodyParser = require('body-parser')
const app = express();

const { config } = require('./config');
const platziStore = require('./routes')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  let userInfo = req.header("user-agent");
  res.send(`UserInfo: ${userInfo}`);
});

platziStore(app);

app.listen(config.port, err => {
  if (err) {
    console.error("Error: ", err);
    return;
  }
  console.log(`Listening http://localhost:${config.port}`);
});