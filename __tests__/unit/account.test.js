/* eslint-disable no-undef */
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe('Account', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('check account funds', async () => {
        const account = await factory.create("Account");
        const funds = account.checkFunds()

        expect(funds).toEqual({ balance: 1000, limit: 500, balanceUsage: 0, limitUsage: 0 })
    })

    it('check account funds using only balance', async () => {
        const account = await factory.create("Account");
        const amount = 50
        const funds = account.checkFunds(amount)

        expect(funds).toEqual({ balance: 1000, limit: 500, balanceUsage: 50, limitUsage: 0 })
    })

    it('check account funds using balance and limit', async () => {
        const account = await factory.create("Account");
        const amount = 1100
        const funds = account.checkFunds(amount)

        expect(funds).toEqual({ balance: 1000, limit: 500, balanceUsage: 1000, limitUsage: 100 })
    })
})