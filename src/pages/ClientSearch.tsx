
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Search, 
  Plus, 
  Filter, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { PageHeader } from "@/components/PageHeader";
import { ClientStatusBadge } from "@/components/ClientStatusBadge";

// Mock client data for development
const clients = [
  {
    id: "c1",
    name: "Dorothy Johnson",
    status: "assessment",
    phone: "(555) 123-4567",
    email: "dorothy.j@example.com",
    address: "123 Main St, Anytown, CA",
    lastContact: "2025-04-25",
  },
  {
    id: "c2",
    name: "Robert Williams",
    status: "tour",
    phone: "(555) 234-5678",
    email: "robert.w@example.com",
    address: "456 Oak Ave, Somewhere, CA",
    lastContact: "2025-04-24",
  },
  {
    id: "c3",
    name: "Margaret Brown",
    status: "paperwork",
    phone: "(555) 345-6789",
    email: "margaret.b@example.com",
    address: "789 Elm St, Nowhere, CA",
    lastContact: "2025-04-23",
  },
  {
    id: "c4",
    name: "James Davis",
    status: "follow-up-1w",
    phone: "(555) 456-7890",
    email: "james.d@example.com",
    address: "101 Pine Rd, Anyplace, CA",
    lastContact: "2025-04-22",
  },
];

export default function ClientSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();
  
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewClient = (clientId: string) => {
    navigate(`/clients/${clientId}`);
  };

  return (
    <div>
      <PageHeader 
        title="Client Search" 
        description="Search, filter and manage your clients"
      >
        <Button className="bg-care-blue-600 hover:bg-care-blue-700">
          <Plus className="mr-1 h-4 w-4" /> New Client
        </Button>
      </PageHeader>
      
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-care-neutral-400 h-4 w-4" />
            <Input 
              placeholder="Search clients by name or email..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4 text-care-neutral-500" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="assessment">Assessment</SelectItem>
                <SelectItem value="search">Search</SelectItem>
                <SelectItem value="tour">Tour</SelectItem>
                <SelectItem value="paperwork">Paperwork</SelectItem>
                <SelectItem value="move-in">Move In</SelectItem>
                <SelectItem value="invoice">Invoice</SelectItem>
                <SelectItem value="follow-up-1w">1 Week Follow-up</SelectItem>
                <SelectItem value="follow-up-1m">1 Month Follow-up</SelectItem>
                <SelectItem value="follow-up-6m">6 Month Follow-up</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-12 p-4 border-b font-medium text-care-neutral-500 text-sm">
          <div className="col-span-4">Client Name</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Phone</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-1"></div>
        </div>
        
        {filteredClients.map((client) => (
          <div 
            key={client.id}
            className="grid grid-cols-12 p-4 border-b hover:bg-care-blue-50 transition-colors items-center cursor-pointer"
            onClick={() => handleViewClient(client.id)}
          >
            <div className="col-span-4">
              <div className="font-medium text-care-neutral-900">{client.name}</div>
              <div className="text-xs flex items-center text-care-neutral-500">
                <MapPin className="h-3 w-3 mr-1" />
                {client.address}
              </div>
            </div>
            
            <div className="col-span-2">
              <ClientStatusBadge status={client.status as any} />
            </div>
            
            <div className="col-span-2 flex items-center text-care-neutral-700">
              <Phone className="h-4 w-4 mr-1 text-care-neutral-400" />
              <span>{client.phone}</span>
            </div>
            
            <div className="col-span-3 flex items-center text-care-neutral-700">
              <Mail className="h-4 w-4 mr-1 text-care-neutral-400" />
              <span>{client.email}</span>
            </div>
            
            <div className="col-span-1 text-right">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-care-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewClient(client.id);
                }}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        
        {filteredClients.length === 0 && (
          <div className="p-8 text-center text-care-neutral-500">
            No clients found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}
