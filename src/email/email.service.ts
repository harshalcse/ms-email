import nodemailer from "nodemailer";
import { ERROR_CODE } from "../common/errors";
import { AppError } from "../errors/AppError";
import { sendEmailRequest, sendEmailResponse } from "./email.type";
//var smtpTransport = require('nodemailer-smtp-transport');
// const nodemailer = require("nodemailer");

export const sendEmail = async (
    payload: sendEmailRequest
): Promise<sendEmailResponse> => {
    console.log(payload);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'harshalcse2910@gmail.com',
            pass: 'harsh123',
        },
        logger: true
    });

    try {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: payload.from,
            to: payload.to,
            subject: payload.subject,
            html: `<strong>${payload.body}</strong>`,
            headers: { 'x-myheader': 'test header' }
        });
        const emailResponse: string = info.response;
        console.log("Message sent: %s", info.response);
        return {
            status: 'Email sent successfully',
            response: emailResponse
        }

    } catch (error) {
        throw new AppError(ERROR_CODE.UNEXPECTED_ERROR, error);
    }

}

export default {
    sendEmail
};