import { orders } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { Input } from "@/components/ui/input";
import { Search, Calendar } from "lucide-react";
import { useState } from "react";

export default function AdminOrders() {
  const [search, setSearch] = useState("");
  const filtered = search ? orders.filter((o) => o.id.toLowerCase().includes(search.toLowerCase()) || o.patientName.toLowerCase().includes(search.toLowerCase())) : orders;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Orders</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage all diagnostic test orders</p>
      <div className="mt-6 relative max-w-sm"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search orders..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
      <div className="mt-6 space-y-3">
        {filtered.map((order) => (
          <div key={order.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><div className="flex items-center gap-2"><h3 className="font-bold">{order.id}</h3><StatusBadge status={order.status} /></div><p className="mt-1 font-medium text-sm">{order.testName}</p><p className="text-sm text-muted-foreground">{order.patientName}</p></div>
              <div className="text-right"><p className="text-lg font-bold">₹{order.amount}</p><p className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar className="h-3 w-3" />{order.date}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
