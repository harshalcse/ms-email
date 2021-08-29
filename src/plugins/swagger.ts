import * as HapiSwagger from 'hapi-swagger';

import * as Package from '../../package.json';

const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: 'Award API Documentation',
    version: Package.version
  },
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [{ jwt: [] }]
};

export default {
  plugin: HapiSwagger,
  options: swaggerOptions
};
