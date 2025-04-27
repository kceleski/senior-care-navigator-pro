
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ListFilter } from "lucide-react";
import { ClientStatusBadge } from "@/components/ClientStatusBadge";
import { cn } from "@/lib/utils";

// Mock data for initial development
const appointments = [
  {
    id: "1",
    clientId: "c1",
    clientName: "Dorothy Johnson",
    status: "assessment",
    description: "Initial assessment to determine care needs and preferences",
    time: "9:00 AM",
    location: "Video Call",
    date: new Date(2025, 3, 27),
  },
  {
    id: "2",
    clientId: "c2",
    clientName: "Robert Williams",
    status: "tour",
    description: "Virtual tour of Sunrise Senior Living",
    time: "11:30 AM",
    location: "Video Call",
    date: new Date(2025, 3, 27),
  },
  {
    id: "3",
    clientId: "c3",
    clientName: "Margaret Brown",
    status: "paperwork",
    description: "Complete admission paperwork for Green Valley Care Home",
    time: "2:00 PM",
    location: "Office",
    date: new Date(2025, 3, 27),
  },
  {
    id: "4",
    clientId: "c4",
    clientName: "James Davis",
    status: "follow-up-1w",
    description: "One week follow-up call after move-in",
    time: "3:30 PM",
    location: "Phone Call",
    date: new Date(2025, 3, 27),
  },
];

type ViewMode = "list" | "calendar";

export function AppointmentList() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Today's Appointments</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="bg-care-blue-50 rounded-lg flex p-1">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 rounded-md",
                  viewMode === "list" && "bg-white shadow-sm"
                )}
                onClick={() => setViewMode("list")}
              >
                <ListFilter className="h-4 w-4 mr-1" /> List
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 rounded-md",
                  viewMode === "calendar" && "bg-white shadow-sm"
                )}
                onClick={() => setViewMode("calendar")}
              >
                <Calendar className="h-4 w-4 mr-1" /> Calendar
              </Button>
            </div>
          </div>
        </div>
        <CardDescription>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 rounded-lg border border-care-neutral-200 bg-white hover:bg-care-blue-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center justify-center bg-care-blue-100 text-care-blue-700 h-14 w-14 rounded-lg">
                  <span className="text-sm font-semibold">{appointment.time}</span>
                  <span className="text-xs">{appointment.location}</span>
                </div>
                <div>
                  <h3 className="font-medium text-care-neutral-900">
                    {appointment.clientName}
                  </h3>
                  <ClientStatusBadge status={appointment.status as any} className="my-1" />
                  <p className="text-sm text-care-neutral-600">
                    {appointment.description}
                  </p>
                </div>
              </div>
              <Link to={`/clients/${appointment.clientId}`}>
                <Button variant="ghost" size="sm" className="text-care-blue-600">
                  View Chart
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
