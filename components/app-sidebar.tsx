"use client";
import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
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
} from "@/components/ui/sidebar";
import { UserRole } from "@/app/types/user";
import Link from "next/link";
import LogoutButton from "@/utils/LogoutButton";

export const ADMIN_ROUTES = [
  {
    title: "User Management",
    items: [
      { title: "Manage Accounts", url: "/dashboard/manage-account" },
      {
        title: "Manage Freelancers",
        url: "/dashboard/admin/manage-freelancers",
      },
      { title: "Manage Clients", url: "/dashboard/admin/manage-clients" },
    ],
  },
  {
    title: "Platform",
    items: [
      { title: "Services", url: "/dashboard/admin/services" },
      { title: "Payments", url: "/dashboard/admin/payments" },
      { title: "Reports", url: "/dashboard/admin/reports" },
      { title: "Settings", url: "/dashboard/admin/settings" },
    ],
  },
];

export const FREELANCER_ROUTES = [
  {
    title: "My Profile",
    items: [
      { title: "Manage Account", url: "/dashboard/manage-account" },
      { title: "Portfolio", url: "/dashboard/freelancer/portfolio" },
      { title: "Skills", url: "/dashboard/freelancer/skills" },
      { title: "Resume", url: "/dashboard/freelancer/resume" },
    ],
  },
  {
    title: "Work",
    items: [
      { title: "My Services", url: "/dashboard/freelancer/services" },
      { title: "Requests", url: "/dashboard/freelancer/requests" },
      { title: "Messages", url: "/dashboard/freelancer/messages" },
    ],
  },
  {
    title: "Finance",
    items: [
      { title: "Payments", url: "/dashboard/freelancer/payments" },
      { title: "Earnings Report", url: "/dashboard/freelancer/earnings" },
    ],
  },
];

export const CLIENT_ROUTES = [
  {
    title: "My Profile",
    items: [
      { title: "Manage Account", url: "/dashboard/manage-account" },
      // { title: "Company Info", url: "/dashboard/client/company" },
      // { title: "Website", url: "/dashboard/client/website" },
    ],
  },
  {
    title: "Projects",
    items: [
      { title: "Create Project", url: "/dashboard/client/create-project" },
      { title: "My Projects", url: "/dashboard/client/projects" },
      { title: "Hire Freelancer", url: "/dashboard/client/hire" },
      { title: "Messages", url: "/dashboard/client/messages" },
    ],
  },
  {
    title: "Finance",
    items: [
      { title: "Payments", url: "/dashboard/client/payments" },
      { title: "Invoices", url: "/dashboard/client/invoices" },
    ],
  },
];

const ROLE_BASED_ROUTES = {
  [UserRole.ADMIN]: ADMIN_ROUTES,
  [UserRole.FREELANCER]: FREELANCER_ROUTES,
  [UserRole.CLIENT]: CLIENT_ROUTES,
};

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
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <LogoutButton />
      <SidebarRail />
    </Sidebar>
  );
}
