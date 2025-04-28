
import { useState } from "react";
import { Search, Plus, Filter, MapPin, Phone, Mail, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/PageHeader";
import { FacilityCard } from "@/components/FacilityCard";
import { MapView } from "@/components/MapView";

// Mock facility data for development
const facilities = [
  {
    id: "f1",
    name: "Sunset Senior Living",
    type: "assisted-living",
    rating: 4.5,
    phone: "(555) 123-4567",
    email: "info@sunsetsenior.com",
    address: "123 Sunset Blvd, Los Angeles, CA",
    availableBeds: 5,
    priceRange: "$3,500 - $5,500",
  },
  {
    id: "f2",
    name: "Golden Years Care Home",
    type: "memory-care",
    rating: 4.8,
    phone: "(555) 234-5678",
    email: "info@goldenyears.com",
    address: "456 Golden Ave, Los Angeles, CA",
    availableBeds: 3,
    priceRange: "$4,500 - $6,500",
  },
  {
    id: "f3",
    name: "Serene Gardens",
    type: "independent-living",
    rating: 4.2,
    phone: "(555) 345-6789",
    email: "info@serenegardens.com",
    address: "789 Serene Dr, Los Angeles, CA",
    availableBeds: 8,
    priceRange: "$2,800 - $4,200",
  },
];

export default function FacilitySearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showMap, setShowMap] = useState(false);
  
  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facility.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || facility.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Facility Search" 
        description="Search and manage senior care facilities"
      >
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowMap(!showMap)}
          >
            <MapPin className="mr-1 h-4 w-4" />
            {showMap ? "List View" : "Map View"}
          </Button>
          <Button className="bg-care-blue-600 hover:bg-care-blue-700">
            <Plus className="mr-1 h-4 w-4" /> Add Facility
          </Button>
        </div>
      </PageHeader>
      
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-care-neutral-400 h-4 w-4" />
            <Input 
              placeholder="Search facilities by name or location..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4 text-care-neutral-500" />
                  <SelectValue placeholder="Filter by type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="assisted-living">Assisted Living</SelectItem>
                <SelectItem value="memory-care">Memory Care</SelectItem>
                <SelectItem value="independent-living">Independent Living</SelectItem>
                <SelectItem value="nursing-home">Nursing Home</SelectItem>
                <SelectItem value="continuing-care">Continuing Care</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {showMap ? (
        <MapView facilities={filteredFacilities} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
          
          {filteredFacilities.length === 0 && (
            <div className="col-span-full p-8 text-center text-care-neutral-500 bg-white rounded-lg">
              No facilities found matching your search criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
