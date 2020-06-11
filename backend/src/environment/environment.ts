export default {
	smtpOptions: {
		host: process.env.HOST_MAIL,
		port: process.env.PORT_MAIL,
		auth: {
				user: process.env.USER_MAIL,
				pass: process.env.PWD_MAIL
		}
	}
};