const { Account } = require('../models')

exports.checkFunds = async (req, res) => {
    try {
        const account = await Account.findByPk(req.params.id)
        const funds = account.checkFunds(Number(req.params.amount))

        res.status(200).send(funds)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.errors);
    }
}
