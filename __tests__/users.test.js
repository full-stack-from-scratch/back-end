const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
    const res = await request(app).post('/api/v1/users').send({ mockUser });
    const { username, password } = mockUser;

    expect(res.status).toEqual({
      id: expect.any(String),
      username,
      password,
    });
  });
});
