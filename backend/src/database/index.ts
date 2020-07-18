import mongoose from 'mongoose';

const connectionOptions = {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
};

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost/YourVote';

mongoose.Promise = global.Promise;

mongoose.connect(connectionString, connectionOptions).then(() => {
	console.log('✅ Successfully connected to MongoDB!');
}).catch(error => {
	console.error('❌ Connection failure: ', error);
});

export default mongoose;
