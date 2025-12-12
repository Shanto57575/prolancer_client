"use strict";
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { getMyPaymentsAction } from "@/actions/payment/payment";
import CommonSearch from "@/components/Shared/CommonSearch";
import CommonFilter from "@/components/Shared/CommonFilter";
import CommonPagination from "@/components/Shared/CommonPagination";
import CommonSort from "@/components/Shared/CommonSort";

export default function FreelancerPaymentsPage() {
  const searchParams = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [payments, setPayments] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [meta, setMeta] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const query = searchParams.toString();
        const res = await getMyPaymentsAction(query);
        if (res.ok) {
          setPayments(res.data.data);
          setMeta(res.data.meta);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [searchParams]);

  const planOptions = [
    { label: "All Plans", value: "ALL" },
    { label: "Monthly", value: "MONTHLY" },
    { label: "Yearly", value: "YEARLY" },
  ];

  const sortOptions = [
    { label: "Date", value: "createdAt" },
    { label: "Amount", value: "amount" },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">My Payments</h1>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border p-4 space-y-4">
        {/* Filters Row */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <CommonSearch placeholder="Search Transaction ID..." />
          <div className="flex flex-col md:flex-row gap-2">
            <CommonFilter
              name="plan"
              options={planOptions}
              placeholder="Filter by Plan"
            />
            <CommonSort fields={sortOptions} defaultField="createdAt" />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Transaction ID
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ) : payments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No payment history found
                    </TableCell>
                  </TableRow>
                ) : (
                  payments.map((payment) => (
                    <TableRow key={payment._id}>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {payment.plan}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${(payment.amount / 100).toFixed(2)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <code className="text-xs bg-muted px-1 py-0.5 rounded">
                          {payment.stripeSessionId?.slice(0, 10)}...
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            payment.status === "paid" ||
                            payment.status === "succeeded"
                              ? "bg-green-500/10 text-green-600 border-green-200"
                              : "bg-red-500/10 text-red-600 border-red-200"
                          }
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {format(new Date(payment.createdAt), "PPP")}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        <CommonPagination
          page={meta.page || 1}
          limit={meta.limit || 10}
          total={meta.total || 0}
        />
      </div>
    </div>
  );
}
