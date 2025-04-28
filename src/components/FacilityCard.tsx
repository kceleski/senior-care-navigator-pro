
import { Star, MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
}

interface FacilityCardProps {
  facility: Facility;
}

export function FacilityCard({ facility }: FacilityCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="border-b p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-care-neutral-900">{facility.name}</h3>
            <p className="text-sm text-care-neutral-500 capitalize">{facility.type.replace('-', ' ')}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{facility.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-care-neutral-400 mt-1" />
            <span className="text-care-neutral-700">{facility.address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-care-neutral-400" />
            <span className="text-care-neutral-700">{facility.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-care-neutral-400" />
            <span className="text-care-neutral-700">{facility.email}</span>
          </div>
        </div>
        
        <div className="pt-2 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-care-neutral-500">Available Beds</span>
            <span className="font-medium text-care-neutral-900">{facility.availableBeds}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-care-neutral-500">Monthly Price</span>
            <span className="font-medium text-care-neutral-900">{facility.priceRange}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button className="w-full" variant="outline">View Details</Button>
          <Button className="w-full">Schedule Tour</Button>
        </div>
      </CardContent>
    </Card>
  );
}
