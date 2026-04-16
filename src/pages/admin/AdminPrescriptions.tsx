import { orders } from "@/lib/mock-data";
import { FileText, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminPrescriptions() {
  const withPrescriptions = orders.filter((o) => o.prescriptionUrl);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Prescriptions</h1>
      <p className="mt-1 text-sm text-muted-foreground">View uploaded prescriptions from patients</p>
      <div className="mt-8 space-y-3">
        {withPrescriptions.map((order) => (
          <div key={order.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-4"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><FileText className="h-5 w-5 text-primary" /></div><div><h3 className="font-semibold text-sm">{order.patientName}</h3><p className="text-xs text-muted-foreground">{order.id} • {order.testName} • {order.date}</p></div></div>
            <div className="flex gap-2"><Button variant="outline" size="sm" className="gap-1.5"><Eye className="h-3.5 w-3.5" />View</Button><Button size="sm" className="gap-1.5 bg-primary text-primary-foreground"><Download className="h-3.5 w-3.5" />Download</Button></div>
          </div>
        ))}
        {withPrescriptions.length === 0 && <div className="py-16 text-center text-muted-foreground">No prescriptions uploaded yet</div>}
      </div>
    </div>
  );
}
