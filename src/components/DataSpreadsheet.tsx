
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
import { PencilIcon, Check, X, Plus, Trash2 } from "lucide-react";
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
      status: "active",
    },
  ],
  facilities: [
    {
      id: "f1",
      name: "Sunrise Senior Living",
      address: "123 Care Lane",
      type: "assisted_living",
      capacity: 100,
    },
  ],
  appointments: [
    {
      id: "a1",
      clientId: "c1",
      facilityId: "f1",
      date: new Date().toISOString(),
      type: "tour",
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
  ]
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
      toast.success("Item updated successfully");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleChange = (field: string, value: string) => {
    setEditedValues({ ...editedValues, [field]: value });
  };

  const handleDelete = (id: string) => {
    setData({
      ...data,
      [activeCategory]: data[activeCategory].filter((item: any) => item.id !== id),
    });
    toast.success("Item removed");
  };

  const handleAdd = () => {
    const newItem = {
      id: `new-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setData({
      ...data,
      [activeCategory]: [...data[activeCategory], newItem],
    });
    setEditingId(newItem.id);
    setEditedValues(newItem);
  };

  const renderTableHeaders = () => {
    if (data[activeCategory].length === 0) return null;
    const headers = Object.keys(data[activeCategory][0]);
    return (
      <TableRow>
        {headers.map((header) => (
          <TableHead key={header}>{header}</TableHead>
        ))}
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    );
  };

  const renderTableCell = (item: any, field: string) => {
    if (editingId === item.id) {
      return (
        <Input
          value={editedValues[field] || ""}
          onChange={(e) => handleChange(field, e.target.value)}
          className="w-full"
        />
      );
    }
    return item[field];
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Data Management Spreadsheet</h2>
        <Button onClick={handleAdd} className="bg-care-blue-600 hover:bg-care-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </div>

      <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as DataCategory)}>
        <TabsList>
          {Object.keys(initialData).map((category) => (
            <TabsTrigger key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.keys(initialData).map((category) => (
          <TabsContent key={category} value={category}>
            <Table>
              <TableCaption>List of {category}</TableCaption>
              <TableHeader>
                {renderTableHeaders()}
              </TableHeader>
              <TableBody>
                {data[category as DataCategory].map((item: any) => (
                  <TableRow key={item.id}>
                    {Object.keys(item).map((field) => (
                      <TableCell key={field}>
                        {renderTableCell(item, field)}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
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
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-4 p-4 border rounded-md bg-care-blue-50">
        <p className="text-sm text-care-neutral-700">
          <strong>Note:</strong> Changes made to this spreadsheet will be reflected throughout the application.
          Use these spreadsheets to quickly manage your data.
        </p>
      </div>
    </div>
  );
};
