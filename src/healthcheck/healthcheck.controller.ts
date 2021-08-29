import hapi from '@hapi/hapi';

const ping: hapi.ServerRoute = {
  method: 'GET',
  path: '/ping',
  options: {
    auth: false,
    description: 'Pongs back',
    notes: 'To check is service pongs on a ping',
    tags: ['api'],
    handler: (_request: hapi.Request, _h: hapi.ResponseToolkit) => 'pong!'
  }
};
const healthController: hapi.ServerRoute[] = [ping];
export default healthController;
