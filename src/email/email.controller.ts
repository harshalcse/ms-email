import hapi from '@hapi/hapi';
import emailService from './email.service';
import { ISendEmailRequest } from './email.type';
import {
  sendEmailRequestValidator,
  sendEmailResponseValidator
} from './email.validator';

// TODO: should send email
const sendEmail: hapi.ServerRoute = {
  method: 'POST',
  path: '/send-email',
  options: {
    auth: false,
    description: 'sending email',
    notes: 'sending email to any one',
    tags: ['api', 'private'],
    validate: {
      payload: sendEmailRequestValidator
    },
    response: {
      schema: sendEmailResponseValidator
    },
    handler: async (
      hapiRequest: ISendEmailRequest,
      hapiResponse: hapi.ResponseToolkit
    ) => {
      const payload = hapiRequest.payload;
      const result = await emailService.sendEmail(payload);
      return hapiResponse.response(result).code(200);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          ['200']: {
            description: 'Email sent successfully.'
          },
          ['400']: {
            description: 'Bad request.'
          }
        }
      }
    }
  }
};

const emailController: hapi.ServerRoute[] = [sendEmail];

export default emailController;
