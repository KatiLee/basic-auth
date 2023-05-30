'use stict';

const supertest = require('supertest');
const { app } = require('../server');
const { sequelize } = require('../auth/models');

const request = supertest(app);

beforeAll(async () => {
    await sequelize.sync();
});

test ('post to /signup create a new user', async () => {
    const response = await request.post('/signup').send({username: 'kati', password: 'word'});
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('kati');
});

