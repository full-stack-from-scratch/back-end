const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const agent = request.agent(app);

const mockUser = {
  username: 'mojojojo',
  password: '123456',
};

describe('user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('creates a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual('Account created successfully!');
  });
  it('sign in user signs in', async () => {
    await agent.post('/api/v1/users').send(mockUser);
    const resp = await agent.post('/api/v1/users/sessions').send(mockUser);

    expect(resp.status).toBe(200);
    expect(resp.body.message).toEqual('Signed in successfully');
  });
});
