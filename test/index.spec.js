const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);


describe('stock_trades_api_hard', () => {
    const user1 = {
        "email": "abc@gmail.com",
        "password": "abc123"
    }

    const user2 = {
        "email": "zyz@gmail.com",
        "password": "123456"
    }

    it('should create a new user', async () => {
        const response = await chai.request(server).post('/users/create').send(user1)
        response.should.have.status(201);
        delete response.body._id;
        response.body.should.eql(user1)
    });

    it('should not create a new user', async () => {
        const user3 = {...user1};
        user3.username = "abc";
        const response = await chai.request(server).post('/users/create').send(user3)
        response.should.have.status(400);
    });

    it('should login a user', async () => {
        const response = await chai.request(server).post('/users/authenticate').send(user1)
        response.should.have.status(200);
    });

    it('should return 400 for an invalid entry', async () => {
        const response = await chai.request(server).post('/users/authenticate').send(user2)
        response.should.have.status(400);
    });

    it('should return 400 if user is of invalid type', async () => {
        const response = await chai.request(server).get('/users/').send()
        response.should.have.status(400);
    });


});
