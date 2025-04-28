
import React, { useState, useEffect } from "react";
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
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  PencilIcon, 
  Check, 
  X, 
  Plus, 
  Trash2, 
  FileSpreadsheet,
  Eye,
  Columns3,
  Search,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
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

// Define which columns should be visible by default for each category
const defaultVisibleColumns: Record<DataCategory, Record<string, boolean>> = {
  favorites: { id: true, facilityId: true, notes: true, createdAt: true },
  clients: { id: true, name: true, email: true, phone: true, status: true },
  facilities: { id: true, name: true, type: true, address: true, capacity: true },
  appointments: { id: true, title: true, type: true, startTime: true, status: true },
  referrals: { id: true, endUserId: true, facilityId: true, status: true, createdAt: true },
  messages: { id: true, subject: true, senderId: true, recipientId: true, isRead: true, createdAt: true },
  notes: { id: true, title: true, content: true, category: true, createdAt: true },
  invoices: { id: true, invoiceNumber: true, clientId: true, amount: true, status: true, dueDate: true },
  reports: { id: true, name: true, type: true, format: true, createdAt: true },
  users: { id: true, name: true, email: true, role: true, createdAt: true },
  placements: { id: true, referralId: true, moveInDate: true, careLevel: true, monthlyRate: true },
  webinars: { id: true, title: true, startTime: true, hostName: true, status: true },
  professionalFacilities: { id: true, professionalId: true, facilityId: true, relationship: true, isActive: true },
  auditLogs: { id: true, userId: true, action: true, resourceType: true, timestamp: true },
  dataRetentionPolicies: { id: true, resourceType: true, retentionPeriodDays: true, isActive: true },
  conversations: { id: true, type: true, createdAt: true, updatedAt: true },
  conversationParticipants: { id: true, conversationId: true, userId: true, role: true, isActive: true },
  subscriptionPlans: { id: true, name: true, price: true, interval: true, isActive: true },
  userSubscriptions: { id: true, userId: true, planId: true, status: true, currentPeriodEnd: true },
};

// Column presets
const columnPresets = {
  essential: "essential",
  standard: "standard",
  all: "all",
  custom: "custom",
};

