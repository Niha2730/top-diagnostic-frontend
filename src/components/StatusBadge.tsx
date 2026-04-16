import type { Order } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, FlaskConical, Package } from "lucide-react";

const statusConfig = {
  pending: { label: "Pending", icon: Clock, className: "bg-warning/10 text-warning-foreground border-warning/20" },
  "sample-collected": { label: "Sample Collected", icon: Package, className: "bg-info/10 text-info-foreground border-info/20" },
  processing: { label: "Processing", icon: FlaskConical, className: "bg-primary/10 text-primary border-primary/20" },
  completed: { label: "Completed", icon: CheckCircle, className: "bg-success/10 text-success border-success/20" },
};

export function StatusBadge({ status }: { status: Order["status"] }) {
  const config = statusConfig[status];
  const Icon = config.icon;
  return (
    <Badge variant="outline" className={`gap-1 ${config.className}`}>
      <Icon className="h-3 w-3" /> {config.label}
    </Badge>
  );
}
