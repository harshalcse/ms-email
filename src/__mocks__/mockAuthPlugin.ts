import Hapi from '@hapi/hapi';
import { set } from 'lodash';

// provide mockAuthPayload to set up authPayload in headers
const requestWrapper: Hapi.Plugin<{}> = {
  name: 'mockAuth',
  version: '1.0.0',
  register: (server: Hapi.Server) => {
    server.ext(
      'onPreHandler',
      (hapiRequest: Hapi.Request, hapiResponse: Hapi.ResponseToolkit) => {
        const authPayload = hapiRequest.headers['mockauthpayload'];
        set(hapiRequest, 'auth.credentials.payload', authPayload);
        return hapiResponse.continue;
      }
    );
  },
  once: true
};

export default requestWrapper;
