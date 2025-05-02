import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Roles',
    href: '/roles',
  },
];

const chartData = [
  { month: "January", EnergyUsage: 186 },
  { month: "February", EnergyUsage: 305 },
  { month: "March", EnergyUsage: 237 },
  { month: "April", EnergyUsage: 73 },
  { month: "May", EnergyUsage: 209 },
  { month: "June", EnergyUsage: 214 },
  { month: "July", EnergyUsage: 21 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#4f46e5",
  },
} satisfies ChartConfig;

export default function Dashboard({ userCount }: { userCount: number }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {/* Total Users Card */}
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 shadow-xl text-white flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold drop-shadow-md">{userCount}</div>
              <div className="text-lg tracking-wide uppercase font-medium mt-1 drop-shadow">Total Users</div>
            </div>
            <div className="absolute inset-0 bg-white opacity-5 pointer-events-none"></div>
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl opacity-20"></div>
          </div>

          {/* Total Devices Card */}
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-gradient-to-r from-green-400 via-yellow-400 to-yellow-500 shadow-xl text-white flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold drop-shadow-md">12345</div>
              <div className="text-lg tracking-wide uppercase font-medium mt-1 drop-shadow">Total Devices</div>
            </div>
            <div className="absolute inset-0 bg-white opacity-5 pointer-events-none"></div>
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl opacity-20"></div>
          </div>

          {/* Total Energy Card */}
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 shadow-xl text-white flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold drop-shadow-md">145678 Khw</div>
              <div className="text-lg tracking-wide uppercase font-medium mt-1 drop-shadow">Total Energy</div>
            </div>
            <div className="absolute inset-0 bg-white opacity-5 pointer-events-none"></div>
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border p-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Energy Usage Trend</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[300px]">
                <ChartContainer config={chartConfig}>
                  <LineChart
                    data={chartData}
                    width={600}
                    height={300}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Line
                      type="monotone"
                      dataKey="EnergyUsage"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total energy usage for the last 6 months
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
