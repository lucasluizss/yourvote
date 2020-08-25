import dotenv from 'dotenv';
dotenv.config();

export default {
	BaseUrl: process.env.BASE_URL || 'http://localhost:3333/v1',
	MongoURI: (dbName?: string) => `${process.env.MONGODB_URI}${dbName || process.env.DB_NAME}`,
	SmtpOptions: {
		service: 'gmail',
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
	],
	EmailFrom: 'yourvote@gmail.com'
};