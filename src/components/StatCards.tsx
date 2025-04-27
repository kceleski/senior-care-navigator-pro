
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersRound, CalendarDays, Building2, ClipboardCheck } from "lucide-react";

export function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-care-neutral-500">
            Active Clients
          </CardTitle>
          <UsersRound className="h-4 w-4 text-care-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-care-neutral-900">24</div>
          <p className="text-xs text-care-green-600 font-medium mt-1">
            +2 this month
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-care-neutral-500">
            Today's Appointments
          </CardTitle>
          <CalendarDays className="h-4 w-4 text-care-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-care-neutral-900">4</div>
          <p className="text-xs text-care-neutral-500 font-medium mt-1">
            Next at 11:30 AM
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-care-neutral-500">
            Facility Partners
          </CardTitle>
          <Building2 className="h-4 w-4 text-care-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-care-neutral-900">48</div>
          <p className="text-xs text-care-neutral-500 font-medium mt-1">
            In 5 counties
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-care-neutral-500">
            Placements this Month
          </CardTitle>
          <ClipboardCheck className="h-4 w-4 text-care-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-care-neutral-900">7</div>
          <p className="text-xs text-care-green-600 font-medium mt-1">
            +2 from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
