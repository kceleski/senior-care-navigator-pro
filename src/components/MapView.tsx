
interface MapViewProps {
  facilities: Array<{
    id: string;
    name: string;
    address: string;
    type: string;
  }>;
}

export function MapView({ facilities }: MapViewProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 min-h-[600px] flex items-center justify-center">
      <div className="text-care-neutral-500">
        Map view will be implemented with an interactive map service.
        Showing {facilities.length} facilities in the selected area.
      </div>
    </div>
  );
}
