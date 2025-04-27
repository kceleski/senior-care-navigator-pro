
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type ClientStatus = 
  | 'assessment'
  | 'search'
  | 'tour'
  | 'paperwork'
  | 'move-in'
  | 'invoice'
  | 'follow-up-1w'
  | 'follow-up-1m'
  | 'follow-up-6m'
  | 'closed';

const statusColors: Record<ClientStatus, string> = {
  'assessment': 'bg-amber-100 text-amber-800 border-amber-200',
  'search': 'bg-blue-100 text-blue-800 border-blue-200',
  'tour': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'paperwork': 'bg-violet-100 text-violet-800 border-violet-200',
  'move-in': 'bg-purple-100 text-purple-800 border-purple-200',
  'invoice': 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
  'follow-up-1w': 'bg-pink-100 text-pink-800 border-pink-200',
  'follow-up-1m': 'bg-rose-100 text-rose-800 border-rose-200',
  'follow-up-6m': 'bg-orange-100 text-orange-800 border-orange-200',
  'closed': 'bg-gray-100 text-gray-800 border-gray-200',
};

const statusLabels: Record<ClientStatus, string> = {
  'assessment': 'Assessment',
  'search': 'Search',
  'tour': 'Tour',
  'paperwork': 'Paperwork',
  'move-in': 'Move In',
  'invoice': 'Invoice',
  'follow-up-1w': '1 Week Follow-up',
  'follow-up-1m': '1 Month Follow-up',
  'follow-up-6m': '6 Month Follow-up',
  'closed': 'Closed',
};

interface ClientStatusBadgeProps {
  status: ClientStatus;
  className?: string;
}

export function ClientStatusBadge({ status, className }: ClientStatusBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-medium border", 
        statusColors[status], 
        className
      )}
    >
      {statusLabels[status]}
    </Badge>
  );
}
