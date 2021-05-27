const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const ShrinkURLService = require('../lib/service/ShrinkURLService');

describe('bitly-clone routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a different url via POST',  async () => {
    return request(app)
      .post('/api/v1/shrink')
      .send({ url: 'https://extralongaddress.com/why/would/this/be/this/long' })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.stringMatching(/^\w{10}$/),
          longUrl: 'https://extralongaddress.com/why/would/this/be/this/long'
        });
      });
  });

  it('gets a list of urls via GET', async () => {
    //creating a list the cool way
    const list = await Promise.all(
      [...Array(3)].map((_, i) => ShrinkURLService.create({ url: `https://extralongaddress.com/why/would/this/be/this/long/${i}` }))
    );

    return request(app)
      .get('/api/v1/shrink')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining(list));
      });
  });

  it('gets a shortURL by ID and redirects to original long URL', async () => {
    let postedUrl = {};
    const postResponse = await request(app)
      .post('/api/v1/shrink')
      .send({ url: 'https://extralongaddress.com/why/would/this/be/this/long' });
      
    postedUrl = postResponse.body;

    return request(app)
      .get(`/api/v1/shrink/${postedUrl.id}`)
      .then(res => {
        expect(res.headers.location).toEqual('https://extralongaddress.com/why/would/this/be/this/long');
      });
  });
});


