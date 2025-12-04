"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Ban, ShieldCheck } from "lucide-react";
import { banUser } from "@/actions/user/userActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isBanned: boolean;
  profilePicture?: string;
  createdAt: string;
  clientData?: {
    company?: string;
    website?: string;
    bio?: string;
    location?: string;
    experience?: number;
    rating?: number;
    designation?: string;
  };
  freelancerData?: {
    bio?: string;
    skills?: string[];
    portfolio?: string;
    resume?: string;
    otherWebsiteLink?: string;
    linkedinLink?: string;
    hourlyRate?: number;
    experience?: number;
    rating?: number;
    location?: string;
    designation?: string;
  };
}

interface UserTableProps {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleBanToggle = (user: User) => {
    const action = user.isBanned ? "unban" : "ban";
    const actionTitle = user.isBanned ? "Unban" : "Ban";

    toast(`Are you sure you want to ${action} ${user.name}?`, {
      position: "top-center",
      action: {
        label: `Yes, ${actionTitle}`,
        onClick: async () => {
          setLoading(user._id);
          try {
            const result = await banUser(user._id);
            if (result.ok) {
              toast.success(result.message);
              router.refresh();
            } else {
              toast.error(result.message);
            }
          } catch {
            toast.error("Failed to update user status");
          } finally {
            setLoading(null);
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {
          toast.dismiss();
        },
      },
    });
  };

  const getRoleData = (user: User) => {
    if (user.role === "CLIENT") return user.clientData;
    if (user.role === "FREELANCER") return user.freelancerData;
    return null;
  };

  const getValue = (user: User, field: string) => {
    const roleData = getRoleData(user);
    if (!roleData) return "N/A";

    const value = roleData[field as keyof typeof roleData];
    if (value === undefined || value === null || value === "") return "N/A";

    return value;
  };

  return (
    <div className="rounded-md border overflow-x-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Name
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Email
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Role
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Location
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Designation
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Experience
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Rating
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Status
            </th>
            <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {users.length === 0 ? (
            <tr>
              <td colSpan={9} className="p-4 text-center text-muted-foreground">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user._id}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <td className="p-4 align-middle font-medium">{user.name}</td>
                <td className="p-4 align-middle">{user.email}</td>
                <td className="p-4 align-middle">
                  <Badge
                    variant={user.role === "ADMIN" ? "default" : "secondary"}
                  >
                    {user.role}
                  </Badge>
                </td>
                <td className="p-4 align-middle">
                  {getValue(user, "location")}
                </td>
                <td className="p-4 align-middle">
                  {getValue(user, "designation")}
                </td>
                <td className="p-4 align-middle">
                  {getValue(user, "experience") === "N/A"
                    ? "N/A"
                    : `${getValue(user, "experience")} yrs`}
                </td>
                <td className="p-4 align-middle">
                  {getValue(user, "rating") === "N/A"
                    ? "N/A"
                    : `${getValue(user, "rating")}/5`}
                </td>
                <td
                  className={`p-4 align-middle ${
                    user.isBanned ? "text-red-50" : ""
                  }`}
                >
                  <Badge variant={user.isBanned ? "destructive" : "outline"}>
                    {user.isBanned ? "Banned" : "Active"}
                  </Badge>
                </td>
                <td className="p-4 align-middle text-right">
                  <div className="flex justify-end gap-2">
                    {user.role !== "ADMIN" && (
                      <Button
                        variant={user.isBanned ? "outline" : "destructive"}
                        size="sm"
                        onClick={() => handleBanToggle(user)}
                        disabled={loading === user._id}
                      >
                        {loading === user._id ? (
                          "Loading..."
                        ) : user.isBanned ? (
                          <>
                            <ShieldCheck className="h-4 w-4 mr-1" />
                            Unban
                          </>
                        ) : (
                          <>
                            <Ban className="h-4 w-4 mr-1" />
                            Ban
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
