import nodemailer, { TransportOptions } from 'nodemailer';
import environment from '../../environment/environment';

export default interface IEmailService {
	send(to: string, subject: string, html: any): Promise<void>;
}

export class EmailService implements IEmailService {
	async send(to: string, subject: string, html: any): Promise<void> {

		const transporter = nodemailer.createTransport(environment.SmtpOptions as TransportOptions);

    const info = await transporter.sendMail({
			from: environment.EmailFrom,
			to,
			subject,
			html
		});

		console.log('📨 Message sent: ', info);
	}
}
