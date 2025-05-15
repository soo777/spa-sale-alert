"use client";
import { useRouter } from "next/navigation";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import { useRef, useState } from "react";

export default function InsertBrand() {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const insertBrand = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const url = formData.get("url") as string;

    const res = await fetch("/api/brand", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        sale: false,
        description,
        url,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast(`✅ 삽입 완료: ${data.insertedId}`);
      setOpen(false);
      router.refresh();
    } else {
      toast(`❌ 오류: ${data.error}`);
    }
  };

  return (
    <div className="text-right">
      <Button className="cursor-pointer" onClick={() => setOpen(true)}>
        브랜드 추가
      </Button>

      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>브랜드 추가하기</DialogTitle>
            <DialogDescription>
              새로운 브랜드 정보를 입력하세요
            </DialogDescription>
          </DialogHeader>

          <form ref={formRef} onSubmit={insertBrand} className="space-y-2">
            <input
              name="name"
              type="text"
              placeholder="브랜드명"
              className="w-full border p-2 rounded"
            />
            <input
              name="description"
              type="text"
              placeholder="설명"
              className="w-full border p-2 rounded"
            />
            <input
              name="url"
              type="text"
              placeholder="링크"
              className="w-full border p-2 rounded"
            />

            <DialogFooter className="mt-4">
              <DialogClose
                className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
                onClick={() => setOpen(false)}
              >
                닫기
              </DialogClose>
              <button className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
                저장
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
