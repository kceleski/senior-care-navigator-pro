
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { ArrowLeft, Phone, Mail, MapPin, Calendar, FileText } from "lucide-react";
import { ClientStatusBadge } from "@/components/ClientStatusBadge";
import { toast } from "sonner";

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
    dateOfBirth: "1945-06-12",
    careNeeds: ["Memory Care", "Medication Management", "Mobility Assistance"],
    notes: "Prefers facilities close to her daughter in Northside. Has a small dog named Max that needs accommodation.",
    budget: "$3,500 - $4,500 monthly",
    preferredMoveDate: "2025-06-01",
  },
  {
    id: "c2",
    name: "Robert Williams",
    status: "tour",
    phone: "(555) 234-5678",
    email: "robert.w@example.com",
    address: "456 Oak Ave, Somewhere, CA",
    lastContact: "2025-04-24",
    dateOfBirth: "1940-03-22",
    careNeeds: ["Independent Living", "Light Housekeeping"],
    notes: "Looking for a facility with good social activities. Enjoys playing chess and gardening.",
    budget: "$2,800 - $3,800 monthly",
    preferredMoveDate: "2025-07-15",
  },
  {
    id: "c3",
    name: "Margaret Brown",
    status: "paperwork",
    phone: "(555) 345-6789",
    email: "margaret.b@example.com",
    address: "789 Elm St, Nowhere, CA",
    lastContact: "2025-04-23",
    dateOfBirth: "1938-11-05",
    careNeeds: ["Assisted Living", "Medication Management", "Dining Assistance"],
    notes: "Has a history of falls. Daughter Janet is primary contact for all decisions.",
    budget: "$4,000 - $5,000 monthly",
    preferredMoveDate: "2025-05-15",
  },
  {
    id: "c4",
    name: "James Davis",
    status: "follow-up-1w",
    phone: "(555) 456-7890",
    email: "james.d@example.com",
    address: "101 Pine Rd, Anyplace, CA",
    lastContact: "2025-04-22",
    dateOfBirth: "1942-08-17",
    careNeeds: ["Memory Care", "Full Assistance"],
    notes: "Veteran, served in Vietnam. Qualifies for VA benefits which may help with payment.",
    budget: "$5,000 - $6,000 monthly",
    preferredMoveDate: "2025-06-30",
  },
];

export default function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundClient = clients.find(c => c.id === id);
    if (foundClient) {
      setClient(foundClient);
    } else {
      toast.error("Client not found");
      navigate("/clients");
    }
  }, [id, navigate]);

  if (!client) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-lg font-medium mb-2">Loading client information...</h2>
          <p className="text-muted-foreground">Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title={client.name}
        description="Client Information"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/clients")}>
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Clients
          </Button>
          <Button className="bg-care-blue-600 hover:bg-care-blue-700">
            Edit Client
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold">{client.name}</h2>
                <div className="text-gray-500 flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {client.address}
                </div>
              </div>
              <ClientStatusBadge status={client.status} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span>Date of Birth: {client.dateOfBirth}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Care Requirements</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {client.careNeeds.map((need, index) => (
                    <span 
                      key={index}
                      className="bg-care-blue-50 text-care-blue-700 px-2 py-1 rounded-full text-sm"
                    >
                      {need}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="text-sm">
                    <strong>Budget:</strong> {client.budget}
                  </div>
                  <div className="text-sm mt-1">
                    <strong>Preferred Move Date:</strong> {client.preferredMoveDate}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Notes</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">{client.notes}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-care-blue-600" />
              Upcoming Activities
            </h3>
            <div className="space-y-4">
              <div className="border-l-2 border-care-blue-500 pl-3">
                <div className="text-sm text-gray-500">Tomorrow, 10:00 AM</div>
                <div className="font-medium">Facility Tour - Sunset Senior Living</div>
              </div>
              <div className="border-l-2 border-care-blue-500 pl-3">
                <div className="text-sm text-gray-500">May 5, 2:00 PM</div>
                <div className="font-medium">Follow-up Call</div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Schedule Activity
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-care-blue-600" />
              Related Documents
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <div className="text-sm font-medium">Care Assessment.pdf</div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <div className="text-sm font-medium">Medical History.pdf</div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <div className="text-sm font-medium">Facility Preferences.docx</div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Upload Document
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
