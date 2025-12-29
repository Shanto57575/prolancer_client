import { getAllServices } from "@/actions/service/service";
import CommonSearch from "@/components/Shared/CommonSearch";
import CommonPagination from "@/components/Shared/CommonPagination";
import ServiceTable from "@/components/modules/services/ServiceTable";
import { Button } from "@/components/ui/button";
import ServiceModal from "@/components/modules/services/ServiceModal";

export default async function ManageService({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 10;
  const search = params.search || "";

  const result = await getAllServices({ page, limit, search });

  const services = result.data || [];
  const meta = result.meta || { page, limit, total: services.length };

  return (
    <div className="space-y-8 max-w-7xl mx-auto mt-5">
      <h1 className="text-3xl font-bold">Manage Services</h1>
      <div className="flex items-center justify-between gap-x-2">
        <CommonSearch />
        <ServiceModal trigger={<Button>Add New Service</Button>} />
      </div>

      <div className="min-h-[70vh]">
        <ServiceTable services={services} />
      </div>

      <CommonPagination
        page={meta.page}
        limit={meta.limit}
        total={meta.total}
      />
    </div>
  );
}
