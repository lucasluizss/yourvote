import nodemailer, { TransportOptions } from 'nodemailer';
import environment from '../../environment/environment';

class EmailService {
	async send(to: string, subject: string, html: any, from = process.env.emailFrom) {

		const transporter = nodemailer.createTransport(environment.smtpOptions as TransportOptions);

    await transporter.sendMail({ from, to, subject, html });
	}
}

export default new EmailService();