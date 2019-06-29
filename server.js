/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', (process.env.PORT || 3000));

require('./app/routes/index')(app)

server.listen(app.get('port'), () => {
  console.log(`running on port ${app.get('port')}`);
});