import { MongoClient, ServerApiVersion } from "mongodb";
if (!process.env.DB_URI) {
  throw new Error("Mongo URI not found.");
}

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getDB(dbName: string) {
  try {
    await client.connect();
    console.log("connected");
    return client.db(dbName);
  } catch (error) {
    console.error("error trying to connect to database: ", error);
  }
}

export async function getCollection(collectionName: string) {
  const db = await getDB("next_blog");
  if (db) {
    return db.collection(collectionName);
  }
  return null;
}
