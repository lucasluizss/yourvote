import dotenv from 'dotenv';
dotenv.config();

export default {
	smtpOptions: {
		host: process.env.HOST_MAIL,
		port: process.env.PORT_MAIL,
		auth: {
				user: process.env.USER_MAIL,
				pass: process.env.PWD_MAIL
		}
	},
	SECRET: process.env.SECRET,
	Admins: process.env.ADMINS?.split(',') || [
		'lucasluizss@live.com',
		'williammsouza@live.com'
	]
};