// Record detail view component
const RecordDetailView = ({ 
  data, 
  onClose,
  onSave,
  onCancel,
  isEditing 
}: { 
  data: any, 
  onClose: () => void,
  onSave: (editedData: any) => void,
  onCancel: () => void,
  isEditing: boolean
}) => {
  const [editedData, setEditedData] = useState<any>({...data});

  const handleChange = (field: string, value: any) => {
    setEditedData({...editedData, [field]: value});
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(data).map(([field, value]) => (
          <div key={field} className="space-y-2">
            <div className="text-sm font-medium text-neutral-700 capitalize">
              {field.replace(/([A-Z])/g, ' $1').trim()}
            </div>
            {isEditing ? (
              typeof value === 'object' && value !== null ? (
                <div className="text-sm italic bg-neutral-100 p-2 rounded">
                  Complex object (cannot edit directly)
                </div>
              ) : typeof value === 'boolean' ? (
                <select 
                  value={editedData[field] ? "true" : "false"} 
                  onChange={(e) => handleChange(field, e.target.value === "true")}
                  className="w-full p-2 border rounded"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              ) : (
                <Input 
                  value={editedData[field] !== null ? String(editedData[field] || "") : ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                />
              )
            ) : (
              <div className="text-sm bg-neutral-50 p-2 rounded border">
                {typeof value === 'boolean' ? (
                  value ? "Yes" : "No"
                ) : typeof value === 'object' && value !== null ? (
                  <div className="text-sm italic">Complex object</div>
                ) : (
                  String(value || "")
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <SheetFooter>
        {isEditing ? (
          <div className="flex space-x-2 justify-end w-full">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={() => onSave(editedData)}>
              Save Changes
            </Button>
          </div>
        ) : (
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        )}
      </SheetFooter>
    </div>
  );
};

export const DataSpreadsheet = () => {
  const [activeCategory, setActiveCategory] = useState<DataCategory>("favorites");
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<any>({});
  const [visibleColumns, setVisibleColumns] = useState<Record<DataCategory, Record<string, boolean>>>(defaultVisibleColumns);
  const [selectedPreset, setSelectedPreset] = useState<Record<DataCategory, string>>(
    Object.keys(initialData).reduce((acc, key) => ({
      ...acc,
      [key]: columnPresets.standard
    }), {} as Record<DataCategory, string>)
  );
  const [detailItem, setDetailItem] = useState<any>(null);
  const [isDetailEditing, setIsDetailEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handle showing the detail view for an item
  const handleShowDetail = (item: any) => {
    setDetailItem(item);
    setIsDetailEditing(false);
  };

  // Handle editing in detail view
  const handleDetailEdit = () => {
    setIsDetailEditing(true);
  };

  // Handle saving from detail view
  const handleDetailSave = (editedData: any) => {
    setData({
      ...data,
      [activeCategory]: data[activeCategory].map((item: any) =>
        item.id === editedData.id ? editedData : item
      ),
    });
    setIsDetailEditing(false);
    toast.success(`${activeCategory.slice(0, -1)} updated successfully`);
  };

  // Close detail view
  const handleCloseDetail = () => {
    setDetailItem(null);
    setIsDetailEditing(false);
  };

  // Pagination functions
  const totalPages = Math.ceil(data[activeCategory].length / itemsPerPage);
  const paginatedData = data[activeCategory].slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Apply column preset
  const applyPreset = (category: DataCategory, preset: string) => {
    setSelectedPreset({...selectedPreset, [category]: preset});
    
    const allKeys = data[category].length > 0 ? 
      Object.keys(data[category][0]) : [];
    
    let newVisibleColumns: Record<string, boolean> = {};
    
    switch(preset) {
      case columnPresets.essential:
        // Only show ID, name/title, status fields
        newVisibleColumns = allKeys.reduce((acc, key) => ({
          ...acc,
          [key]: key === 'id' || 
                 key === 'name' || 
                 key === 'title' || 
                 key === 'status' ||
                 key.includes('Name') ||
                 key === 'createdAt'
        }), {});
        break;
        
      case columnPresets.standard:
        // Show reasonable default set
        newVisibleColumns = {...defaultVisibleColumns[category]};
        break;
        
      case columnPresets.all:
        // Show all columns
        newVisibleColumns = allKeys.reduce((acc, key) => ({
          ...acc,
          [key]: true
        }), {});
        break;
        
      // Custom preset handled separately by checkboxes
      default:
        return;
    }
    
    setVisibleColumns({
      ...visibleColumns,
      [category]: newVisibleColumns
    });
  };

  // Toggle column visibility
  const toggleColumnVisibility = (category: DataCategory, column: string) => {
    const newVisibleColumns = {
      ...visibleColumns,
      [category]: {
        ...visibleColumns[category],
        [column]: !visibleColumns[category][column]
      }
    };
    
    setVisibleColumns(newVisibleColumns);
    setSelectedPreset({
      ...selectedPreset,
      [category]: columnPresets.custom
    });
  };

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

  // Initialize visible columns if not already set
  useEffect(() => {
    if (data[activeCategory].length > 0) {
      // If we have no visible columns defined for this category
      if (!visibleColumns[activeCategory]) {
        const allKeys = Object.keys(data[activeCategory][0]);
        const newVisibleColumns = {
          ...visibleColumns,
          [activeCategory]: allKeys.reduce((acc, key) => ({
            ...acc,
            [key]: defaultVisibleColumns[activeCategory]?.[key] || false
          }), {})
        };
        setVisibleColumns(newVisibleColumns);
      }
    }
  }, [activeCategory, data]);

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

  const getVisibleColumns = () => {
    if (data[activeCategory].length === 0) return [];
    
    const allColumns = Object.keys(data[activeCategory][0]);
    return allColumns.filter(col => visibleColumns[activeCategory]?.[col]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileSpreadsheet className="h-5 w-5 text-care-blue-600" />
          <h2 className="text-xl font-semibold">Complete Data Management</h2>
        </div>
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2 items-center">
                <Columns3 className="h-4 w-4" />
                <span>View Options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2">
                <div className="mb-2 font-medium">Column Presets</div>
                <div className="grid grid-cols-2 gap-1">
                  <Button 
                    variant={selectedPreset[activeCategory] === columnPresets.essential ? "default" : "outline"} 
                    size="sm"
                    className="w-full"
                    onClick={() => applyPreset(activeCategory, columnPresets.essential)}
                  >
                    Essential
                  </Button>
                  <Button 
                    variant={selectedPreset[activeCategory] === columnPresets.standard ? "default" : "outline"} 
                    size="sm"
                    className="w-full"
                    onClick={() => applyPreset(activeCategory, columnPresets.standard)}
                  >
                    Standard
                  </Button>
                  <Button 
                    variant={selectedPreset[activeCategory] === columnPresets.all ? "default" : "outline"} 
                    size="sm"
                    className="w-full"
                    onClick={() => applyPreset(activeCategory, columnPresets.all)}
                  >
                    All Fields
                  </Button>
                  <Button 
                    variant={selectedPreset[activeCategory] === columnPresets.custom ? "default" : "outline"} 
                    size="sm"
                    className="w-full"
                    onClick={() => setSelectedPreset({...selectedPreset, [activeCategory]: columnPresets.custom})}
                  >
                    Custom
                  </Button>
                </div>
              </div>
              <div className="p-2">
                <div className="mb-2 font-medium">Select Columns</div>
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {data[activeCategory].length > 0 && Object.keys(data[activeCategory][0]).map(column => (
                    <div key={column} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`column-${column}`}
                        checked={visibleColumns[activeCategory]?.[column] || false}
                        onCheckedChange={() => toggleColumnVisibility(activeCategory, column)}
                      />
                      <label 
                        htmlFor={`column-${column}`}
                        className="text-sm capitalize cursor-pointer"
                      >
                        {column.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleAdd} className="bg-care-blue-600 hover:bg-care-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </div>
      </div>

      <Tabs value={activeCategory} onValueChange={(value) => {
        setActiveCategory(value as DataCategory);
        setCurrentPage(1);
      }}>
        <TabsList className="grid grid-cols-4 md:grid-cols-8 lg:flex overflow-x-auto max-w-full whitespace-nowrap">
          {Object.keys(initialData).map((category) => (
            <TabsTrigger key={category} value={category} className="whitespace-nowrap">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.keys(initialData).map((category) => (
          <TabsContent key={category} value={category}>
            <div className="border rounded-md">
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>
                    <div className="flex justify-between items-center w-full px-4">
                      <div>{data[category as DataCategory].length} {category} records</div>
                      {totalPages > 1 && (
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                          >
                            <ArrowLeft className="h-4 w-4" />
                          </Button>
                          <span>
                            Page {currentPage} of {totalPages}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      {getVisibleColumns().map((header) => (
                        <TableHead key={header} className="whitespace-nowrap">
                          {header.charAt(0).toUpperCase() + header.slice(1).replace(/([A-Z])/g, ' $1')}
                        </TableHead>
                      ))}
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((item: any) => (
                      <TableRow key={item.id} className="group">
                        {getVisibleColumns().map((field) => (
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
                              <Button variant="ghost" size="sm" onClick={() => handleShowDetail(item)}>
                                <Eye className="h-4 w-4 text-care-blue-500" />
                              </Button>
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
                    {paginatedData.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={getVisibleColumns().length + 1} className="text-center py-8">
                          No {category} records found. Click the "Add Item" button to create one.
                        </TableCell>
                      </TableRow>
                    )}
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

      {/* Detail view sheet */}
      <Sheet open={!!detailItem} onOpenChange={(open) => !open && handleCloseDetail()}>
        <SheetContent className="w-[90%] sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex justify-between items-center">
              <div>Record Details</div>
              {!isDetailEditing && (
                <Button variant="outline" size="sm" onClick={handleDetailEdit}>
                  <PencilIcon className="h-4 w-4 mr-2" /> Edit
                </Button>
              )}
            </SheetTitle>
            <SheetDescription>
              View complete record information
            </SheetDescription>
          </SheetHeader>
          
          {detailItem && (
            <RecordDetailView
              data={detailItem}
              onClose={handleCloseDetail}
              onSave={handleDetailSave}
              onCancel={() => setIsDetailEditing(false)}
              isEditing={isDetailEditing}
            />
          )}
        </SheetContent>
      </Sheet>

      <div className="mt-4 p-4 border rounded-md bg-care-blue-50">
        <p className="text-sm text-care-neutral-700">
          <strong>Note:</strong> All application data can be managed through these spreadsheets.
          Changes made here will be reflected throughout the application.
        </p>
      </div>
    </div>
  );
};
