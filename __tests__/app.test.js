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
    };

    const response = await request(app).post('/api/v1/comments').send(comment);
    expect(response.body).toEqual({
      id: '1',
      date: null,
      ...comment,
    });
  });

  it('GET all comments', async () => {
    const comment = {
      name: 'Isaac Awing',
      comment: 'Qbsak is alright',
      email: 'rebalalliance@ewingcommander.com',
    };

    const comment2 = {
      name: ' Danerson',
      comment: 'Kubi has excellent communication',
      email: 'kubisfriend@friend.com ',
    };

    const comment3 = {
      name: 'Randy',
      comment: 'kubisiak is obnoxious',
      email: 'randy@rude.com',
    };

    await request(app).post('/api/v1/comments').send(comment);
    await request(app).post('/api/v1/comments').send(comment2);
    await request(app).post('/api/v1/comments').send(comment3);

    return request(app)
      .get('/api/v1/comments')
      .then((res) => {
        expect(res.body).toEqual([
          { id: '1', date: null, ...comment },
          { id: '2', date: null, ...comment2 },
          { id: '3', date: null, ...comment3 },
        ]);
      });
  });

  it('GETs a comment by id', async () => {
    const comment = {
      name: 'Isaac Awing',
      comment: 'Qbsak is alright',
      email: 'rebalalliance@ewingcommander.com',
    };

    const commentWithId = await request(app)
      .post('/api/v1/comments')
      .send(comment);
    const response = await request(app).get(
      `/api/v1/comments/${commentWithId.body.id}`
    );

    expect(response.body).toEqual({ id: '1', date: null, ...comment });
  });

  it('PUT updates a single comment', async () => {
    const comment = {
      name: 'Randy',
      comment: 'kubisiak is obnoxious',
      email: 'randy@rude.com',
    };

    const commentWithId = await request(app)
      .post('/api/v1/comments')
      .send(comment);

    const response = await request(app)
      .put(`/api/v1/comments/${commentWithId.body.id}`)
      .send({ comment: 'I was wrong, kubisiak is just neurodivergent' });
    expect(response.body).toEqual({
      id: '1',
      date: null,
      ...comment,
      comment: 'I was wrong, kubisiak is just neurodivergent',
    });
  });

  it('DELETEs a comment by id', async () => {
    const comment = {
      name: 'Isaac Awing',
      comment: 'Qbsak is alright',
      email: 'rebalalliance@ewingcommander.com',
    };

    const commentWithId = await request(app)
      .post('/api/v1/comments')
      .send(comment);
    const response = await request(app).delete(
      `/api/v1/comments/${commentWithId.body.id}`
    );

    expect(response.body).toEqual({
      message: `${comment.name} has retracted their comment`,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
