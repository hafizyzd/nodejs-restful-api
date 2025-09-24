import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestUser, removeTestUser, getTestUser } from "./test-util.js";
import bcrypt from "bcrypt";

describe('POST /api/users', () => {

    afterEach(async () => {
        await removeTestUser();
    });

    it('should register a new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: "test",
                password: "rahasia",
                name: "test"
            });
            expect(result.status).toBe(200);
            expect(result.body.data.username).toBe("test");
            expect(result.body.data.name).toBe("test");
            expect(result.body.data.password).toBeUndefined();
    });

        it('should reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                password: '',
                name: ''
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

        it('should reject if username already register', async () => {
        let result = await supertest(web)
            .post('/api/users')
            .send({
                username: "test",
                password: "rahasia",
                name: "test"
            });
            expect(result.status).toBe(200);
            expect(result.body.data.username).toBe("test");
            expect(result.body.data.name).toBe("test");
            expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
            .post('/api/users')
            .send({
                username: "test",
                password: "rahasia",
                name: "test"
            });

            logger.info(result.body);

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
    });

});


describe('POST /api/users/login', function() {
    beforeEach(async () => {  //setelah create test user kita hapus 
        await createTestUser();

    })
    afterEach(async () => {
        await removeTestUser();
    });

    it('should login and return token', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "rahasia"
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });

    it('should reject login if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "",
                password: ""
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });


    it('should reject login password is wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "salah"
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

        it('should reject login username is wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "salah",
                password: "salah"
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/users/current', function() {
    beforeEach(async () => {  //setelah create test user kita hapus 
        await createTestUser();

    })
    afterEach(async () => {
        await removeTestUser();
    });

    it('should can get current user', async () => {
        const loginResponse = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "rahasia"
            });

        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.data.token).toBeDefined();

        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', loginResponse.body.data.token);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
    });

    it('should reject if token is invalid', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'salah');

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe('PATCH /api/users/current', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can update user', async () => {
        const loginResponse = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "rahasia"
            });

        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.data.token).toBeDefined();

        const result = await supertest(web)
            .patch("/api/users/current")
            .set("Authorization", loginResponse.body.data.token)
            .send({
                name: "Hafiz",
                password: "rahasialagi"
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("Hafiz");

        const user = await getTestUser();
        expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true);
    });

    it('should can update user name', async () => {
        const loginResponse = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "rahasia"
            });

        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.data.token).toBeDefined();

        const result = await supertest(web)
            .patch("/api/users/current")
            .set("Authorization", loginResponse.body.data.token)
            .send({
                name: "Hafiz"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("Hafiz");
    });

    it('should can update user password', async () => {
        const loginResponse = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "rahasia"
            });

        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.data.token).toBeDefined();

        const result = await supertest(web)
            .patch("/api/users/current")
            .set("Authorization", loginResponse.body.data.token)
            .send({
                password: "rahasialagi"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");

        const user = await getTestUser();
        expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true);
    });

    it('should reject if request is not valid', async () => {
        const result = await supertest(web)
            .patch("/api/users/current")
            .set("Authorization", "salah")
            .send({});

        expect(result.status).toBe(401);
    });
    
});


describe('DELETE /api/users/logout', function() {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can logout', async () => {
        // First login to get valid token
        const loginResponse = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "rahasia"
            });

        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.data.token).toBeDefined();

        // Use token from login for logout
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', loginResponse.body.data.token);

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        const user = await getTestUser();
        expect(user.token).toBeNull();
    });

    it('should reject logout if token is invalid', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'salah');

        expect(result.status).toBe(401);
    });
});
