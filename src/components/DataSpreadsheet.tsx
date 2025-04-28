
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PencilIcon, Check, X, Plus, Trash2, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

// Sample data based on our schemas
const initialData = {
  favorites: [
    {
      id: "1",
      facilityId: "f1",
      notes: "Great staff, clean environment",
      createdAt: new Date().toISOString(),
    },
  ],
  clients: [
    {
      id: "c1",
      name: "John Doe",
      email: "john@example.com",
      phone: "555-0123",
      status: "assessment",
    },
  ],
  facilities: [
    {
      id: "f1",
      name: "Sunrise Senior Living",
      address: "123 Care Lane",
      type: "assisted-living",
      capacity: 100,
    },
  ],
  appointments: [
    {
      id: "a1",
      title: "Initial Assessment",
      type: "assessment",
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 3600000).toISOString(),
      status: "scheduled",
    },
  ],
  referrals: [
    {
      id: "r1",
      endUserId: "c1",
      facilityId: "f1",
      status: "pending",
      createdAt: new Date().toISOString(),
    },
  ],
  messages: [
    {
      id: "m1",
      senderId: "u1",
      recipientId: "u2",
      subject: "Follow-up",
      body: "Let's discuss the client's progress",
      isRead: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  notes: [
    {
      id: "n1",
      clientId: "c1",
      title: "Initial Assessment Notes",
      content: "Client requires assistance with daily activities",
      category: "assessment",
      createdBy: "u1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  invoices: [
    {
      id: "i1",
      invoiceNumber: "INV-2025-001",
      clientId: "c1",
      amount: 250.00,
      date: new Date().toISOString(),
      dueDate: new Date(Date.now() + 86400000 * 30).toISOString(),
      status: "sent",
      total: 250.00,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  reports: [
    {
      id: "r1",
      name: "Monthly Placement Report",
      type: "monthly",
      dateRange: {
        start: new Date(Date.now() - 86400000 * 30).toISOString(),
        end: new Date().toISOString(),
      },
      format: "pdf",
      createdBy: "u1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  users: [
    {
      id: "u1",
      email: "sarah@carenav.com",
      name: "Sarah Peterson",
      role: "professional",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  placements: [
    {
      id: "p1",
      referralId: "r1",
      moveInDate: new Date(Date.now() + 86400000 * 14).toISOString(),
      careLevel: "assisted-living",
      monthlyRate: 4500,
      initialFee: 2000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  webinars: [
    {
      id: "w1",
      facilityId: "f1",
      title: "Understanding Memory Care",
      description: "Learn about memory care options and best practices",
      startTime: new Date(Date.now() + 86400000 * 7).toISOString(),
      endTime: new Date(Date.now() + 86400000 * 7 + 3600000 * 2).toISOString(),
      hostName: "Dr. James Wilson",
      status: "scheduled",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  professionalFacilities: [
    {
      id: "pf1",
      professionalId: "u1",
      facilityId: "f1",
      relationship: "referral_partner",
      isActive: true,
      startDate: new Date(Date.now() - 86400000 * 90).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  auditLogs: [
    {
      id: "a1",
      userId: "u1",
      action: "create",
      resourceType: "client",
      resourceId: "c1",
      description: "Created new client record",
      timestamp: new Date().toISOString(),
    }
  ],
  dataRetentionPolicies: [
    {
      id: "dr1",
      resourceType: "client",
      retentionPeriodDays: 2555, // ~7 years
      isActive: true,
      description: "HIPAA compliant client data retention",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  conversations: [
    {
      id: "conv1",
      type: "direct",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  conversationParticipants: [
    {
      id: "cp1",
      conversationId: "conv1",
      userId: "u1",
      role: "member",
      joinedAt: new Date().toISOString(),
      isActive: true,
    }
  ],
  subscriptionPlans: [
    {
      id: "sp1",
      name: "Professional",
      description: "Complete access to all features",
      price: 49.00,
      interval: "monthly",
      features: ["Unlimited clients", "Access to all facilities", "Advanced reporting"],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  userSubscriptions: [
    {
      id: "us1",
      userId: "u1",
      planId: "sp1",
      status: "active",
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 86400000 * 30).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
};

type DataCategory = keyof typeof initialData;

export const DataSpreadsheet = () => {
  const [activeCategory, setActiveCategory] = useState<DataCategory>("favorites");
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<any>({});

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setEditedValues(item);
  };

  const handleSave = () => {
    if (editingId) {
      setData({
        ...data,
        [activeCategory]: data[activeCategory].map((item: any) =>
          item.id === editingId ? { ...item, ...editedValues } : item
        ),
      });
      setEditingId(null);
      toast.success(`${activeCategory.slice(0, -1)} updated successfully`);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleChange = (field: string, value: string | number | boolean) => {
    setEditedValues({ ...editedValues, [field]: value });
  };

  const handleDelete = (id: string) => {
    setData({
      ...data,
      [activeCategory]: data[activeCategory].filter((item: any) => item.id !== id),
    });
    toast.success(`${activeCategory.slice(0, -1)} removed`);
  };

  const handleAdd = () => {
    const newId = `new-${Date.now()}`;
    const newItem: any = {
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Add category-specific default fields
    switch (activeCategory) {
      case 'clients':
        newItem.name = 'New Client';
        newItem.status = 'assessment';
        break;
      case 'facilities':
        newItem.name = 'New Facility';
        newItem.type = 'assisted-living';
        break;
      case 'appointments':
        newItem.title = 'New Appointment';
        newItem.status = 'scheduled';
        newItem.startTime = new Date().toISOString();
        newItem.endTime = new Date(Date.now() + 3600000).toISOString();
        break;
      case 'invoices':
        newItem.invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`;
        newItem.status = 'draft';
        newItem.total = 0;
        break;
    }
    
    setData({
      ...data,
      [activeCategory]: [...data[activeCategory], newItem],
    });
    setEditingId(newId);
    setEditedValues(newItem);
    toast.success(`New ${activeCategory.slice(0, -1)} added`);
  };

  const renderTableHeaders = () => {
    if (data[activeCategory].length === 0) return null;
    const headers = Object.keys(data[activeCategory][0]);
    return (
      <TableRow>
        {headers.map((header) => (
          <TableHead key={header} className="whitespace-nowrap">
            {header.charAt(0).toUpperCase() + header.slice(1).replace(/([A-Z])/g, ' $1')}
          </TableHead>
        ))}
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    );
  };

  const renderTableCell = (item: any, field: string) => {
    if (editingId === item.id) {
      if (typeof item[field] === 'boolean') {
        return (
          <select 
            value={editedValues[field] ? "true" : "false"} 
            onChange={(e) => handleChange(field, e.target.value === "true")}
            className="w-full p-2 border rounded"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        );
      } else if (typeof item[field] === 'object' && item[field] !== null) {
        return <div className="text-sm italic">Complex object</div>;
      } else {
        return (
          <Input
            value={editedValues[field] || ""}
            onChange={(e) => handleChange(field, e.target.value)}
            className="w-full"
          />
        );
      }
    }
    
    // Display logic for non-editing state
    if (typeof item[field] === 'boolean') {
      return item[field] ? "Yes" : "No";
    } else if (typeof item[field] === 'object' && item[field] !== null) {
      return <div className="text-sm italic">Complex object</div>;
    } else {
      return String(item[field] || "");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileSpreadsheet className="h-5 w-5 text-care-blue-600" />
          <h2 className="text-xl font-semibold">Complete Data Management</h2>
        </div>
        <Button onClick={handleAdd} className="bg-care-blue-600 hover:bg-care-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </div>

      <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as DataCategory)}>
        <TabsList className="grid grid-cols-4 md:grid-cols-8 lg:flex">
          {Object.keys(initialData).map((category) => (
            <TabsTrigger key={category} value={category} className="whitespace-nowrap">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.keys(initialData).map((category) => (
          <TabsContent key={category} value={category}>
            <div className="border rounded-md">
              <div className="overflow-auto max-h-[60vh]">
                <Table>
                  <TableCaption>
                    {data[category as DataCategory].length} {category} records
                  </TableCaption>
                  <TableHeader>
                    {renderTableHeaders()}
                  </TableHeader>
                  <TableBody>
                    {data[category as DataCategory].map((item: any) => (
                      <TableRow key={item.id}>
                        {Object.keys(item).map((field) => (
                          <TableCell key={field} className="align-top">
                            {renderTableCell(item, field)}
                          </TableCell>
                        ))}
                        <TableCell className="text-right whitespace-nowrap align-top">
                          {editingId === item.id ? (
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={handleSave}>
                                <Check className="h-4 w-4 text-green-500" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={handleCancel}>
                                <X className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                                <PencilIcon className="h-4 w-4 text-care-blue-500" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="mt-4 p-4 border rounded-md bg-care-blue-50">
              <p className="text-sm text-care-neutral-700">
                <strong>Data Category:</strong> {category} | 
                <strong> Total Records:</strong> {data[category as DataCategory].length} |
                <strong> Last Updated:</strong> {new Date().toLocaleString()}
              </p>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-4 p-4 border rounded-md bg-care-blue-50">
        <p className="text-sm text-care-neutral-700">
          <strong>Note:</strong> All application data can be managed through these spreadsheets.
          Changes made here will be reflected throughout the application.
        </p>
      </div>
    </div>
  );
};
