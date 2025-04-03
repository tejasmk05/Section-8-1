import { MongoClient } from 'mongodb';

const connectionProtocol = process.env.MONGODB_CONNECTION_PROTOCOL;
const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

const uri = `${connectionProtocol}://${dbUser}:${encodeURIComponent(dbPassword)}@${clusterAddress}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function connectDB() {
  console.log('Trying to connect to db');
  try {
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    console.log('✅ Connected successfully to MongoDB');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    await client.close();
    console.log('Connection closed.');
    process.exit(1);
  }
}

connectDB();

const database = client.db(dbName);
export default database;
