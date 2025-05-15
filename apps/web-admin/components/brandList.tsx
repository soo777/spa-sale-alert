import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCollection } from "@/lib/db";
import { Button } from "./ui/button";
import InsertBrand from "./insertBrand";

export default async function DashboardPage() {
  const brands = await (await getCollection("brands")).find().toArray();

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
          {brands.map((brand: any) => (
            <TableRow key={brand._id.toString()}>
              <TableCell>{brand.name}</TableCell>
              <TableCell>{brand.sale ? "✅" : "❌"}</TableCell>
              <TableCell>{brand.description}</TableCell>
              <TableCell>
                <Button className="cursor-pointer">상세</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
