import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InsertBrand from "./insertBrand";
import BrandInfo from "./brandInfo";
import BrandType from "@/type/type";

export default async function DashboardPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/brand`,
    {
      cache: "no-store",
    }
  );
  const brands = await res.json();

  return (
    <div className="p-4">
      <InsertBrand />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>브랜드명</TableHead>
            <TableHead>세일중?</TableHead>
            <TableHead>설명</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brands.map((brand: BrandType) => (
            <TableRow key={brand._id.toString()}>
              <TableCell>{brand.name}</TableCell>
              <TableCell>{brand.sale ? "✅" : "❌"}</TableCell>
              <TableCell>{brand.description}</TableCell>
              <TableCell>
                <BrandInfo name={brand.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
