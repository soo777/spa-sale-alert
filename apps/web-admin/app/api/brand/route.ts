import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("sale-alert"); // ← DB 이름
    const brands = await db.collection("brands").find().toArray();

    return NextResponse.json(brands, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}
