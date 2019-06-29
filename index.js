const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

const { User } = require('./app/models');

User.create({ name: 'Ricardo', cpf: '03370173018', phone: '5551998830198' });

User.findByPk(1).then(u => {
  console.log(u)
})


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000);