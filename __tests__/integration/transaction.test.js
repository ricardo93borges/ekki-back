/* eslint-disable no-undef */
const request = require("supertest");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe('Account', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('should add a transaction when a account has sufficient balance', async () => {
        const acc1 = await factory.create("Account", { id: 1, number: 12345678 });
        const acc2 = await factory.create("Account", { id: 2, number: 12345679 });
        const user1 = await factory.create("User", { id: 1, accountId: acc1.id, cpf: '03370173020', phone: '51998830199', email: 'a' })
        const user2 = await factory.create("User", { id: 2, accountId: acc2.id, cpf: '03370173021', phone: '51998830197', email: 'b' })

        const response = await request(app).post("/transactions").send({ amount: 50, fromAccountId: user1.id, toAccountId: user2.id })

        expect(response.status).toBe(201)
    })

    it('should add a transaction using accounts balance and limit', async () => {
        const acc1 = await factory.create("Account", { id: 1, number: 12345678 });
        const acc2 = await factory.create("Account", { id: 2, number: 12345679 });
        const user1 = await factory.create("User", { id: 1, accountId: acc1.id, cpf: '03370173020', phone: '51998830199', email: 'a' })
        const user2 = await factory.create("User", { id: 2, accountId: acc2.id, cpf: '03370173021', phone: '51998830197', email: 'b' })

        const response = await request(app).post("/transactions").send({ amount: 1100, fromAccountId: user1.id, toAccountId: user2.id })

        expect(response.status).toBe(201)
    })

    it('should add a similar transaction', async () => {
        const acc1 = await factory.create("Account", { id: 1, number: 12345678 });
        const acc2 = await factory.create("Account", { id: 2, number: 12345679 });
        const user1 = await factory.create("User", { id: 1, accountId: acc1.id, cpf: '03370173020', phone: '51998830199', email: 'a' })
        const user2 = await factory.create("User", { id: 2, accountId: acc2.id, cpf: '03370173021', phone: '51998830197', email: 'b' })

        await request(app).post("/transactions").send({ amount: 50, fromAccountId: 1, toAccountId: 2 })
        const response = await request(app).post("/transactions").send({ amount: 50, fromAccountId: user1.id, toAccountId: user2.id })

        expect(response.status).toBe(201)
    })

    it('should not add a transaction', async () => {
        const acc1 = await factory.create("Account", { id: 1, number: 12345678 });
        const acc2 = await factory.create("Account", { id: 2, number: 12345679 });
        const user1 = await factory.create("User", { id: 1, accountId: acc1.id, cpf: '03370173020', phone: '51998830199', email: 'a' })
        const user2 = await factory.create("User", { id: 2, accountId: acc2.id, cpf: '03370173021', phone: '51998830197', email: 'b' })

        const response = await request(app).post("/transactions").send({ amount: 3000, fromAccountId: user1.id, toAccountId: user2.id })

        expect(response.status).toBe(500)
    })



})