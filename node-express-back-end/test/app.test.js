const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Express GooglePlay App', () => {

    it('should return a message from GET /apps', () => {
        return supertest(app)
            .get('/')
            .expect(200, 'Hello Express!');
    });

    it('should generate an object', () => {
        return supertest(app)
            .get('/apps') // invoke the endpoint
            .query({ search: "", sort: "app" }) // send the query string ?n=5
            .expect(200)  // assert that you get a 200  OK status
            .expect('Content-Type', /json/)
            .then(res => {
                // make sure you get an object
                expect(res).to.be.an('object');
                // array must not be empty
                expect(res.body).to.have.lengthOf.at.least(1);
            });
    })
});