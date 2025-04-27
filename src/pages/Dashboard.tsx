
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { StatCards } from "@/components/StatCards";
import { AppointmentList } from "@/components/AppointmentList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Bell, Plus } from "lucide-react";

export default function Dashboard() {
  return (
    <div>
      <PageHeader 
        title="Dashboard" 
        description="Welcome back, Sarah. Here's what's happening today."
      >
        <Button className="bg-care-blue-600 hover:bg-care-blue-700">
          <Plus className="mr-1 h-4 w-4" /> New Client
        </Button>
      </PageHeader>
      
      <StatCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AppointmentList />
        </div>
        
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center p-2 rounded-md hover:bg-care-blue-50 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-care-blue-100 flex items-center justify-center text-care-blue-600 mr-3">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Follow up with Margaret Brown</p>
                    <p className="text-xs text-care-neutral-500">Due tomorrow</p>
                  </div>
                </div>
                
                <div className="flex items-center p-2 rounded-md hover:bg-care-blue-50 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-care-blue-100 flex items-center justify-center text-care-blue-600 mr-3">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Schedule facility tour for Robert Williams</p>
                    <p className="text-xs text-care-neutral-500">Due in 2 days</p>
                  </div>
                </div>
                
                <div className="flex items-center p-2 rounded-md hover:bg-care-blue-50 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Invoice payment reminder</p>
                    <p className="text-xs text-care-neutral-500">Overdue by 3 days</p>
                  </div>
                </div>
              </div>
              
              <Button variant="link" className="text-care-blue-600 p-0 h-auto mt-3 text-sm">
                View all tasks
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-2 rounded-md border-l-4 border-care-green-500 bg-care-green-50">
                  <p className="text-sm font-medium text-care-neutral-800">New client form submitted</p>
                  <p className="text-xs text-care-neutral-500">10 minutes ago</p>
                </div>
                
                <div className="p-2 rounded-md border-l-4 border-care-blue-500 bg-care-blue-50">
                  <p className="text-sm font-medium text-care-neutral-800">Facility tour confirmed</p>
                  <p className="text-xs text-care-neutral-500">1 hour ago</p>
                </div>
                
                <div className="p-2 rounded-md border-l-4 border-amber-500 bg-amber-50">
                  <p className="text-sm font-medium text-care-neutral-800">Message from Sunrise Senior Living</p>
                  <p className="text-xs text-care-neutral-500">Yesterday</p>
                </div>
              </div>
              
              <Button variant="link" className="text-care-blue-600 p-0 h-auto mt-3 text-sm">
                See all notifications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
