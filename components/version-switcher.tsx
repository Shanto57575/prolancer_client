"use client";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

export function VersionSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link
          href="/"
          className="flex items-center justify-center rounded-lg p-0"
        >
          <Image src="/prolancerlogo.png" alt="Logo" width={120} height={120} />
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
