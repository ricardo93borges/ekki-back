/* eslint-disable no-undef */
/* const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


require('./app/routes/index')(app) */


const app = require('./app')

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => {
  console.log(`running on port ${app.get('port')}`);
});
