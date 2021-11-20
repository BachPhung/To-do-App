const request = require('supertest');
const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏'
      }, done);
  });
});
//Hello
describe('GET /api/v1/emojis', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/emojis')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, ['😀', '😳', '🙄'], done);
  });
});

describe('GET /', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'Team 19: Duc Thai - Bach Phung'
      }, done);
  });
});

describe('GET /api', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'Team 19: Duc Thai - Bach Phung - Freechoice Project: To-do list'
      }, done);
  });
});

describe('test connection to database',async ()=>{
  it('responds with a json message',(done)=>{
    request(app).get('/api/users')
    .expect('Content-Type', /json/)
    .expect(200,done)
  })
})

describe('test connection to database',async ()=>{
  it('responds with a json message',(done)=>{
    request(app).get('/api/notes')
    .expect('Content-Type', /json/)
    .expect(200,done)
  })
})