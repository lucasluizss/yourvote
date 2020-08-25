import mongoose from 'mongoose';
import environment from '../environment/environment';

const connectionOptions = {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
};

const connectionString = environment.MongoURI();

mongoose.Promise = global.Promise;

mongoose.connect(connectionString, connectionOptions).then(() => {
	console.log('✅ Successfully connected to MongoDB!');
}).catch(error => {
	console.error('❌ Connection failure: ', error);
});

export default mongoose;
