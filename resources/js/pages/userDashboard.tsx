import AppLayout from '@/layouts/app-layout-client'
import { type BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { TrendingUp } from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: 'Energy Consumption',
    color: '#4B5',
  },
} satisfies ChartConfig

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'User Dashboard',
    href: '/user-dashboard',
  },
]

export default function UserDashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        {/* Summary Cards */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card className="aspect-video">
            <CardHeader>
              <CardTitle>Real-time Usage</CardTitle>
              <CardDescription>Live electricity usage</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-600">342 W</p>
              <p className="text-sm text-muted-foreground mt-1">
                Updated 2 seconds ago
              </p>
            </CardContent>
          </Card>

          <Card className="aspect-video">
            <CardHeader>
              <CardTitle>This Month’s Consumption</CardTitle>
              <CardDescription>Energy summary</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-blue-600">135 kWh</p>
              <p className="text-sm text-muted-foreground mt-1">
                Estimated cost: <span className="font-semibold">$21.30</span>
              </p>
            </CardContent>
          </Card>

          <Card className="aspect-video">
            <CardHeader>
              <CardTitle>Active Devices</CardTitle>
              <CardDescription>Currently powered</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li>Fridge (120 W)</li>
                <li>Air Conditioner (800 W)</li>
                <li>Water Heater (OFF)</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Energy Usage Analytics</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                data={chartData}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="desktop"
                  type="linear"
                  stroke="#4f46e8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium">
              Trending up by 2.2% this month
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-muted-foreground">
              Showing energy consumption over the last 6 months
            </div>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  )
}
