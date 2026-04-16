import { Button } from "@/components/ui/button";
import { orders } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import type { Order } from "@/lib/mock-data";

const statuses: Order["status"][] = ["pending","sample-collected","processing","completed"];

export default function AdminUpdateStatus() {
  const [orderStatuses, setOrderStatuses] = useState<Record<string, Order["status"]>>(Object.fromEntries(orders.map((o) => [o.id, o.status])));
  const [saved, setSaved] = useState<string | null>(null);
  const update = (id: string, status: Order["status"]) => { setOrderStatuses((prev) => ({ ...prev, [id]: status })); setSaved(id); setTimeout(() => setSaved(null), 2000); };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Update Order Status</h1>
      <p className="mt-1 text-sm text-muted-foreground">Change the status of diagnostic orders</p>
      <div className="mt-8 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div><div className="flex items-center gap-2"><h3 className="font-bold">{order.id}</h3><StatusBadge status={orderStatuses[order.id]} />{saved === order.id && <span className="flex items-center gap-1 text-xs text-success"><CheckCircle className="h-3 w-3" />Saved</span>}</div><p className="mt-1 text-sm">{order.patientName} — {order.testName}</p></div>
              <span className="font-bold">₹{order.amount}</span>
            </div>
            <div className="flex flex-wrap gap-2">{statuses.map((status) => (<Button key={status} size="sm" variant={orderStatuses[order.id] === status ? "default" : "outline"} className={orderStatuses[order.id] === status ? "bg-primary text-primary-foreground" : ""} onClick={() => update(order.id, status)}>{status.replace("-"," ")}</Button>))}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
