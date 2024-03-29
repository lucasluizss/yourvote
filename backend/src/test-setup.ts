import mongoose from 'mongoose';
import environment from './environment/environment';

mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);

  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.remove({});
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);

  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];

    try {
      await collection.drop();
    } catch (error) {
      if (
        error.message === 'ns not found' ||
        error.message.includes('a background operation is currently running')
      )
        return;

      console.error(error.message);
    }
  }
}

export const setupDB = (databaseName: string) => {
  beforeAll(async () => {
    const url = environment.MongoURI(databaseName);
    await mongoose.connect(url, { useNewUrlParser: true });
  });

  afterEach(async () => {
    await removeAllCollections();
  });

  afterAll(async () => {
    await dropAllCollections();
    await mongoose.connection.close();
  });
};
