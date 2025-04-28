import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { FavoritesTable } from "@/components/FavoritesTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function Settings() {
  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account preferences and application settings"
      />

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="spreadsheet">Favorites Spreadsheet</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your personal account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Sarah Peterson" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="sarah.peterson@carenav.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Job Title</Label>
                  <Input id="role" defaultValue="Senior Care Specialist" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <Button onClick={handleSave}>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure which emails you receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">New Messages</h3>
                    <p className="text-sm text-care-neutral-500">Receive an email when someone sends you a message</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Appointment Reminders</h3>
                    <p className="text-sm text-care-neutral-500">Receive reminders about upcoming appointments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Facility Updates</h3>
                    <p className="text-sm text-care-neutral-500">Notifications about partner facility changes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Newsletter</h3>
                    <p className="text-sm text-care-neutral-500">Monthly newsletter and product updates</p>
                  </div>
                  <Switch />
                </div>
              </div>
              <Button onClick={handleSave}>Save Notification Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Customize the appearance of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select defaultValue="light">
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="density">Interface Density</Label>
                  <Select defaultValue="default">
                    <SelectTrigger>
                      <SelectValue placeholder="Select density" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleSave}>Save Appearance Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="spreadsheet" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Favorites Spreadsheet</CardTitle>
              <CardDescription>Manage your favorite facilities using this interactive spreadsheet</CardDescription>
            </CardHeader>
            <CardContent>
              <FavoritesTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Manage your subscription plan and payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md bg-care-blue-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-lg">Professional Plan</h3>
                      <p className="text-sm text-care-neutral-500">$49/month, billed annually</p>
                    </div>
                    <div className="bg-care-blue-100 text-care-blue-700 font-medium px-2 py-1 rounded-full text-xs">
                      Current Plan
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-care-blue-700"></div>
                      <p className="text-sm">Unlimited clients</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-care-blue-700"></div>
                      <p className="text-sm">Access to all facilities</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-care-blue-700"></div>
                      <p className="text-sm">Advanced reporting</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-care-blue-700"></div>
                      <p className="text-sm">Email and phone support</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="outline">Manage Payment Methods</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your past invoices and payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "Apr 01, 2025", amount: "$49.00", status: "Paid", invoice: "INV-2025-04" },
                  { date: "Mar 01, 2025", amount: "$49.00", status: "Paid", invoice: "INV-2025-03" },
                  { date: "Feb 01, 2025", amount: "$49.00", status: "Paid", invoice: "INV-2025-02" },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">{item.date}</p>
                      <p className="text-sm text-care-neutral-500">{item.invoice}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.amount}</p>
                      <p className="text-sm text-green-600">{item.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
