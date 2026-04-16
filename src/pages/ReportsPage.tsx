import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { orders } from "@/lib/mock-data";
import { Download, FileText, Search } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { useState } from "react";

export default function ReportsPage() {
  const [search, setSearch] = useState("");
  const completedOrders = orders.filter((o) => o.status === "completed");
  const filtered = search ? completedOrders.filter((o) => o.id.toLowerCase().includes(search.toLowerCase()) || o.testName.toLowerCase().includes(search.toLowerCase())) : completedOrders;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-bold">Your Reports</h1>
        <p className="mt-1 text-muted-foreground">Download your diagnostic test reports</p>
        <div className="mt-6 relative max-w-md"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search by Order ID or test name..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <div className="mt-8 space-y-3">
          {filtered.map((order) => (
            <div key={order.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-4"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><FileText className="h-5 w-5 text-primary" /></div><div><h3 className="font-semibold text-sm">{order.testName}</h3><p className="text-xs text-muted-foreground">{order.id} • {order.date} • {order.patientName}</p></div></div>
              <div className="flex items-center gap-3"><StatusBadge status={order.status} /><Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"><Download className="h-3.5 w-3.5" /><span className="hidden sm:inline">Download</span></Button></div>
            </div>
          ))}
          {filtered.length === 0 && <div className="flex flex-col items-center py-16"><FileText className="h-12 w-12 text-muted-foreground/30 mb-3" /><p className="text-muted-foreground">No reports available yet</p></div>}
        </div>
      </div>
      <Footer />
    </div>
  );
}
