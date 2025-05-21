import { getCollection, insertOneToCollection } from "@/lib/db";
import { NextResponse } from "next/server";

// 브랜드 리스트 조회
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  const brands = await getCollection("brands");

  if (name) {
    const brand = await brands.findOne({ name });
    if (!brand) {
      return NextResponse.json(
        { error: "브랜드를 찾을 수 없습니다" },
        { status: 404 }
      );
    }
    return NextResponse.json(brand);
  }

  const allBrands = await brands.find().toArray();
  return NextResponse.json(allBrands);
}

// 브랜드 추가
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

    // 중복 확인
    const brands = await getCollection("brands");
    const existing = await brands.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    if (existing) {
      return NextResponse.json(
        { error: "이미 존재하는 브랜드입니다" },
        { status: 409 }
      );
    }

    const result = await insertOneToCollection("brands", body);
    return NextResponse.json({ insertedId: result.insertedId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "삽입 실패" }, { status: 500 });
  }
}

// 브랜드 수정
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { name, update } = body;

    if (!name || !update) {
      return NextResponse.json(
        { error: "name과 update 값이 필요합니다" },
        { status: 400 }
      );
    }

    const brands = await getCollection("brands");

    const result = await brands.updateOne(
      { name: { $regex: new RegExp(`^${name}$`, "i") } }, // 대소문자 무시
      { $set: update }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "해당 브랜드를 찾을 수 없습니다" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    console.error("업데이트 에러:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
