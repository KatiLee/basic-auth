'use strict';

const supertest = require('supertest');
const { app } = require('./src/server');
const { sequelize } = require('./src/auth/models');

const request = supertest(app);

beforeAll (async() => {
    await sequelize.sync();
});

afterAll (async() => {
    await sequelize.drop();
});

describe('auth routes', () => {
    test('allow user to signup', async () => {
        const response = await request.post('/signup').send({
            username: 'kati',
            password: 'word',
        });
        
        expect(response.status).toEqual(200);
        expect(response.body.username).toEqual('kati');
    }); 
});