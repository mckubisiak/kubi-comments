import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('Comment routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new comment', async () => {
    const comment = {
      name: 'Isaac Awing',
      comment: 'Qbsak is alright',
      email: 'rebalalliance@ewingcommander.com',
      date: '2021-08-01T07:00:00.000Z'
    };

    const response  = await request(app).post('/api/v1/comments').send(comment);
    expect(response.body).toEqual({
      id:'1',
      ...comment,
    });
  });


  afterAll(() => {
    pool.end();
  });
});
