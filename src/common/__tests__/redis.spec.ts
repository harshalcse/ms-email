import redis from '../redis';

jest.mock('@dk/module-redis', () =>
  jest.fn(() => ({
    mSet: jest.fn(),
    redisInstance: {
      del: jest.fn()
    },
    mGet: jest.fn().mockReturnValue([{ name: 'abc' }])
  }))
);

describe('redis', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('call redis init', async () => {
    expect(redis).toBeDefined();
  });
});
