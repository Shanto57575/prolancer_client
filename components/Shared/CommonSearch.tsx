"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export default function CommonSearch() {
  const router = useRouter();
  const params = useSearchParams();

  const [value, setValue] = useState(params.get("search") || "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const q = new URLSearchParams(params.toString());

      if (value) q.set("search", value);
      else q.delete("search");

      q.set("page", "1"); // reset page for new search

      router.push(`?${q.toString()}`);
    }, 400);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      placeholder="Search services..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="max-w-sm"
    />
  );
}
