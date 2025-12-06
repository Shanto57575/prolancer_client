"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommonSearchProps {
  placeholder?: string;
}

export default function CommonSearch({
  placeholder = "Search...",
}: CommonSearchProps) {
  const router = useRouter();
  const params = useSearchParams();

  const [value, setValue] = useState(params.get("search") || "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentSearch = params.get("search") || "";
      if (value === currentSearch) return;

      const q = new URLSearchParams(params.toString());

      if (value) q.set("search", value);
      else q.delete("search");

      q.set("page", "1"); // reset page for new search

      router.push(`?${q.toString()}`);
    }, 400);

    return () => clearTimeout(timeout);
  }, [value, params, router]);

  const handleClear = () => {
    setValue("");
  };

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-9 pr-9 h-10"
      />
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-slate-100"
        >
          <X className="h-4 w-4 text-slate-400" />
        </Button>
      )}
    </div>
  );
}
