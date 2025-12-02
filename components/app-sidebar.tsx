import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { UserRole } from "@/app/types/user"

export const ADMIN_ROUTES = [
  {
    title: "User Management",
    items: [
      { title: "Manage Accounts", url: "/admin/manage-accounts" },
      { title: "Manage Freelancers", url: "/admin/manage-freelancers" },
      { title: "Manage Clients", url: "/admin/manage-clients" },
    ],
  },
  {
    title: "Platform",
    items: [
      { title: "Services", url: "/admin/services" },
      { title: "Payments", url: "/admin/payments" },
      { title: "Reports", url: "/admin/reports" },
      { title: "Settings", url: "/admin/settings" },
    ],
  },
]

export const FREELANCER_ROUTES = [
  {
    title: "My Profile",
    items: [
      { title: "Manage Account", url: "/freelancer/manage-account" },
      { title: "Portfolio", url: "/freelancer/portfolio" },
      { title: "Skills", url: "/freelancer/skills" },
      { title: "Resume", url: "/freelancer/resume" },
    ],
  },
  {
    title: "Work",
    items: [
      { title: "My Services", url: "/freelancer/services" },
      { title: "Requests", url: "/freelancer/requests" },
      { title: "Messages", url: "/freelancer/messages" },
    ],
  },
  {
    title: "Finance",
    items: [
      { title: "Payments", url: "/freelancer/payments" },
      { title: "Earnings Report", url: "/freelancer/earnings" },
    ],
  },
]

export const CLIENT_ROUTES = [
  {
    title: "My Profile",
    items: [
      { title: "Manage Account", url: "/client/manage-account" },
      { title: "Company Info", url: "/client/company" },
      { title: "Website", url: "/client/website" },
    ],
  },
  {
    title: "Projects",
    items: [
      { title: "Create Project", url: "/client/create-project" },
      { title: "My Projects", url: "/client/projects" },
      { title: "Hire Freelancer", url: "/client/hire" },
      { title: "Messages", url: "/client/messages" },
    ],
  },
  {
    title: "Finance",
    items: [
      { title: "Payments", url: "/client/payments" },
      { title: "Invoices", url: "/client/invoices" },
    ],
  },
]

const ROLE_BASED_ROUTES = {
  [UserRole.ADMIN]: ADMIN_ROUTES,
  [UserRole.FREELANCER]: FREELANCER_ROUTES,
  [UserRole.CLIENT]: CLIENT_ROUTES,
}

export function AppSidebar({ role, ...props }: { role: UserRole }) {
  const data = ROLE_BASED_ROUTES[role] || [];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher />
        <SearchForm />
      </SidebarHeader>

      <SidebarContent>
        {data.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
