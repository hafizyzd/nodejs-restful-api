import { web } from "../src/application/web.js";
import supertest from "supertest";
import { createTestContact,createTestUser, removeAllTestContacts, removeTestUser, getTestContact } from "./test-util";

describe('POST /api/contacts', () => {

    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should create new contact', async () => {
        const loginResult = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "rahasia"
            });

        expect(loginResult.status).toBe(200);
        expect(loginResult.body.data.token).toBeDefined();

        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', loginResult.body.data.token)
            .send({
                first_name: "test",
                last_name: "test",
                email: "test@gmail.com",
                phone: "08123456789"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.first_name).toBe("test");
        expect(result.body.data.last_name).toBe("test");
        expect(result.body.data.email).toBe("test@gmail.com");
        expect(result.body.data.phone).toBe("08123456789");
        });

        it('should reject if request is not valid', async () => {
            const loginResult = await supertest(web)
                .post('/api/users/login')
                .send({
                    username: "test",
                    password: "rahasia"
                });

            expect(loginResult.status).toBe(200);
            expect(loginResult.body.data.token).toBeDefined();

            const result = await supertest(web)
                .post("/api/contacts")
                .set('Authorization', loginResult.body.data.token)
                .send({
                    first_name: "",
                    last_name: "test",
                    email: "test",
                    phone: "0809000000043534534543534534543535345435435"
                });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
    });
});


describe('GET /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should get contact by id', async () => {
        const testContact = await getTestContact();

        const loginResult = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "rahasia"
            });

        const result = await supertest(web)
            .get(`/api/contacts/${testContact.id}`)
            .set('Authorization', loginResult.body.data.token);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe(testContact.first_name);
        expect(result.body.data.last_name).toBe(testContact.last_name);
        expect(result.body.data.email).toBe(testContact.email);
        expect(result.body.data.phone).toBe(testContact.phone);
        
    });

    it('should return 404 if contact id is not found', async () => {
        const testContact = await getTestContact();

        const loginResult = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "rahasia"
            });

        expect(loginResult.status).toBe(200);
        expect(loginResult.body.data.token).toBeDefined();

        const result = await supertest(web)
            .get("/api/contacts/" + (testContact.id + 1))
            .set('Authorization', loginResult.body.data.token);

        expect(result.status).toBe(404);
    });
});


describe('PUT /api/contacts/:contactId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    })

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })

    it('should can update existing contact', async () => {
        const testContact = await getTestContact();

        const loginResult = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "rahasia"
            });
        expect(loginResult.status).toBe(200);
        expect(loginResult.body.data.token).toBeDefined();
        
        const result = await supertest(web)
            .put('/api/contacts/' + testContact.id)
            .set('Authorization', loginResult.body.data.token)
            .send({
                first_name: "Hafiz",
                last_name: "Yazid",
                email: "Hafiz@gmail.com",
                phone: "09999999"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe("Hafiz");
        expect(result.body.data.last_name).toBe("Yazid");
        expect(result.body.data.email).toBe("Hafiz@gmail.com");
        expect(result.body.data.phone).toBe("09999999");
    });

    it('should reject if request is invalid', async () => {
        const testContact = await getTestContact();

        const loginResult = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "rahasia"
            });

        expect(loginResult.status).toBe(200);
        expect(loginResult.body.data.token).toBeDefined();

        const result = await supertest(web)
            .put('/api/contacts/' + testContact.id)
            .set('Authorization', loginResult.body.data.token)
            .send({
                first_name: "",
                last_name: "",
                email: "yazid",
                phone: ""
            });

        expect(result.status).toBe(400);
    });

     it('should reject if contact is not found', async () => {
        const testContact = await getTestContact();

        const loginResult = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "rahasia"
            });

        expect(loginResult.status).toBe(200);
        expect(loginResult.body.data.token).toBeDefined();

        const result = await supertest(web)
            .put('/api/contacts/' + (testContact.id + 1))
            .set('Authorization', loginResult.body.data.token)
            .send({
                first_name: "Yazid",
                last_name: "muhammad",
                email: "yaz@pzn.com",
                phone: "09999999"
            });

        expect(result.status).toBe(404);
    });
});

describe('DELETE /api/contacts/:contactId', function (){
     beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    })

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })

    it('should can delete contact', async () => {
        let testContact = await getTestContact();

        const loginResult = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "rahasia"
            });
        
        expect(loginResult.status).toBe(200);
        expect(loginResult.body.data.token).toBeDefined();

        const result = await supertest(web)
            .delete('/api/contacts/' + testContact.id)
            .set('Authorization', loginResult.body.data.token);

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testContact = await getTestContact();
        expect(testContact).toBeNull();
    });

    it('should reject if contact is not found', async () => {
        let testContact = await getTestContact();
        
        const loginResult = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "rahasia"
            });
        
        expect(loginResult.status).toBe(200);
        expect(loginResult.body.data.token).toBeDefined();

        const result = await supertest(web)
            .delete('/api/contacts/' + (testContact.id + 1))
            .set('Authorization', loginResult.body.data.token);

        expect(result.status).toBe(404);
    });
});


