import mongoose from 'mongoose';

const connectionOptions = {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
};

mongoose.connect(String(process.env.MONGODB_URI), connectionOptions);
