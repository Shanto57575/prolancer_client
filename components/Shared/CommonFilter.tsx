"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CommonFilterProps {
  name: string;
  options: { label: string; value: string }[];
  defaultValue?: string;
  placeholder?: string;
  className?: string;
}

export default function CommonFilter({
  name,
  options,
  defaultValue = "ALL",
  placeholder = "Select...",
  className = "w-[160px]",
}: CommonFilterProps) {
  const router = useRouter();
  const params = useSearchParams();

  const currentValue = params.get(name) || defaultValue;

  const handleChange = (value: string) => {
    const q = new URLSearchParams(params.toString());

    if (value === "ALL" || !value) {
      q.delete(name);
    } else {
      q.set(name, value);
    }

    q.set("page", "1"); // reset page for new filter
    router.push(`?${q.toString()}`);
  };

  return (
    <Select value={currentValue} onValueChange={handleChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
