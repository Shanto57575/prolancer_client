import { getDashboardStatsAction } from "@/actions/dashboard/getDashboardStatsAction";
import { getCurrentUser } from "@/lib/dal/user";
import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import ClientDashboard from "@/components/Dashboard/ClientDashboard";
import FreelancerDashboard from "@/components/Dashboard/FreelancerDashboard";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const userRes = await getCurrentUser();

  if (!userRes.ok || !userRes.data) {
    redirect("/login");
  }

  const user = userRes.data;
  const statsRes = await getDashboardStatsAction();
  const stats = statsRes.ok ? statsRes.data : null;

  if (!stats) {
    return <div>Failed to load dashboard stats.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}! Here&apos;s your overview.
        </p>
      </div>

      {user.role === "ADMIN" && <AdminDashboard stats={stats} />}
      {user.role === "CLIENT" && <ClientDashboard stats={stats} />}
      {user.role === "FREELANCER" && <FreelancerDashboard stats={stats} />}
    </div>
  );
}
