
import { useState } from "react";
import { MapPin, Info } from "lucide-react";

interface MapViewProps {
  facilities: Array<{
    id: string;
    name: string;
    address: string;
    type: string;
  }>;
}

export function MapView({ facilities }: MapViewProps) {
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [apiKey, setApiKey] = useState("");

  // This is a placeholder for a real map implementation
  const handleSubmitApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(apiKeyInput);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 min-h-[600px] relative">
      {!apiKey ? (
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
              <button 
                type="submit" 
                className="bg-care-blue-600 text-white px-4 py-2 rounded-md hover:bg-care-blue-700 w-full"
              >
                Load Map
              </button>
              <div className="flex items-start gap-2 text-sm text-care-neutral-500">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  You can get a Mapbox API key by signing up at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-care-blue-600 hover:underline">mapbox.com</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          {/* Placeholder map with facility markers */}
          <div className="bg-care-neutral-100 h-full rounded-md relative overflow-hidden">
            {/* Map background */}
            <div className="absolute inset-0" style={{ 
              backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-118.2437,34.0522,10,0/1200x600?access_token=" + apiKey + "')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}>
            </div>

            {/* Facility markers */}
            {facilities.map((facility) => (
              <div 
                key={facility.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  // Mock positions - in a real implementation you'd use geocoding to get coordinates
                  top: `${30 + Math.random() * 40}%`,
                  left: `${30 + Math.random() * 40}%`,
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
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-lg w-48 z-20">
                    <h4 className="font-medium text-care-neutral-900">{facility.name}</h4>
                    <p className="text-xs text-care-neutral-500 mt-1">{facility.address}</p>
                    <p className="text-xs mt-1 capitalize bg-care-blue-50 text-care-blue-700 inline-block px-2 py-0.5 rounded-full">
                      {facility.type.replace('-', ' ')}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="bg-white p-2 rounded-md shadow-md hover:bg-care-neutral-100">
                <span className="text-xl font-bold">+</span>
              </button>
              <button className="bg-white p-2 rounded-md shadow-md hover:bg-care-neutral-100">
                <span className="text-xl font-bold">−</span>
              </button>
            </div>

            {/* Reset view button */}
            <div className="absolute bottom-4 right-4">
              <button className="bg-white px-3 py-1 text-sm rounded-md shadow-md hover:bg-care-neutral-100">
                Reset View
              </button>
            </div>
          </div>

          <div className="mt-2 text-sm text-care-neutral-500">
            Showing {facilities.length} facilities in the selected area.
          </div>
        </>
      )}
    </div>
  );
}
