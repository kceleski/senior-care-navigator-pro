
import { useState, useEffect, useRef } from "react";
import { MapPin, Info, X, Share2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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

// This is a fallback for coordinates if none provided
const generateCoordinates = (index: number) => {
  // Create a cluster of points around Phoenix
  const baseLatitude = 33.448376;
  const baseLongitude = -112.074036;
  
  return {
    latitude: baseLatitude + (Math.random() - 0.5) * 0.2,
    longitude: baseLongitude + (Math.random() - 0.5) * 0.3
  };
};

export function MapView({ facilities }: MapViewProps) {
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [apiKey, setApiKey] = useState(localStorage.getItem("mapbox_api_key") || "");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [demoMode, setDemoMode] = useState(!apiKey);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const popupsRef = useRef<mapboxgl.Popup[]>([]);

  const handleSubmitApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) {
      toast.error("Please enter an API key");
      return;
    }
    
    setApiKey(apiKeyInput);
    localStorage.setItem("mapbox_api_key", apiKeyInput);
    setDemoMode(false);
    setMapLoaded(false);
    toast.success("API key saved successfully!");
  };

  const handleDemoMode = () => {
    setDemoMode(true);
    setMapLoaded(true);
    toast.success("Demo map loaded!");
  };

  const clearMapboxKey = () => {
    localStorage.removeItem("mapbox_api_key");
    setApiKey("");
    setApiKeyInput("");
    setDemoMode(true);
    setMapLoaded(false);
    toast.info("Mapbox API key cleared");
  };

  // Effect to initialize the map when apiKey changes
  useEffect(() => {
    // Clear previous markers and popups
    markersRef.current.forEach(marker => marker.remove());
    popupsRef.current.forEach(popup => popup.remove());
    markersRef.current = [];
    popupsRef.current = [];
    
    // Remove previous map
    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    if (demoMode) {
      setMapLoaded(true);
      return;
    }

    if (!apiKey || !mapContainer.current) {
      setMapLoaded(false);
      return;
    }

    try {
      // Initialize Mapbox
      mapboxgl.accessToken = apiKey;
      
      // Create new map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-112.074036, 33.448376], // Phoenix, AZ
        zoom: 11
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl());

      // Wait for map to load
      map.current.on("load", () => {
        setMapLoaded(true);
        toast.success("Map loaded successfully!");

        // Add markers for each facility
        facilities.forEach((facility) => {
          const coords = facility.latitude && facility.longitude ? 
            { latitude: facility.latitude, longitude: facility.longitude } : 
            generateCoordinates(0);

          // Create HTML element for marker
          const el = document.createElement("div");
          el.className = "facility-marker";
          el.style.backgroundColor = "#3b82f6";
          el.style.borderRadius = "50%";
          el.style.width = "30px";
          el.style.height = "30px";
          el.style.display = "flex";
          el.style.alignItems = "center";
          el.style.justifyContent = "center";
          el.style.color = "white";
          el.style.cursor = "pointer";
          el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";
          el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
          
          el.addEventListener("click", () => {
            setSelectedFacility(facility.id);
          });

          // Create marker and add to map
          const marker = new mapboxgl.Marker(el)
            .setLngLat([coords.longitude, coords.latitude])
            .addTo(map.current!);
            
          markersRef.current.push(marker);
        });
      });

      // Handle errors
      map.current.on("error", (e) => {
        console.error("Mapbox error:", e);
        toast.error("Error loading map. Check your API key.");
        setMapLoaded(false);
        setDemoMode(true);
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      toast.error("Failed to initialize map. Check your API key.");
      setMapLoaded(false);
      setDemoMode(true);
    }

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [apiKey, demoMode, facilities]);

  // Effect to create popup when selected facility changes
  useEffect(() => {
    if (!map.current || demoMode) return;
    
    // Clear existing popups
    popupsRef.current.forEach(popup => popup.remove());
    popupsRef.current = [];
    
    if (selectedFacility) {
      const facility = facilities.find(f => f.id === selectedFacility);
      if (!facility) return;
      
      const coords = facility.latitude && facility.longitude ? 
        { latitude: facility.latitude, longitude: facility.longitude } : 
        generateCoordinates(0);
        
      // Create popup content
      const popupContent = document.createElement("div");
      popupContent.className = "facility-popup p-3 max-w-xs";
      popupContent.innerHTML = `
        <h3 class="font-medium mb-1">${facility.name}</h3>
        <p class="text-xs mb-1">${facility.address}</p>
        <div class="flex items-center text-xs mb-1">
          <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full capitalize">
            ${facility.type.replace("-", " ")}
          </span>
          ${facility.rating ? `
          <span class="ml-2 bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full flex items-center">
            ★ ${facility.rating}
          </span>` : ''}
        </div>
        ${facility.availableBeds !== undefined ? `
        <div class="text-xs">
          <strong>Available beds:</strong> ${facility.availableBeds}
        </div>` : ''}
        <button class="w-full mt-2 bg-blue-600 text-white text-xs py-1 px-2 rounded">View Details</button>
      `;
      
      // Add click event to the view details button
      const detailsButton = popupContent.querySelector("button");
      if (detailsButton) {
        detailsButton.addEventListener("click", () => {
          toast.info(`Viewing details for ${facility.name}`);
        });
      }
      
      // Create and add popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setLngLat([coords.longitude, coords.latitude])
        .setDOMContent(popupContent)
        .addTo(map.current);
        
      // Add close event
      popup.on("close", () => {
        setSelectedFacility(null);
      });
      
      popupsRef.current.push(popup);
    }
  }, [selectedFacility, demoMode, facilities]);

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
                  <br />
                  <a 
                    href="https://www.mapbox.com/studio/account/tokens/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-care-blue-600 hover:underline"
                  >
                    Get a free Mapbox API key here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          {/* Map container */}
          <div className="h-[600px] rounded-md relative overflow-hidden">
            {demoMode ? (
              <div className="absolute inset-0 bg-care-neutral-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-care-blue-600 mb-2">
                    <MapPin className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Demo Map Mode</h3>
                  <p className="text-care-neutral-500 max-w-md mb-4">
                    You're viewing the demo map. To see a real interactive map, please provide a Mapbox API key.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {facilities.map((facility, index) => (
                      <div 
                        key={facility.id}
                        className={`p-3 border rounded-md cursor-pointer transition-colors ${
                          selectedFacility === facility.id 
                            ? 'bg-care-blue-50 border-care-blue-200' 
                            : 'bg-white hover:bg-care-neutral-50'
                        }`}
                        onClick={() => setSelectedFacility(facility.id === selectedFacility ? null : facility.id)}
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium">{facility.name}</h4>
                          {facility.rating && (
                            <span className="text-yellow-600 text-sm flex items-center">
                              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-0.5" />
                              {facility.rating}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-care-neutral-500">{facility.address}</p>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs bg-care-blue-50 text-care-blue-700 px-1.5 py-0.5 rounded-full capitalize">
                            {facility.type.replace('-', ' ')}
                          </span>
                          {facility.availableBeds !== undefined && (
                            <span className="text-xs">
                              {facility.availableBeds} beds available
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setMapLoaded(false);
                        setApiKeyInput(apiKey || "");
                      }}
                    >
                      Enter API Key
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div ref={mapContainer} className="h-full w-full" />
            )}

            {/* Map controls */}
            {!demoMode && (
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="bg-white shadow-md h-8 w-8" 
                  onClick={() => map.current?.zoomIn()}
                >
                  <span className="text-lg">+</span>
                </Button>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="bg-white shadow-md h-8 w-8" 
                  onClick={() => map.current?.zoomOut()}
                >
                  <span className="text-lg">−</span>
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-white shadow-md h-8 w-8"
                  onClick={() => {
                    map.current?.flyTo({
                      center: [-112.074036, 33.448376],
                      zoom: 11,
                      essential: true
                    });
                    setSelectedFacility(null);
                  }}
                >
                  <Share2 className="h-4 w-4 rotate-45" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-white shadow-md h-8 w-8"
                  onClick={() => {
                    const currentStyle = map.current?.getStyle().name;
                    const newStyle = currentStyle?.includes('Streets') 
                      ? "mapbox://styles/mapbox/satellite-streets-v12" 
                      : "mapbox://styles/mapbox/streets-v12";
                    map.current?.setStyle(newStyle);
                  }}
                >
                  <Layers className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-care-neutral-500">
              Showing {facilities.length} facilities in the selected area.
            </div>
            <div className="flex gap-2">
              {!demoMode && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearMapboxKey}
                >
                  Clear API Key
                </Button>
              )}
              {demoMode && (
                <div className="text-xs bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full">
                  Demo Mode - No API key required
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
