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
      date: '2021-08-01T07:00:00.000Z',
    };

    const response = await request(app).post('/api/v1/comments').send(comment);
    expect(response.body).toEqual({
      id: '1',
      ...comment,
    });
  });

  it('GET all comments', async () => {
    const comment = {
      name: 'Isaac Awing',
      comment: 'Qbsak is alright',
      email: 'rebalalliance@ewingcommander.com',
      date: '2021-08-01T07:00:00.000Z',
    };

    const comment2 = {
      name: ' Danerson',
      comment: 'Kubi has excellent communication',
      email: 'kubisfriend@friend.com ',
      date: '2021-09-01T07:00:00.000Z',
    };

    const comment3 = {
      name: 'Isaac Awing',
      comment: 'Qbsak is alright',
      email: 'rebalalliance@ewingcommander.com',
      date: '2021-08-11T07:00:00.000Z',
    };

    await request(app).post('/api/v1/comments').send(comment);
    await request(app).post('/api/v1/comments').send(comment2);
    await request(app).post('/api/v1/comments').send(comment3);

    return request(app)
      .get('/api/v1/comments')
      .then((res) => {
        expect(res.body).toEqual([
          { id: '1', ...comment },
          { id: '2', ...comment2 },
          { id: '3', ...comment3 },
        ]);
      });
  });

  afterAll(() => {
    pool.end();
  });
});
