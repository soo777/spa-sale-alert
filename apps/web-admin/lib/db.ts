import clientPromise from "./mongodb";
import { Db, Collection, InsertOneResult } from "mongodb";

let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = await clientPromise;
  const db = client.db("sale-alert"); // DB 이름
  cachedDb = db;
  return db;
}

export async function insertOneToCollection<T = any>(
  name: string,
  data: T
): Promise<InsertOneResult<T>> {
  const collection = await getCollection<T>(name);
  return collection.insertOne(data);
}

export async function getCollection<T = any>(
  name: string
): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>(name);
}
