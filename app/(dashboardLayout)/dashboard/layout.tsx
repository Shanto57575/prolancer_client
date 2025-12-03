import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getProfileAction } from "@/actions/user/getProfileAction";
import { Montserrat } from "next/font/google";

export const dynamic = "force-dynamic";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role } = (await getProfileAction()).data;

  return (
    <div className={montserrat.className}>
      <SidebarProvider>
        <AppSidebar role={role} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
