"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function CommonPagination({
  page,
  limit,
  total,
}: {
  page: number;
  limit: number;
  total: number;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const totalPages = Math.ceil(total / limit);

  const update = (p: number) => {
    const q = new URLSearchParams(params.toString());
    q.set("page", String(p));
    router.push(`?${q.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => page > 1 && update(page - 1)} />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i + 1}>
            <PaginationLink
              isActive={page === i + 1}
              onClick={() => update(i + 1)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => page < totalPages && update(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
