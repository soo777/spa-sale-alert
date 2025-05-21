"use client";
import { useRouter } from "next/navigation";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import { useRef, useState } from "react";

type Brand = { _id: string; name: string; description?: string; url?: string };

export default function BrandInfo({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [brand, setBrand] = useState<Brand | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const insertBrand = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const url = formData.get("url") as string;

    const res = await fetch("/api/brand", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        update: {
          name,
          description,
          url,
        },
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast(`✅ 수정 완료: ${name}`);
      setOpen(false);
      router.refresh();
    } else {
      toast(`❌ 오류: ${data.error}`);
    }
  };

  const handleOpen = async () => {
    const res = await fetch(`/api/brand?name=${encodeURIComponent(name)}`);
    const data = await res.json();
    console.log(data);
    setBrand(data);
    setOpen(true);
  };

  return (
    <>
      <Button className="cursor-pointer" onClick={handleOpen}>
        상세
      </Button>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>브랜드 정보</DialogTitle>
          </DialogHeader>

          <form ref={formRef} onSubmit={insertBrand} className="space-y-2">
            <input
              name="name"
              type="text"
              placeholder="브랜드명"
              className="w-full border p-2 rounded"
              defaultValue={brand ? brand?.name : ""}
              readOnly
            />
            <input
              name="description"
              type="text"
              placeholder="설명"
              className="w-full border p-2 rounded"
              defaultValue={brand ? brand?.description : ""}
            />
            <input
              name="url"
              type="text"
              placeholder="링크"
              className="w-full border p-2 rounded"
              defaultValue={brand ? brand?.url : ""}
            />

            <DialogFooter className="mt-4">
              <DialogClose
                className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
                onClick={() => setOpen(false)}
              >
                닫기
              </DialogClose>
              <button className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
                수정
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
