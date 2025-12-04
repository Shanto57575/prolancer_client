"use client";

import { Button } from "@/components/ui/button";
import ServiceModal from "./ServiceModal";
import DeleteServiceDialog from "./DeleteServiceDialog";
import { Edit, Trash2 } from "lucide-react";

interface Service {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
}

interface ServiceTableProps {
  services: Service[];
}

export default function ServiceTable({ services }: ServiceTableProps) {
  return (
    <div className="rounded-md border">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Name
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Created At
            </th>
            <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {services.length === 0 ? (
            <tr>
              <td colSpan={3} className="p-4 text-center text-muted-foreground">
                No services found.
              </td>
            </tr>
          ) : (
            services.map((service) => (
              <tr
                key={service._id}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <td className="p-4 align-middle font-medium">{service.name}</td>
                <td className="p-4 align-middle">
                  {new Date(service.createdAt).toLocaleString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="p-4 align-middle text-right">
                  <div className="flex justify-end gap-2">
                    <ServiceModal
                      service={service}
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      }
                    />
                    <DeleteServiceDialog
                      serviceId={service._id}
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      }
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
