import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { orders } from "@/lib/mock-data";
import { Search, Calendar } from "lucide-react";
import { useState } from "react";

export default function TrackOrderPage() {
  const [search, setSearch] = useState("");
  const filtered = search ? orders.filter((o) => o.id.toLowerCase().includes(search.toLowerCase())) : orders;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-bold">Track Your Order</h1>
        <p className="mt-1 text-muted-foreground">Enter your order ID to track the status</p>
        <div className="mt-6 flex max-w-md items-center gap-2">
          <div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Enter Order ID (e.g. ORD-001)" className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <Button className="bg-primary text-primary-foreground">Track</Button>
        </div>
        <div className="mt-8 space-y-4">
          {filtered.map((order) => (
            <div key={order.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div><div className="flex items-center gap-2"><h3 className="font-bold">{order.id}</h3><StatusBadge status={order.status} /></div><p className="mt-1 text-sm font-medium">{order.testName}</p><p className="text-sm text-muted-foreground">{order.patientName}</p></div>
                <div className="text-right"><p className="text-lg font-bold">₹{order.amount}</p><p className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar className="h-3 w-3" /> {order.date}</p></div>
              </div>
              <div className="mt-5">
                <div className="flex items-center gap-1">
                  {(["pending", "sample-collected", "processing", "completed"] as const).map((step, i) => {
                    const stepIndex = ["pending", "sample-collected", "processing", "completed"].indexOf(order.status);
                    return <div key={step} className="flex flex-1 items-center"><div className={`h-2 w-full rounded-full ${i <= stepIndex ? "bg-primary" : "bg-muted"}`} /></div>;
                  })}
                </div>
                <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground"><span>Booked</span><span>Collected</span><span>Processing</span><span>Done</span></div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="py-16 text-center text-muted-foreground">No orders found</div>}
        </div>
      </div>
      <Footer />
    </div>
  );
}
