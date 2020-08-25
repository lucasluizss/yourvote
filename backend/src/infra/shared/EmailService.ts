import nodemailer, { TransportOptions } from 'nodemailer';
import environment from '../../environment/environment';

export default interface IEmailService {
	send(to: string, subject: string, html: any): Promise<void>;
}

export class EmailService implements IEmailService {
	async send(to: string, subject: string, html: any): Promise<void> {

		// const transporter = nodemailer.createTransport(environment.SmtpOptions as TransportOptions);
		const testAccount = await nodemailer.createTestAccount();

  	// create reusable transporter object using the default SMTP transport
		const transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: testAccount.user, // generated ethereal user
				pass: testAccount.pass, // generated ethereal password
			},
		});

    const info = await transporter.sendMail({
			from: environment.EmailFrom,
			to,
			subject,
			html
		});

		console.log('📨 Message sent: ', info);
	}
}
