"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  LegendPayload,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Users,
  UserCheck,
  Briefcase,
  FileText,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

interface AdminDashboardProps {
  stats: IAdminDashboardStats;
}

interface IAdminDashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalJobs: number;
  totalApplications: number;
  totalFreelancers: number;
  totalClients: number;
}

interface PieChartPayload {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload?: PieChartPayload;
  }>;
}

// Define tooltip components outside of render
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-800">{payload[0].name}</p>
        <p className="text-sm text-gray-600">
          Value:{" "}
          <span className="font-bold text-emerald-600">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length && payload[0].payload) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-800">{data.name}</p>
        <p className="text-sm text-gray-600">
          Count:{" "}
          <span className="font-bold" style={{ color: data.color }}>
            {data.value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default function AdminDashboard({ stats }: AdminDashboardProps) {
  const userRoleData = [
    { name: "Freelancers", value: stats.totalFreelancers, color: "#10b981" },
    { name: "Clients", value: stats.totalClients, color: "#059669" },
  ];

  const overviewData = [
    { name: "Total Users", value: stats.totalUsers },
    { name: "Active Users", value: stats.activeUsers },
    { name: "Jobs", value: stats.totalJobs },
    { name: "Applications", value: stats.totalApplications },
  ];

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      gradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      iconBg: "bg-emerald-400/20",
      trend: "+12.5%",
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: UserCheck,
      gradient: "bg-gradient-to-br from-green-500 to-green-600",
      iconBg: "bg-green-400/20",
      trend: "+8.2%",
    },
    {
      title: "Total Jobs",
      value: stats.totalJobs,
      icon: Briefcase,
      gradient: "bg-gradient-to-br from-teal-500 to-teal-600",
      iconBg: "bg-teal-400/20",
      trend: "+15.3%",
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      icon: FileText,
      gradient: "bg-gradient-to-br from-cyan-500 to-cyan-600",
      iconBg: "bg-cyan-400/20",
      trend: "+23.1%",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-2 text-sm text-emerald-600 font-medium">
        <TrendingUp className="h-4 w-4" />
        <span>All metrics trending up</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-0"
            >
              <div className={`${stat.gradient} p-6 w-full h-full`}>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`${stat.iconBg} p-3 rounded-xl backdrop-blur-sm`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-white">
                    <ArrowUpRight className="h-3 w-3" />
                    {stat.trend}
                  </div>
                </div>
                <div>
                  <p className="text-white/90 text-sm font-medium mb-1">
                    {stat.title}
                  </p>
                  <p className="text-4xl font-bold text-white">
                    {stat.value.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-0 shadow-md overflow-hidden p-0">
          <CardHeader className="bg-linear-to-r from-emerald-50 to-green-50 border-b p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 rounded-lg">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">
                  System Overview
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Platform metrics at a glance
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 bg-white">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={overviewData}>
                <defs>
                  <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={{ stroke: "#d1d5db" }}
                />
                <YAxis
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={{ stroke: "#d1d5db" }}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(16, 185, 129, 0.1)" }}
                />
                <Bar
                  dataKey="value"
                  fill="url(#colorBar)"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-0 shadow-md overflow-hidden p-0">
          <CardHeader className="bg-linear-to-r from-emerald-50 to-teal-50 border-b p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-600 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">
                  User Distribution
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Freelancers vs Clients
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 bg-white">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1CA7EC" stopOpacity={1} />
                    <stop offset="100%" stopColor="#7BD5F5" stopOpacity={1} />
                  </linearGradient>
                  <linearGradient
                    id="greenGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <Pie
                  data={userRoleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {userRoleData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? "url(#blueGradient)"
                          : "url(#greenGradient)"
                      }
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value: string, entry: LegendPayload) => (
                    <span className="text-sm font-medium text-gray-700">
                      {value}:{" "}
                      <span className="font-bold">{entry.payload?.value}</span>
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
