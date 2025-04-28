
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
import { PencilIcon, Check, X, Plus, Trash2 } from "lucide-react";
import { Favorite } from "@/schemas";
import { toast } from "sonner";

// Sample data - in a real app, this would come from your database
const initialFavorites: Partial<Favorite>[] = [
  {
    id: "1",
    facilityId: "f1",
    notes: "Great staff, clean environment",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    facilityId: "f2",
    notes: "Excellent memory care program",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    facilityId: "f3",
    notes: "Good location, near family",
    createdAt: new Date().toISOString(),
  },
];

export const FavoritesTable = () => {
  const [favorites, setFavorites] = useState<Partial<Favorite>[]>(initialFavorites);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<Partial<Favorite>>({});

  // In a real app, you would fetch this data from your backend
  const facilityNames: Record<string, string> = {
    f1: "Sunrise Senior Living",
    f2: "Golden Years Care Home", 
    f3: "Oakwood Retirement Village",
    f4: "Meadow View Assisted Living",
    f5: "Serene Gardens",
  };

  const handleEdit = (favorite: Partial<Favorite>) => {
    setEditingId(favorite.id || null);
    setEditedValues(favorite);
  };

  const handleSave = () => {
    if (editingId) {
      setFavorites(favorites.map((fav) => 
        fav.id === editingId ? { ...fav, ...editedValues } : fav
      ));
      setEditingId(null);
      toast.success("Favorite updated successfully");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleChange = (field: string, value: string) => {
    setEditedValues({ ...editedValues, [field]: value });
  };

  const handleDelete = (id: string) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
    toast.success("Favorite removed");
  };

  const handleAdd = () => {
    const newFavorite: Partial<Favorite> = {
      id: `new-${Date.now()}`,
      facilityId: "f4", // Default value
      notes: "",
      createdAt: new Date().toISOString(),
    };
    setFavorites([...favorites, newFavorite]);
    setEditingId(newFavorite.id || null);
    setEditedValues(newFavorite);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Favorite Facilities</h2>
        <Button 
          onClick={handleAdd}
          className="bg-care-blue-600 hover:bg-care-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Favorite
        </Button>
      </div>
      
      <Table>
        <TableCaption>A list of your favorite facilities</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Facility</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Added On</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {favorites.map((favorite) => (
            <TableRow key={favorite.id}>
              <TableCell>
                {editingId === favorite.id ? (
                  <select
                    className="w-full p-2 border rounded"
                    value={editedValues.facilityId}
                    onChange={(e) => handleChange("facilityId", e.target.value)}
                  >
                    {Object.entries(facilityNames).map(([id, name]) => (
                      <option key={id} value={id}>{name}</option>
                    ))}
                  </select>
                ) : (
                  facilityNames[favorite.facilityId || ""] || "Unknown Facility"
                )}
              </TableCell>
              <TableCell>
                {editingId === favorite.id ? (
                  <Input
                    value={editedValues.notes || ""}
                    onChange={(e) => handleChange("notes", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  favorite.notes
                )}
              </TableCell>
              <TableCell>
                {editingId === favorite.id ? (
                  <Input
                    type="date"
                    value={editedValues.createdAt ? new Date(editedValues.createdAt).toISOString().split("T")[0] : ""}
                    onChange={(e) => handleChange("createdAt", new Date(e.target.value).toISOString())}
                    className="w-full"
                  />
                ) : (
                  new Date(favorite.createdAt!).toLocaleDateString()
                )}
              </TableCell>
              <TableCell className="text-right">
                {editingId === favorite.id ? (
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleSave}
                    >
                      <Check className="h-4 w-4 text-green-500" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleCancel}
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEdit(favorite)}
                    >
                      <PencilIcon className="h-4 w-4 text-care-blue-500" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(favorite.id!)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="mt-4 p-4 border rounded-md bg-care-blue-50">
        <p className="text-sm text-care-neutral-700">
          <strong>Note:</strong> Changes made to this table will be reflected throughout the application.
          Use this spreadsheet to quickly manage your favorite facilities.
        </p>
      </div>
    </div>
  );
};
