import { insertOneToCollection } from "@/lib/db";
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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 필수값 검증
    if (
      !body.name ||
      typeof body.sale !== "boolean" ||
      !body.description ||
      !body.url
    ) {
      return NextResponse.json({ error: "필드 누락" }, { status: 400 });
    }

    const result = await insertOneToCollection("brands", body);
    return NextResponse.json({ insertedId: result.insertedId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "삽입 실패" }, { status: 500 });
  }
}
