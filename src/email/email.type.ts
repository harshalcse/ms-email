import hapi from '@hapi/hapi';
import 'joi-extract-type';

export interface sendEmailRequest {
  from: string;
  to: string;
  subject: string;
  body: string;
}

export interface sendEmailResponse {
  status: string;
  response: string;
}

export interface ISendEmailRequest extends hapi.Request {
  payload: sendEmailRequest;
}
