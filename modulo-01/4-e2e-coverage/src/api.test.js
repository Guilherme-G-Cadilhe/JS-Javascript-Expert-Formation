const { describe, it, after, before } = require("mocha")
const assert = require('assert');
const supertest = require('supertest')

describe('API Suite test', () => {
  let app;
  before((done) => {
    app = require('./api');
    app.once('listening', () => done());

  })
  after((done) => app.close(done))
  describe('GET /contact', () => {
    it('should return contact page text', async () => {
      const response = await supertest(app)
        .get('/contact')
        .expect(200);
      assert.strictEqual(response.text, 'Contact Us Page');
    })
  })

  describe('POST /login', () => {
    it('should login sucessfully', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'guilhermecadilhe', password: '123' })
        .expect(200);
      assert.strictEqual(response.text, 'Login Success');
    })
  })
  describe('POST /login', () => {
    it('should fail to login', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'guilhermadilhe', password: '123' })
        .expect(401);
      assert.ok(response.unauthorized)
      assert.strictEqual(response.text, 'Login Failed');
    })
  })
  describe('GET /health 404', () => {
    it('should fail to find route', async () => {
      const response = await supertest(app)
        .get('/login')
        .expect(404);
      assert.strictEqual(response.text, 'not found');
    })
  })
})