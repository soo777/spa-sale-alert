import { BrandListType } from "../type/type";

export const makeBrandList = (brands: any) => {
  const brandList: BrandListType[] = [];
  for (const brand of brands) {
    const title = brand.name.substring(0, 1).toUpperCase();
    if (!brandList.find((item) => item.title === title)) {
      brandList.push({
        title: title,
        data: [`${brand.name}(${brand.nameKo})`],
      });
    } else {
      const target = brandList.find((item) => item.title === title);
      target?.data.push(brand.name);
    }
  }
  return brandList;
};
