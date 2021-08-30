import hapi from '@hapi/hapi';
import emailController from '../email.controller';
import emailService from '../email.service';

describe('email controller', () => {
    let server: hapi.Server;
    const sendRequest = async (
        payload: any,
        method: string
    ) => {
        const options = {
            method,
            url: `/send-email`,
            payload
        };
        const result = await server.inject(options);
        return result;
    };

    beforeAll(async () => {
        server = new hapi.Server();
        server.route(emailController);
    });

    afterEach(async () => {
        expect.hasAssertions();
        jest.clearAllMocks();
    });

    it('should responds with success for send email', async () => {
        const payload = {
            from: 'from@test.com',
            to: 'to@test.com',
            subject: 'email subject',
            body: 'testing body'
        };
        const successResponse = { status: 'sent successfully!!', response: 'sent successfully!!' };
        emailService.sendEmail = jest
            .fn()
            .mockResolvedValueOnce(successResponse);
        const result = await sendRequest(
            payload,
            'POST'
        );

        expect(result.statusCode).toBe(200);
        expect(result.result).toEqual(successResponse);
        expect(emailService.sendEmail).toBeCalledWith(
            payload
        );
    });
});
