import { BASE_URL } from "../constant/config";

/**
 * 브랜드 목록 조회
 */
export const fetchBrands = async () => {
  const res = await fetch(`${BASE_URL}/api/brand`);

  if (!res.ok) {
    throw new Error("브랜드 목록을 불러오지 못했습니다");
  }

  return res.json();
};
