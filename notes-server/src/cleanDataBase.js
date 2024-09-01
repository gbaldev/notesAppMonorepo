// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/nestjs_notes';

async function cleanDatabase() {
  try {
    await mongoose.connect(dbURI);
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      try {
        await mongoose.connection.db.dropCollection(collectionName);
        console.log(`Colección ${collectionName} deleted.`);
      } catch (err) {
        console.log(
          `Error while eliminating the collection ${collectionName}: ${err.message}`,
        );
      }
    }

    // No collections, checking for documents in any collection
    if (collections.length === 0) {
      const adminDb = mongoose.connection.db.admin();
      const dbInfo = await adminDb.listDatabases();
      const dbName = mongoose.connection.db.databaseName;
      const dbStats = dbInfo.databases.find((db) => db.name === dbName);

      if (dbStats && dbStats.sizeOnDisk > 0) {
        console.log(`DB ${dbName} contains data, but it couldn't be listed.`);
        console.log('Check permissions or configuration.');
      } else {
        console.log(`DB ${dbName} seems to be empty.`);
      }
    }
  } catch (err) {
    console.error(`Error while connecting to MongoDB: ${err.message}`);
  } finally {
    await mongoose.connection.close();
  }
}

cleanDatabase();
