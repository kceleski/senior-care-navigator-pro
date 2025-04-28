
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText } from "lucide-react";

// Mock data for reports
const monthlyPlacementsData = [
  { name: "Jan", placements: 4 },
  { name: "Feb", placements: 6 },
  { name: "Mar", placements: 5 },
  { name: "Apr", placements: 7 },
  { name: "May", placements: 0 },
  { name: "Jun", placements: 0 },
  { name: "Jul", placements: 0 },
  { name: "Aug", placements: 0 },
  { name: "Sep", placements: 0 },
  { name: "Oct", placements: 0 },
  { name: "Nov", placements: 0 },
  { name: "Dec", placements: 0 },
];

const placementTypeData = [
  { name: "Assisted Living", value: 45 },
  { name: "Memory Care", value: 25 },
  { name: "Independent Living", value: 20 },
  { name: "Nursing Home", value: 10 },
];

const recentReports = [
  {
    id: "1",
    name: "Q1 2025 Performance Summary",
    type: "Quarterly",
    date: "Apr 15, 2025",
  },
  {
    id: "2",
    name: "March 2025 Placements",
    type: "Monthly",
    date: "Apr 05, 2025",
  },
  {
    id: "3",
    name: "Client Satisfaction Survey Results",
    type: "Custom",
    date: "Mar 28, 2025",
  },
  {
    id: "4",
    name: "Facility Partner Analysis",
    type: "Custom",
    date: "Mar 15, 2025",
  },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export default function Reports() {
  const [timeRange, setTimeRange] = useState("ytd");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="View and analyze your performance metrics"
      >
        <Button className="bg-care-blue-600 hover:bg-care-blue-700">
          <Download className="mr-1 h-4 w-4" /> Export Data
        </Button>
      </PageHeader>

      <div className="flex justify-between items-center">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="placements">Placements</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <div className="flex justify-end mb-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ytd">Year to Date</SelectItem>
                  <SelectItem value="last3">Last 3 Months</SelectItem>
                  <SelectItem value="last6">Last 6 Months</SelectItem>
                  <SelectItem value="last12">Last 12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Monthly Placements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyPlacementsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="placements" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Placement Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={placementTypeData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {placementTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Legend />
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReports.map((report) => (
                      <div 
                        key={report.id}
                        className="flex items-center justify-between p-4 rounded-md border hover:bg-care-blue-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-care-neutral-500" />
                          <div>
                            <p className="font-medium text-care-neutral-900">{report.name}</p>
                            <p className="text-sm text-care-neutral-500">{report.type} • {report.date}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="placements">
              <Card>
                <CardHeader>
                  <CardTitle>Placement Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-care-neutral-500">More detailed placement metrics and analysis will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="revenue">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-care-neutral-500">Revenue metrics and financial analysis will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clients">
              <Card>
                <CardHeader>
                  <CardTitle>Client Demographics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-care-neutral-500">Client demographic information and analytics will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
