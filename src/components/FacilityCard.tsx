
import { Star, MapPin, Phone, Mail, Bed, DollarSign, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Facility {
  id: string;
  name: string;
  type: string;
  rating: number;
  phone: string;
  email: string;
  address: string;
  availableBeds: number;
  priceRange: string;
  amenities?: string[];
  images?: string[];
  matchScore?: number;
}

interface FacilityCardProps {
  facility: Facility;
  showMatchScore?: boolean;
}

export function FacilityCard({ facility, showMatchScore = false }: FacilityCardProps) {
  const handleViewDetails = () => {
    toast.info(`Viewing details for ${facility.name}`);
  };

  const handleScheduleTour = () => {
    toast.success(`Tour scheduled for ${facility.name}`, {
      description: "A confirmation email has been sent.",
      action: {
        label: "View Calendar",
        onClick: () => toast.info("Opening calendar view...")
      }
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-40 bg-care-neutral-200 overflow-hidden">
        {facility.images?.[0] ? (
          <img 
            src={facility.images[0]} 
            alt={facility.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-care-blue-100 text-care-blue-500">
            <Info className="h-8 w-8 opacity-50" />
          </div>
        )}
        
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="text-sm font-medium">{facility.rating}</span>
        </div>
        
        <div className="absolute bottom-2 left-2 bg-care-blue-600 text-white text-xs px-2 py-1 rounded-full capitalize">
          {facility.type.replace('-', ' ')}
        </div>
        
        {showMatchScore && facility.matchScore && (
          <div className="absolute bottom-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            {facility.matchScore}% Match
          </div>
        )}
      </div>
      
      <CardHeader className="border-b p-4">
        <div>
          <h3 className="font-semibold text-lg text-care-neutral-900">{facility.name}</h3>
          <p className="text-sm text-care-neutral-500 flex items-center mt-1">
            <MapPin className="h-3.5 w-3.5 mr-1 text-care-neutral-400" />
            {facility.address}
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-care-neutral-400" />
            <span className="text-care-neutral-700">{facility.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-care-neutral-400" />
            <span className="text-care-neutral-700">{facility.email}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 pt-2 border-t">
          <div className="bg-care-neutral-50 p-2 rounded text-center">
            <div className="text-xs text-care-neutral-500">Available Beds</div>
            <div className="flex items-center justify-center mt-1">
              <Bed className="h-4 w-4 text-care-blue-500 mr-1" />
              <span className="font-medium text-care-neutral-900">{facility.availableBeds}</span>
            </div>
          </div>
          <div className="bg-care-neutral-50 p-2 rounded text-center">
            <div className="text-xs text-care-neutral-500">Monthly Price</div>
            <div className="flex items-center justify-center mt-1">
              <DollarSign className="h-4 w-4 text-green-600 mr-1" />
              <span className="font-medium text-care-neutral-900 text-sm">{facility.priceRange}</span>
            </div>
          </div>
        </div>
        
        {facility.amenities && (
          <div className="pt-2 border-t">
            <p className="text-xs font-medium text-care-neutral-500 mb-2">Amenities</p>
            <div className="flex flex-wrap gap-1">
              {facility.amenities.slice(0, 4).map((amenity, index) => (
                <span 
                  key={index}
                  className="bg-care-blue-50 text-care-blue-700 text-xs px-2 py-0.5 rounded-full"
                >
                  {amenity}
                </span>
              ))}
              {facility.amenities.length > 4 && (
                <span className="text-xs text-care-neutral-500">
                  +{facility.amenities.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button className="flex-1" variant="outline" onClick={handleViewDetails}>
          View Details
        </Button>
        <Button className="flex-1 bg-care-blue-600 hover:bg-care-blue-700" onClick={handleScheduleTour}>
          Schedule Tour
        </Button>
      </CardFooter>
    </Card>
  );
}
