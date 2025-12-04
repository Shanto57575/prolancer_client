"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

interface SortField {
  label: string;
  value: string;
}

interface CommonSortProps {
  fields: SortField[];
  defaultField?: string;
}

export default function CommonSort({ fields, defaultField }: CommonSortProps) {
  const router = useRouter();
  const params = useSearchParams();

  const currentSortBy =
    params.get("sortBy") || defaultField || fields[0]?.value;
  const currentSortOrder = params.get("sortOrder") || "desc";

  const updateSort = (field: string, order: string) => {
    const q = new URLSearchParams(params.toString());
    q.set("sortBy", field);
    q.set("sortOrder", order);
    q.set("page", "1"); // reset page for new sort
    router.push(`?${q.toString()}`);
  };

  const toggleOrder = () => {
    const newOrder = currentSortOrder === "asc" ? "desc" : "asc";
    updateSort(currentSortBy, newOrder);
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        value={currentSortBy}
        onValueChange={(value) => updateSort(value, currentSortOrder)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          {fields.map((field) => (
            <SelectItem key={field.value} value={field.value}>
              {field.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <button
        onClick={toggleOrder}
        className="p-2 border rounded-md hover:bg-accent transition-colors"
        title={currentSortOrder === "asc" ? "Ascending" : "Descending"}
      >
        <ArrowUpDown
          className={`h-4 w-4 ${
            currentSortOrder === "asc" ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
}
