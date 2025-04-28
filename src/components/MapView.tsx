
import { useState, useEffect } from "react";
import { MapPin, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Facility {
  id: string;
  name: string;
  address: string;
  type: string;
  latitude?: number;
  longitude?: number;
  rating?: number;
  availableBeds?: number;
}

interface MapViewProps {
  facilities: Array<Facility>;
}

// This is a simulation of coordinates used for demo purposes
const generateCoordinates = (index: number) => {
  // Create a cluster of points around Los Angeles
  const baseLatitude = 34.0522;
  const baseLongitude = -118.2437;
  
  return {
    latitude: baseLatitude + (Math.random() - 0.5) * 0.2,
    longitude: baseLongitude + (Math.random() - 0.5) * 0.3
  };
};

export function MapView({ facilities }: MapViewProps) {
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState("demo_key");
  const [apiKey, setApiKey] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [zoom, setZoom] = useState(12);
  const [demoMode, setDemoMode] = useState(true);

  // This is a placeholder for a real map implementation
  const handleSubmitApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) {
      toast.error("Please enter an API key");
      return;
    }
    
    setApiKey(apiKeyInput);
    setMapLoaded(true);
    toast.success("Map loaded successfully!");
  };

  const handleDemoMode = () => {
    setDemoMode(true);
    setMapLoaded(true);
    setApiKey("demo_key");
    toast.success("Demo map loaded!");
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 1, 18));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 1, 10));
  };

  const handleResetView = () => {
    setZoom(12);
    setSelectedFacility(null);
    toast.info("Map view reset");
  };

  // Auto-load demo mode on component mount
  useEffect(() => {
    if (!apiKey && demoMode) {
      handleDemoMode();
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4 min-h-[600px] relative">
      {!mapLoaded ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="max-w-md w-full p-6 bg-care-neutral-50 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Map API Key Required</h3>
            <p className="text-sm text-care-neutral-600 mb-4">
              To view the interactive map, you need to provide a Mapbox API key.
            </p>
            <form onSubmit={handleSubmitApiKey} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="Enter your Mapbox API key"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex gap-2">
                <button 
                  type="submit" 
                  className="bg-care-blue-600 text-white px-4 py-2 rounded-md hover:bg-care-blue-700 flex-1"
                >
                  Load Map
                </button>
                <button 
                  type="button" 
                  onClick={handleDemoMode}
                  className="bg-care-neutral-200 text-care-neutral-700 px-4 py-2 rounded-md hover:bg-care-neutral-300 flex-1"
                >
                  Use Demo Map
                </button>
              </div>
              <div className="flex items-start gap-2 text-sm text-care-neutral-500">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  For demonstration purposes, you can use the "Demo Map" option without an actual API key.
                </p>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          {/* Placeholder map with facility markers */}
          <div className="bg-care-neutral-100 h-[600px] rounded-md relative overflow-hidden">
            {/* Map background */}
            <div className="absolute inset-0" style={{ 
              backgroundImage: demoMode ? 
                "url('https://placehold.co/1200x600?text=Interactive+Map+Demo')" : 
                `url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-118.2437,34.0522,${zoom},0/1200x600?access_token=${apiKey}')`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}>
            </div>

            {/* Facility markers */}
            {facilities.map((facility, index) => {
              const coords = facility.latitude && facility.longitude ? 
                { latitude: facility.latitude, longitude: facility.longitude } : 
                generateCoordinates(index);
                
              return (
                <div 
                  key={facility.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    // Position markers across the map in a grid for the demo
                    top: `${30 + ((coords.latitude - 34) * 500)}%`,
                    left: `${50 + ((coords.longitude + 118) * 100)}%`,
                    zIndex: selectedFacility === facility.id ? 10 : 1
                  }}
                  onClick={() => setSelectedFacility(facility.id)}
                >
                  <div className={`
                    p-1 rounded-full 
                    ${selectedFacility === facility.id ? 'bg-care-blue-600 text-white scale-125' : 'bg-care-blue-100 text-care-blue-600'}
                    hover:bg-care-blue-600 hover:text-white cursor-pointer transition-all
                  `}>
                    <MapPin className="h-6 w-6" />
                  </div>
                  
                  {selectedFacility === facility.id && (
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-lg w-56 z-20">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-care-neutral-900">{facility.name}</h4>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFacility(null);
                          }}
                          className="text-care-neutral-500 hover:text-care-neutral-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-care-neutral-500 mb-2">{facility.address}</p>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="capitalize bg-care-blue-50 text-care-blue-700 px-2 py-0.5 rounded-full">
                          {facility.type.replace('-', ' ')}
                        </span>
                        {facility.rating && (
                          <span className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full flex items-center">
                            ★ {facility.rating}
                          </span>
                        )}
                      </div>
                      {facility.availableBeds !== undefined && (
                        <div className="text-xs text-care-neutral-700">
                          <strong>Available beds:</strong> {facility.availableBeds}
                        </div>
                      )}
                      <Button 
                        size="sm"
                        className="w-full mt-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.info(`Viewing details for ${facility.name}`);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button 
                className="bg-white p-2 rounded-md shadow-md hover:bg-care-neutral-100"
                onClick={handleZoomIn}
              >
                <span className="text-xl font-bold">+</span>
              </button>
              <button 
                className="bg-white p-2 rounded-md shadow-md hover:bg-care-neutral-100"
                onClick={handleZoomOut}
              >
                <span className="text-xl font-bold">−</span>
              </button>
            </div>

            {/* Reset view button */}
            <div className="absolute bottom-4 right-4">
              <button 
                className="bg-white px-3 py-1 text-sm rounded-md shadow-md hover:bg-care-neutral-100"
                onClick={handleResetView}
              >
                Reset View
              </button>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-care-neutral-500">
              Showing {facilities.length} facilities in the selected area.
            </div>
            {demoMode && (
              <div className="text-xs bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full">
                Demo Mode - No actual API key required
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
