import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getCurrentUser } from "@/lib/dal/user";
import { Open_Sans } from "next/font/google";

export const dynamic = "force-dynamic";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

import NotificationIndicator from "@/components/Shared/NotificationIndicator";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userRes = await getCurrentUser();
  const user = userRes?.data;
  const role = user?.role;

  if (!user) {
    redirect("/login");
  }

  return (
    <div className={openSans.className}>
      <SidebarProvider>
        <AppSidebar role={role} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
            </div>
            <div className="flex items-center gap-4">
              <NotificationIndicator />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
