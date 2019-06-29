const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

const { User } = require('./app/models');
const { Contact } = require('./app/models');
const { Account } = require('./app/models');
const { Status } = require('./app/models');
const { Transfer } = require('./app/models');


const test = async () => {
  let a1 = await Account.create({ number: '12345678', balance: 1000, limit: 500 })
  let a2 = await Account.create({ number: '22345678', balance: 1000, limit: 500 })

  let u1 = await User.create({ name: 'Ricardo', cpf: '03370173018', email: 'r@mail.com', password: '123', phone: '51998830198', accountId: a1.id });
  let u2 = await User.create({ name: 'Borges', cpf: '03370173019', email: 'b@mail.com', password: '123', phone: '51998830199', accountId: a2.id });

  Contact.create({ userId: u1.id, contactId: u2.id })

  let status = await Status.findOne({ where: { name: 'pendent' } })

  Transfer.create({ amount: 500, fromAccountId: u1.id, toAccountId: u2.id, statusId: status.id })
}

const getObjects = async () => {
  //let t = await Transfer.findByPk(1)
  let a = await Account.findByPk(1)
  let u = await User.findByPk(1)
  //let c = await Contact.findByPk(1)
  //console.log(u)
}

//test()
getObjects()


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000);