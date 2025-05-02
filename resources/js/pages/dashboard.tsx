import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend } from "recharts";
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
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Roles', href: '/roles' },
];

const chartData = [
  { month: "January", EnergyUsage: 186, PredictedUsage: 200 },
  { month: "February", EnergyUsage: 305, PredictedUsage: 290 },
  { month: "March", EnergyUsage: 237, PredictedUsage: 240 },
  { month: "April", EnergyUsage: 73, PredictedUsage: 100 },
  { month: "May", EnergyUsage: 209, PredictedUsage: 220 },
  { month: "June", EnergyUsage: 214, PredictedUsage: 210 },
  { month: "July", EnergyUsage: 21, PredictedUsage: 30 },
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
        {/* Summary Cards */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <SummaryCard value={userCount} label="Total Users" gradient="from-purple-600 via-pink-500 to-red-500" />
          <SummaryCard value={12345} label="Total Devices" gradient="from-green-400 via-yellow-400 to-yellow-500" />
          <SummaryCard value="145678 Khw" label="Total Energy" gradient="from-blue-500 via-indigo-500 to-purple-600" />
          <SummaryCard value="5.2%" label="Energy Savings" gradient="from-red-500 via-orange-500 to-yellow-500" />
          <SummaryCard value="2.5%" label="Energy Cost" gradient="from-green-500 via-blue-500 to-purple-600" />
          <SummaryCard value="3.5%" label="Energy Efficiency" gradient="from-pink-500 via-red-500 to-orange-500" />
        </div>

        {/* Actual Usage Chart */}
        <ChartCard
          title="Energy Usage Trend"
          description="January - June 2024"
          lines={[
            { dataKey: "EnergyUsage", stroke: "#3b82f6", label: "Actual Usage" },
          ]}
          data={chartData}
        />

        {/* Predicted vs Actual Usage */}
        <ChartCard
          title="Predicted vs Actual Energy Usage"
          description="Comparison powered by AI Model"
          lines={[
            { dataKey: "EnergyUsage", stroke: "#3b82f6", label: "Actual" },
            { dataKey: "PredictedUsage", stroke: "#22c55e", label: "Predicted" },
          ]}
          data={chartData}
        />
      </div>
    </AppLayout>
  );
}

// Reusable Summary Card
function SummaryCard({ value, label, gradient }: { value: number | string, label: string, gradient: string }) {
  return (
    <div className={`relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-gradient-to-r ${gradient} shadow-xl text-white flex items-center justify-center`}>
      <div className="text-center">
        <div className="text-4xl font-bold drop-shadow-md">{value}</div>
        <div className="text-lg tracking-wide uppercase font-medium mt-1 drop-shadow">{label}</div>
      </div>
      <div className="absolute inset-0 bg-white opacity-5 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl opacity-20"></div>
    </div>
  );
}

// Reusable Chart Card
function ChartCard({
  title,
  description,
  data,
  lines
}: {
  title: string,
  description: string,
  data: { month: string; EnergyUsage: number; PredictedUsage: number }[],
  lines: { dataKey: string, stroke: string, label: string }[]
}) {
  return (
    <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            <ChartContainer config={chartConfig}>
              <LineChart
                data={data}
                width={600}
                height={300}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => value.slice(0, 3)} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Legend />
                {lines.map((line, idx) => (
                  <Line
                    key={idx}
                    type="monotone"
                    dataKey={line.dataKey}
                    stroke={line.stroke}
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name={line.label}
                  />
                ))}
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing actual vs predicted energy usage for AI performance evaluation.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
