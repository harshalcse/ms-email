import hapi from '@hapi/hapi';
import healthController from '../healthcheck.controller';

describe('ping controller', () => {
  let server: hapi.Server;
  beforeAll(async () => {
    server = new hapi.Server();
    server.route(healthController);
  });

  it('should responds with success for ping', async () => {
    const options = {
      method: 'GET',
      url: '/ping'
    };

    const response = await server.inject(options);
    expect(response.statusCode).toEqual(200);
  });
});
