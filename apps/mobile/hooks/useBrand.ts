import { useQuery } from "@tanstack/react-query";
import { fetchBrands } from "../api/brand";

export const useBrands = () => {
  return useQuery({ queryKey: ["brands"], queryFn: fetchBrands });
};
