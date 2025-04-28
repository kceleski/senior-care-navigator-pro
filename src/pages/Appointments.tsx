
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { AppointmentList } from "@/components/AppointmentList";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus, ListFilter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export default function Appointments() {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointments"
        description="Schedule and manage client appointments"
      >
        <div className="flex gap-2">
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
              <CalendarIcon className="h-4 w-4 mr-1" /> Calendar
            </Button>
          </div>
          <Button className="bg-care-blue-600 hover:bg-care-blue-700">
            <Plus className="mr-1 h-4 w-4" /> New Appointment
          </Button>
        </div>
      </PageHeader>

      {viewMode === "list" ? (
        <AppointmentList />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Appointment Calendar</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-auto">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border shadow"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg mb-3">
                  Appointments for {date?.toLocaleDateString()}
                </h3>
                <div className="space-y-3">
                  {/* Display appointments for the selected date */}
                  <div className="p-3 border rounded-md hover:bg-care-blue-50 transition-colors">
                    <p className="font-medium">9:00 AM - Dorothy Johnson</p>
                    <p className="text-sm text-care-neutral-500">Initial assessment</p>
                  </div>
                  <div className="p-3 border rounded-md hover:bg-care-blue-50 transition-colors">
                    <p className="font-medium">11:30 AM - Robert Williams</p>
                    <p className="text-sm text-care-neutral-500">Virtual facility tour</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
