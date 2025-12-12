"use client";

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
  useSidebar,
} from "@/components/ui/sidebar";
import { UserRole } from "@/app/types/user";
import Link from "next/link";
import LogoutButton from "@/utils/LogoutButton";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const ADMIN_ROUTES = [
  {
    title: "User Management",
    items: [
      { title: "Admin Dashboard", url: "/dashboard" },
      { title: "Manage Accounts", url: "/dashboard/manage-account" },
      {
        title: "Manage Users",
        url: "/dashboard/admin/manage-users",
      },
    ],
  },
  {
    title: "Platform",
    items: [{ title: "Payments", url: "/dashboard/admin/payments" }],
  },
];

export const FREELANCER_ROUTES = [
  {
    title: "My Profile",
    items: [
      { title: "Freelancer Dashboard", url: "/dashboard" },
      { title: "Manage Account", url: "/dashboard/manage-account" },
      {
        title: "My Applied Jobs",
        url: "/dashboard/freelancer/my-applications",
      },
    ],
  },
  {
    title: "Work",
    items: [{ title: "Messages", url: "/dashboard/freelancer/messages" }],
  },
  {
    title: "Finance",
    items: [{ title: "Payments", url: "/dashboard/freelancer/payments" }],
  },
];

export const CLIENT_ROUTES = [
  {
    title: "My Profile",
    items: [
      { title: "Client Dashboard", url: "/dashboard" },
      { title: "Manage Account", url: "/dashboard/manage-account" },
    ],
  },
  {
    title: "Jobs",
    items: [
      { title: "Create Job", url: "/dashboard/client/create-job" },
      { title: "My Posted Jobs", url: "/dashboard/client/my-posted-jobs" },
      { title: "Messages", url: "/dashboard/client/messages" },
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
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();

  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, setOpenMobile, isMobile]);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {data.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`${
                        item.url === pathname
                          ? "bg-black text-white hover:bg-gray-700 hover:text-white duration-300 transition-all ease-in-out p-3"
                          : ""
                      }`}
                    >
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
