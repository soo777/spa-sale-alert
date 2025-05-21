import clientPromise from "./mongodb";
import {
  Db,
  Collection,
  InsertOneResult,
  OptionalUnlessRequiredId,
  Document,
} from "mongodb";

let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = await clientPromise;
  const db = client.db("sale-alert"); // DB 이름
  cachedDb = db;
  return db;
}

export async function insertOneToCollection<T extends Document>(
  name: string,
  data: OptionalUnlessRequiredId<T>
): Promise<InsertOneResult<T>> {
  const collection = await getCollection<T>(name);
  return collection.insertOne(data);
}

export async function getCollection<T extends Document>(
  name: string
): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>(name);
}
