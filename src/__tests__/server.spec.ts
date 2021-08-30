import * as Server from '../server';

jest.mock('@hapi/hapi', () => {
  const origin = require.requireActual('@hapi/hapi');
  class ServerMock extends origin.Server {
    start = jest.fn();
  }
  return {
    ...origin,
    Server: ServerMock
  };
});

describe('Hapi server', () => {
  it('should create server', async () => {
    const server = await Server.init();
    expect(server).toBeDefined();
  });

  it('should not start server if it run on child module', async () => {
    const spyInfo = jest.spyOn(console, 'info');
    await Server.start({
      parent: 'having parent'
    } as any);
    expect(spyInfo).not.toBeCalled();
  });

  it('should start server if it run on main module', async () => {
    const spyInfo = jest.spyOn(console, 'info');
    await Server.start({
      parent: null
    } as any);
    expect(spyInfo).not.toBeCalled();
  });

  it('should log error if server start error', async () => {
    const spyInfo = jest.spyOn(console, 'info');
    const spyError = jest.spyOn(console, 'error');
    const spyInit = jest.spyOn(Server, 'init');
    //spyInit.mockRejectedValueOnce('error');
    await Server.start({
      parent: null
    } as any);
    expect(spyInfo).not.toBeCalled();
    expect(spyError).not.toBeCalled();
  });
});
