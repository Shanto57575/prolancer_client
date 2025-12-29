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
import {
  LayoutDashboard,
  UserCog,
  Users,
  Briefcase,
  CreditCard,
  FileText,
  MessageSquare,
  PlusCircle,
  Folders,
} from "lucide-react";

export const ADMIN_ROUTES = [
  {
    title: "User Management",
    items: [
      {
        title: "Admin Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Manage Accounts",
        url: "/dashboard/manage-account",
        icon: UserCog,
      },
      {
        title: "Manage Users",
        url: "/dashboard/admin/manage-users",
        icon: Users,
      },
      {
        title: "Manage Services",
        url: "/dashboard/admin/manage-services",
        icon: Briefcase,
      },
    ],
  },
  {
    title: "Platform",
    items: [
      {
        title: "Payments",
        url: "/dashboard/admin/payments",
        icon: CreditCard,
      },
    ],
  },
];

export const FREELANCER_ROUTES = [
  {
    title: "My Profile",
    items: [
      {
        title: "Freelancer Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Manage Account",
        url: "/dashboard/manage-account",
        icon: UserCog,
      },
      {
        title: "My Applied Jobs",
        url: "/dashboard/freelancer/my-applications",
        icon: FileText,
      },
    ],
  },
  {
    title: "Work",
    items: [
      {
        title: "Messages",
        url: "/dashboard/freelancer/messages",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        title: "Payments",
        url: "/dashboard/freelancer/payments",
        icon: CreditCard,
      },
    ],
  },
];

export const CLIENT_ROUTES = [
  {
    title: "My Profile",
    items: [
      {
        title: "Client Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Manage Account",
        url: "/dashboard/manage-account",
        icon: UserCog,
      },
    ],
  },
  {
    title: "Jobs",
    items: [
      {
        title: "Create Job",
        url: "/dashboard/client/create-job",
        icon: PlusCircle,
      },
      {
        title: "My Posted Jobs",
        url: "/dashboard/client/my-posted-jobs",
        icon: Folders,
      },
      {
        title: "Messages",
        url: "/dashboard/client/messages",
        icon: MessageSquare,
      },
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
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`${
                          item.url === pathname
                            ? "bg-black text-white hover:bg-gray-700 hover:text-white duration-300 transition-all ease-in-out p-3"
                            : ""
                        }`}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center gap-3"
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
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
