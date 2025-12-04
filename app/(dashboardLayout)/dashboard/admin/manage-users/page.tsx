import { getAllUsers } from "@/actions/user/userActions";
import CommonSearch from "@/components/Shared/CommonSearch";
import CommonPagination from "@/components/Shared/CommonPagination";
import CommonSort from "@/components/Shared/CommonSort";
import CommonFilter from "@/components/Shared/CommonFilter";
import UserTable from "@/components/modules/users/UserTable";

const sortFields = [
  { label: "Date Created", value: "createdAt" },
  { label: "Name", value: "name" },
  { label: "Email", value: "email" },
];

const roleOptions = [
  { label: "All Roles", value: "ALL" },
  { label: "Client", value: "CLIENT" },
  { label: "Freelancer", value: "FREELANCER" },
  { label: "Admin", value: "ADMIN" },
];

const statusOptions = [
  { label: "All Status", value: "ALL" },
  { label: "Active", value: "false" },
  { label: "Banned", value: "true" },
];

export default async function ManageUsers({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    role?: string;
    isBanned?: string;
  }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 10;
  const search = params.search || "";
  const sortBy = params.sortBy || "createdAt";
  const sortOrder = params.sortOrder || "desc";
  const role = params.role || "";
  const isBanned = params.isBanned || "";

  const result = await getAllUsers({
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    role,
    isBanned,
  });

  const users = result.data || [];
  const meta = result.meta || { page, limit, total: users.length };

  return (
    <div className="space-y-8 max-w-7xl mx-auto mt-5 px-4">
      <h1 className="text-3xl font-bold">Manage Users</h1>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <CommonSearch />
        <div className="flex items-center gap-2">
          <CommonSort fields={sortFields} defaultField="createdAt" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Role:</label>
          <CommonFilter
            name="role"
            options={roleOptions}
            defaultValue="ALL"
            placeholder="All Roles"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Status:</label>
          <CommonFilter
            name="isBanned"
            options={statusOptions}
            defaultValue="ALL"
            placeholder="All Status"
          />
        </div>
      </div>

      <div className="min-h-[70vh]">
        <UserTable users={users} />
      </div>

      <CommonPagination
        page={meta.page}
        limit={meta.limit}
        total={meta.total}
      />
    </div>
  );
}
