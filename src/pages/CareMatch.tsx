
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { FacilityCard } from "@/components/FacilityCard";
import { Button } from "@/components/ui/button";
import { MapView } from "@/components/MapView";

interface CareNeedsData {
  clientName: string;
  clientAge: string;
  clientGender: string;
  careLevel: string;
  budget: string;
  preferredLocation: string;
  // Add other relevant fields as needed
}

// Mock facility data for our matches
const matchedFacilities = [
  {
    id: "f1",
    name: "Sunrise Senior Living",
    type: "assisted-living",
    address: "123 Care Lane, Phoenix, AZ 85001",
    phone: "(602) 555-1234",
    email: "info@sunrisesenior.com",
    website: "https://www.sunrisesenior.com",
    rating: 4.7,
    matchScore: 98,
    description: "Sunrise Senior Living offers a homelike setting and cheerful environment with a variety of suites to choose from.",
    amenities: ["24/7 Staff", "Transportation", "Meals", "Activities", "Housekeeping", "Pet Friendly"],
    availableBeds: 5,
    priceRange: "$3,500 - $5,200/month",
    images: ["/placeholder.svg"],
    latitude: 33.448376,
    longitude: -112.074036
  },
  {
    id: "f2",
    name: "Golden Years Retirement",
    type: "independent-living",
    address: "456 Wellness Way, Phoenix, AZ 85016",
    phone: "(602) 555-5678",
    email: "contact@goldenyears.com",
    website: "https://www.goldenyears.com",
    rating: 4.5,
    matchScore: 95,
    description: "Golden Years Retirement Community is a premier independent living facility designed for active seniors.",
    amenities: ["Fitness Center", "Pool", "Fine Dining", "Social Events", "Library", "Gardens"],
    availableBeds: 3,
    priceRange: "$2,800 - $4,500/month",
    images: ["/placeholder.svg"],
    latitude: 33.502110,
    longitude: -112.070080
  },
  {
    id: "f3",
    name: "Peaceful Haven Memory Care",
    type: "memory-care",
    address: "789 Serenity Blvd, Phoenix, AZ 85020",
    phone: "(602) 555-9012",
    email: "info@peacefulhaven.com",
    website: "https://www.peacefulhaven.com",
    rating: 4.8,
    matchScore: 91,
    description: "Specialized memory care facility with a focus on Alzheimer's and dementia care in a secure, nurturing environment.",
    amenities: ["Secure Environment", "Memory Care Programs", "Therapeutic Activities", "Specialized Dining", "Family Support"],
    availableBeds: 2,
    priceRange: "$5,500 - $7,200/month",
    images: ["/placeholder.svg"],
    latitude: 33.563868,
    longitude: -112.066315
  },
  {
    id: "f4",
    name: "Desert Bloom Care Center",
    type: "skilled-nursing",
    address: "101 Healthcare Drive, Phoenix, AZ 85022",
    phone: "(602) 555-3456",
    email: "admissions@desertbloom.com",
    website: "https://www.desertbloomcare.com",
    rating: 4.3,
    matchScore: 88,
    description: "Comprehensive skilled nursing facility offering rehabilitation services and long-term care options.",
    amenities: ["Rehabilitation Services", "Medical Staff 24/7", "Pain Management", "Specialized Dining", "Social Services"],
    availableBeds: 7,
    priceRange: "$7,000 - $9,500/month",
    images: ["/placeholder.svg"],
    latitude: 33.410379,
    longitude: -112.005945
  },
  {
    id: "f5",
    name: "Valley View Retirement",
    type: "continuing-care",
    address: "222 Sunset Road, Phoenix, AZ 85028",
    phone: "(602) 555-7890",
    email: "info@valleyviewretirement.com",
    website: "https://www.valleyviewretirement.com",
    rating: 4.9,
    matchScore: 85,
    description: "Continuing care retirement community with independent living, assisted living, and nursing care all in one campus.",
    amenities: ["Multiple Care Levels", "Dining Options", "Wellness Programs", "Arts Studio", "Community Events"],
    availableBeds: 4,
    priceRange: "$3,200 - $8,500/month",
    images: ["/placeholder.svg"],
    latitude: 33.485001,
    longitude: -112.129320
  }
];

export default function CareMatch() {
  const navigate = useNavigate();
  const [careData, setCareData] = useState<CareNeedsData | null>(null);
  
  // Load assessment data from session storage
  useEffect(() => {
    const savedData = sessionStorage.getItem("careAssessmentData");
    if (savedData) {
      setCareData(JSON.parse(savedData));
    } else {
      // If no data, redirect back to assessment page
      navigate("/care-assessment");
    }
  }, [navigate]);
  
  return (
    <div>
      <PageHeader
        title="Care Matches"
        description="Facilities that best match your care needs"
      >
        <Button 
          variant="outline" 
          onClick={() => navigate("/care-assessment")}
        >
          Edit Assessment
        </Button>
      </PageHeader>
      
      {careData && (
        <div className="mt-4 mb-6 bg-care-blue-50 rounded-lg p-4 border border-care-blue-100">
          <div className="text-sm">
            <span className="font-medium">Assessment for:</span> {careData.clientName} ({careData.clientAge}, {careData.clientGender})
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-care-blue-100 text-care-blue-800 px-2 py-1 rounded text-xs">
              {careData.careLevel === "independent" ? "Independent Living" :
               careData.careLevel === "assisted" ? "Assisted Living" :
               careData.careLevel === "memory" ? "Memory Care" :
               careData.careLevel === "skilled" ? "Skilled Nursing" :
               careData.careLevel === "respite" ? "Respite Care" : careData.careLevel}
            </span>
            <span className="bg-care-blue-100 text-care-blue-800 px-2 py-1 rounded text-xs">
              Budget: {careData.budget}
            </span>
            {careData.preferredLocation && (
              <span className="bg-care-blue-100 text-care-blue-800 px-2 py-1 rounded text-xs">
                Location: {careData.preferredLocation}
              </span>
            )}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-medium mb-4">Top Recommendations</h2>
          <div className="space-y-4">
            {matchedFacilities.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} showMatchScore={true} />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-4">Facility Locations</h2>
          <MapView facilities={matchedFacilities} />
        </div>
      </div>
    </div>
  );
}
