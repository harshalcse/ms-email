import emailService from '../email.service';
import { clear } from 'jest-date-mock';
import nodemailer from 'nodemailer';

jest.mock('nodemailer');
jest.mock('../email.service');

describe('email.service', () => {
    const successResponse = { status: 'sent successfully!!', response: 'sent successfully!!' };
    beforeEach(() => {
        expect.hasAssertions();
        jest.clearAllMocks();
    });
    afterEach(() => {
        clear();
    });
    it('should send email', async () => {
        const payload = {
            from: 'from@test.com',
            to: 'to@test.com',
            subject: 'email subject',
            body: 'testing body'
        };
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'test@gmail.com',
                pass: 'test'
            },
            logger: true
        });

        const transporterObj = {
            sendMail: jest.fn()
        }

        nodemailer.createTransport = jest
            .fn()
            .mockResolvedValueOnce(transporterObj);

        transporterObj.sendMail = jest
            .fn()
            .mockResolvedValueOnce(successResponse);

        const result = await emailService.sendEmail(payload);
        expect(result).toBeUndefined();
    });

});