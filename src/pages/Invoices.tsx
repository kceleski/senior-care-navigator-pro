
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Download, Eye, FileText, Check, X, Calendar } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import { 
  Card,
  CardContent,
} from "@/components/ui/card";

// Mock data for invoices
const invoices = [
  {
    id: "INV-001",
    client: "Dorothy Johnson",
    amount: "$3,500",
    date: "Apr 27, 2025",
    dueDate: "May 27, 2025",
    status: "paid",
    facility: "Sunset Senior Living"
  },
  {
    id: "INV-002",
    client: "Robert Williams",
    amount: "$4,200",
    date: "Apr 25, 2025",
    dueDate: "May 25, 2025",
    status: "pending",
    facility: "Golden Years Care Home"
  },
  {
    id: "INV-003",
    client: "Margaret Brown",
    amount: "$3,800",
    date: "Apr 20, 2025",
    dueDate: "May 20, 2025",
    status: "paid",
    facility: "Serene Gardens"
  },
  {
    id: "INV-004",
    client: "James Davis",
    amount: "$4,500",
    date: "Apr 18, 2025",
    dueDate: "May 18, 2025",
    status: "overdue",
    facility: "Sunset Senior Living"
  },
  {
    id: "INV-005",
    client: "Emily Wilson",
    amount: "$3,200",
    date: "Apr 15, 2025",
    dueDate: "May 15, 2025",
    status: "pending",
    facility: "Golden Years Care Home"
  },
];

const statusColors = {
  paid: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-blue-100 text-blue-800 border-blue-200",
  overdue: "bg-red-100 text-red-800 border-red-200",
};

export default function Invoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="Manage your invoices and payments"
      >
        <Button className="bg-care-blue-600 hover:bg-care-blue-700">
          <Plus className="mr-1 h-4 w-4" /> Create Invoice
        </Button>
      </PageHeader>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-care-neutral-400 h-4 w-4" />
              <Input 
                placeholder="Search invoices..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-care-neutral-500" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Facility</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell>{invoice.facility}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`font-medium border ${statusColors[invoice.status as keyof typeof statusColors]}`}
                      >
                        {invoice.status === "paid" && <Check className="h-3 w-3 mr-1" />}
                        {invoice.status === "pending" && <Calendar className="h-3 w-3 mr-1" />}
                        {invoice.status === "overdue" && <X className="h-3 w-3 mr-1" />}
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredInvoices.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No invoices found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
