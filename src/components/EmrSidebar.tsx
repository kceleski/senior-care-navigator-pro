
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar, 
  Inbox, 
  Search, 
  MapPin, 
  FileText, 
  User, 
  Settings, 
  BarChart,
  ChevronLeft,
  ChevronRight,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Appointments", href: "/appointments", icon: Calendar },
  { name: "Inbox", href: "/inbox", icon: Inbox },
  { name: "Client Search", href: "/clients", icon: Search },
  { name: "Facility Search", href: "/facilities", icon: MapPin },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "My Bio", href: "/bio", icon: User },
  { name: "Reports", href: "/reports", icon: BarChart },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function EmrSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-white shadow-lg transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && (
          <div className="text-xl font-bold text-care-blue-700">
            Senior Care Navigator
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <nav className="flex flex-1 flex-col overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-care-blue-100 text-care-blue-800"
                    : "text-care-neutral-600 hover:bg-care-blue-50 hover:text-care-blue-700"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0",
                    location.pathname === item.href
                      ? "text-care-blue-700"
                      : "text-care-neutral-400"
                  )}
                />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t p-4">
        {!collapsed && (
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-care-blue-500 flex items-center justify-center text-white">
              SP
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-care-neutral-700">Sarah Peterson</p>
              <p className="text-xs text-care-neutral-500">Care Specialist</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
