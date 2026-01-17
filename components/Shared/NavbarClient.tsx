/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Menu, ChevronDown, User, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import NotificationIndicator from "@/components/Shared/NotificationIndicator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logoutAction } from "@/actions/auth/logoutAction";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
  currentUser?: any;
}

export default function NavbarClient({
  logo = {
    url: "/",
    src: "/prolancerlogo.png",
    alt: "ProLancer Logo",
    title: "ProLancer",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Find Jobs",
      url: "/jobs",
    },
    {
      title: "Hire Freelancer",
      url: "/hire-freelancer",
    },
    {
      title: "Why Prolancer",
      url: "/why-prolancer",
    },
    {
      title: "How it works",
      url: "/how-it-works",
    },
    {
      title: "Contact",
      url: "/contact",
    },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign Up", url: "/register" },
  },
  currentUser,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const getUserInitials = (user: any) => {
    if (!user) return "U";
    const name = user.name || user.email || "User";
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const finalMenu =
    currentUser?.role === "FREELANCER"
      ? [...menu, { title: "Pricing", url: "/pricing" }]
      : menu;

  return (
    <header className="py-4 lg:py-5 border-b bg-background/95 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Desktop */}
        <nav className="hidden lg:flex items-center justify-between gap-6">
          <div className="flex items-center gap-8 xl:gap-10 flex-1">
            <Link href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                width={100}
                height={100}
                alt={logo.alt}
                priority
              />
            </Link>

            <NavigationMenu className="flex-1">
              <NavigationMenuList className="gap-1">
                {finalMenu.map((item) => renderMenuItem(item, pathname))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {currentUser ? (
              <>
                <NotificationIndicator />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 h-10 px-3"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={currentUser.avatar}
                          alt={currentUser.name || currentUser.email}
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                          {getUserInitials(currentUser)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm max-w-[120px] truncate">
                        {currentUser.name || currentUser.email}
                      </span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 animate-in fade-in-0 zoom-in-95"
                  >
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {currentUser.name || "User"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                          {currentUser.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/manage-account"
                        className="cursor-pointer"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Manage Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => logoutAction()}
                      className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="default"
                  className="min-w-[70px]"
                >
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild size="default" className="min-w-[90px]">
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        <div className="lg:hidden flex items-center justify-between gap-4">
          <Link href={logo.url} className="flex items-center gap-2 shrink-0">
            <Image
              src={logo.src}
              width={100}
              height={100}
              className="dark:invert h-8 w-auto"
              alt={logo.alt}
              priority
            />
          </Link>

          <div className="flex items-center gap-2">
            {currentUser && <NotificationIndicator />}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 shrink-0"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[85vw] sm:w-[400px] overflow-y-auto p-0"
              >
                <SheetHeader className="px-6 py-5 border-b">
                  <SheetTitle className="flex items-center gap-2 text-left">
                    <Image
                      src={logo.src}
                      width={100}
                      height={100}
                      className="dark:invert h-8 w-auto"
                      alt={logo.alt}
                    />
                  </SheetTitle>
                </SheetHeader>

                <div className="px-6 py-6 flex flex-col gap-6">
                  <nav className="flex flex-col gap-1">
                    {finalMenu.map((item) =>
                      renderMobileMenuItem(item, setIsOpen, pathname)
                    )}
                  </nav>

                  <div className="flex flex-col gap-3 pt-4 border-t">
                    {currentUser ? (
                      <>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={currentUser.avatar}
                              alt={currentUser.name || currentUser.email}
                            />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {getUserInitials(currentUser)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {currentUser.name || "User"}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {currentUser.email}
                            </p>
                          </div>
                        </div>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full justify-start gap-2"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link href="/dashboard">
                            <User className="h-4 w-4" />
                            Dashboard
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full justify-start gap-2"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link href="/dashboard/manage-account">
                            <Settings className="h-4 w-4" />
                            Manage Account
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-2 text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                          onClick={() => {
                            setIsOpen(false);
                            logoutAction();
                          }}
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full justify-center"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button
                          asChild
                          className="w-full justify-center"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link href={auth.signup.url}>
                            {auth.signup.title}
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

const renderMenuItem = (item: MenuItem, pathname: string) => {
  const isActive = pathname === item.url;

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <Link
          href={item.url}
          className={cn(
            "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
            isActive && "bg-accent text-accent-foreground"
          )}
        >
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (
  item: MenuItem,
  setIsOpen: (open: boolean) => void,
  pathname: string
) => {
  const isActive = pathname === item.url;

  return (
    <Link
      key={item.title}
      href={item.url}
      onClick={() => setIsOpen(false)}
      className={cn(
        "text-base font-medium py-3 px-3 rounded-lg hover:bg-accent transition-colors",
        isActive && "bg-accent text-accent-foreground"
      )}
    >
      {item.title}
    </Link>
  );
};
