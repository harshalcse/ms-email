import emailController from './email/email.controller';
import healthcheck from './healthcheck/healthcheck.controller';

const routes = [...healthcheck, ...emailController];

export { routes };
