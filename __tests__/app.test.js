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
      name: 'Randy',
      comment: 'kubisiak is obnoxious',
      email: 'randy@rude.com',
      date: '2021-08-18T07:00:00.000Z',
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

  it('GETs a comment by id', async () => {
    const comment = {
      name: 'Isaac Awing',
      comment: 'Qbsak is alright',
      email: 'rebalalliance@ewingcommander.com',
      date: '2021-08-01T07:00:00.000Z',
    };

    const commentWithId = await request(app)
      .post('/api/v1/comments')
      .send(comment);
    const response = await request(app).get(
      `/api/v1/comments/${commentWithId.body.id}`
    );

    expect(response.body).toEqual({ id: '1', ...comment });
  });

  it('PUT updates a single comment', async () => {
    const comment = {
      name: 'Randy',
      comment: 'kubisiak is obnoxious',
      email: 'randy@rude.com',
      date: '2021-08-18T07:00:00.000Z',
    };


    const commentWithId = await request(app).post('/api/v1/comments').send(comment);

    const res = await request(app)
      .put(`/api/v1/comments/${commentWithId.body.id}`)
      .send({ comment: 'I was wrong, kubisiak is just neurodivergent' });
    expect(res.body).toEqual({ id: '1', comment: 'I was wrong, kubisiak is just neurodivergent', ...comment, });
  });

  afterAll(() => {
    pool.end();
  });
});
