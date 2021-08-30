import hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import errorHandler from './common/handleValidationErrors';
import Swagger from './plugins/swagger';
import { routes } from './routes';

const { port, host } = { port: '8080', host: 'localhost' };

const createServer = async () => {
  const server = new hapi.Server({
    port,
    host,
    routes: {
      validate: {
        options: {
          abortEarly: false
        },
        failAction: errorHandler
      }
    }
  });

  const plugins: any[] = [Inert, Vision, Swagger];
  await server.register(plugins);

  // Register routes
  server.route(routes);

  return server;
};

export const init = async () => {
  const server = await createServer();
  await server
    .initialize()
    .then(() =>
      console.log(`server started at ${server.info.host}:${server.info.port}`)
    );
  return server;
};

export const start = async (module: NodeModule) => {
  if (!module.parent) {
    console.log('Start server');
    try {
      const server = await init();
      await server.start();
    } catch (err) {
      console.log('Server cannot start', err);
      process.exit(1);
    }
  }
};

start(module);
