/* eslint-disable no-undef */
const request = require("supertest");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe('Account', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('should add a contact', async () => {
        const user1 = await factory.create("User", { id: 1, accountId: 1, cpf: '03370173020', phone: '51998830199', email: 'a' })
        const user2 = await factory.create("User", { id: 2, accountId: 2, cpf: '03370173021', phone: '51998830197', email: 'b' })

        const response = await request(app).post("/contacts").send({ userId: user1.id, contactId: user2.id })

        expect(response.status).toBe(201)
    })

    it('should delete a contact', async () => {
        const user1 = await factory.create("User", { id: 1, accountId: 1, cpf: '03370173020', phone: '51998830199', email: 'a' })
        const user2 = await factory.create("User", { id: 2, accountId: 2, cpf: '03370173021', phone: '51998830197', email: 'b' })

        const contact = await request(app).post("/contacts").send({ userId: user1.id, contactId: user2.id })
        const response = await request(app).delete(`/contacts/${contact.body.id}`)

        expect(response.status).toBe(200)
    })

})