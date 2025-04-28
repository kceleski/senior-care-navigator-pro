
import { useState, useEffect } from "react";
import { Search, Plus, Filter, MapPin, Phone, Mail, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/PageHeader";
import { FacilityCard } from "@/components/FacilityCard";
import { MapView } from "@/components/MapView";
import { toast } from "sonner";

// Enhanced facility data for development
const facilities = [
  {
    id: "f1",
    name: "Sunset Senior Living",
    type: "assisted-living",
    rating: 4.5,
    phone: "(555) 123-4567",
    email: "info@sunsetsenior.com",
    address: "123 Sunset Blvd, Los Angeles, CA 90028",
    availableBeds: 5,
    priceRange: "$3,500 - $5,500",
    latitude: 34.0983,
    longitude: -118.3262,
    amenities: ["Memory Care", "Physical Therapy", "24/7 Staff", "Private Rooms"],
    images: ["https://placehold.co/600x400?text=Sunset+Senior"],
  },
  {
    id: "f2",
    name: "Golden Years Care Home",
    type: "memory-care",
    rating: 4.8,
    phone: "(555) 234-5678",
    email: "info@goldenyears.com",
    address: "456 Golden Ave, Santa Monica, CA 90401",
    availableBeds: 3,
    priceRange: "$4,500 - $6,500",
    latitude: 34.0195,
    longitude: -118.4912,
    amenities: ["Memory Care", "Garden", "Activities", "Transportation"],
    images: ["https://placehold.co/600x400?text=Golden+Years"],
  },
  {
    id: "f3",
    name: "Serene Gardens",
    type: "independent-living",
    rating: 4.2,
    phone: "(555) 345-6789",
    email: "info@serenegardens.com",
    address: "789 Serene Dr, Pasadena, CA 91103",
    availableBeds: 8,
    priceRange: "$2,800 - $4,200",
    latitude: 34.1478,
    longitude: -118.1445,
    amenities: ["Swimming Pool", "Fitness Center", "Library", "Restaurant"],
    images: ["https://placehold.co/600x400?text=Serene+Gardens"],
  },
  {
    id: "f4",
    name: "Ocean View Retirement",
    type: "continuing-care",
    rating: 4.6,
    phone: "(555) 456-7890",
    email: "info@oceanviewretirement.com",
    address: "101 Ocean Dr, Malibu, CA 90265",
    availableBeds: 4,
    priceRange: "$3,800 - $5,800",
    latitude: 34.0259,
    longitude: -118.7798,
    amenities: ["Ocean View", "Fine Dining", "Memory Care", "Rehabilitation"],
    images: ["https://placehold.co/600x400?text=Ocean+View"],
  },
  {
    id: "f5",
    name: "Hillside Haven",
    type: "nursing-home",
    rating: 4.0,
    phone: "(555) 567-8901",
    email: "info@hillsidehaven.com",
    address: "555 Hill Rd, Glendale, CA 91206",
    availableBeds: 12,
    priceRange: "$4,200 - $6,000",
    latitude: 34.1426,
    longitude: -118.2551,
    amenities: ["Medical Staff", "Physical Therapy", "Wound Care", "Palliative Care"],
    images: ["https://placehold.co/600x400?text=Hillside+Haven"],
  },
];

export default function FacilitySearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showMap, setShowMap] = useState(false);
  const [priceSort, setPriceSort] = useState<"none" | "asc" | "desc">("none");
  const [ratingSort, setRatingSort] = useState<"none" | "asc" | "desc">("none");
  const [availabilityFilter, setAvailabilityFilter] = useState(false);
  
  const handleAddFacility = () => {
    toast.info("Feature coming soon: Add new facility");
  };
  
  const filteredFacilities = facilities
    .filter(facility => {
      const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           facility.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === "all" || facility.type === typeFilter;
      
      const matchesAvailability = !availabilityFilter || facility.availableBeds > 0;
      
      return matchesSearch && matchesType && matchesAvailability;
    })
    .sort((a, b) => {
      // Sort by price
      if (priceSort !== "none") {
        const priceA = parseFloat(a.priceRange.split(" - ")[0].replace("$", "").replace(",", ""));
        const priceB = parseFloat(b.priceRange.split(" - ")[0].replace("$", "").replace(",", ""));
        return priceSort === "asc" ? priceA - priceB : priceB - priceA;
      }
      
      // Sort by rating
      if (ratingSort !== "none") {
        return ratingSort === "asc" ? a.rating - b.rating : b.rating - a.rating;
      }
      
      return 0;
    });

  const toggleSort = (sortType: "price" | "rating") => {
    if (sortType === "price") {
      if (priceSort === "none") setPriceSort("asc");
      else if (priceSort === "asc") setPriceSort("desc");
      else setPriceSort("none");
      
      // Reset other sort
      if (priceSort !== "none") setRatingSort("none");
    } else {
      if (ratingSort === "none") setRatingSort("asc");
      else if (ratingSort === "asc") setRatingSort("desc");
      else setRatingSort("none");
      
      // Reset other sort
      if (ratingSort !== "none") setPriceSort("none");
    }
  };

  const getSortIndicator = (sortState: "none" | "asc" | "desc") => {
    if (sortState === "none") return "";
    return sortState === "asc" ? "↑" : "↓";
  };

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
          <Button 
            className="bg-care-blue-600 hover:bg-care-blue-700"
            onClick={handleAddFacility}
          >
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
          
          <div className="flex flex-wrap gap-2">
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
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => toggleSort("price")}
                className={priceSort !== "none" ? "bg-blue-50" : ""}
              >
                Price {getSortIndicator(priceSort)}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => toggleSort("rating")}
                className={ratingSort !== "none" ? "bg-blue-50" : ""}
              >
                Rating {getSortIndicator(ratingSort)}
              </Button>
              
              <Button
                variant={availabilityFilter ? "default" : "outline"}
                size="sm"
                onClick={() => setAvailabilityFilter(!availabilityFilter)}
              >
                Available Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-2 text-sm">
        <span className="font-medium">{filteredFacilities.length}</span> facilities found
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
