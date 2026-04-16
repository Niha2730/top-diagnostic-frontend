import { orders, diagnosticTests } from "@/lib/mock-data";
import { ShoppingBag, FlaskConical, DollarSign, Activity } from "lucide-react";

export default function AdminDashboard() {
  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const stats = [
    { label: "Total Orders", value: orders.length, icon: ShoppingBag, color: "text-primary" },
    { label: "Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-success" },
    { label: "Tests Available", value: diagnosticTests.length, icon: FlaskConical, color: "text-info" },
    { label: "Completed", value: completedOrders, icon: Activity, color: "text-info" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Overview of your diagnostic lab</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">{stat.label}</span><stat.icon className={`h-5 w-5 ${stat.color}`} /></div>
            <p className="mt-2 text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border bg-muted/50"><th className="px-4 py-3 text-left font-medium text-muted-foreground">Order ID</th><th className="px-4 py-3 text-left font-medium text-muted-foreground hidden sm:table-cell">Patient</th><th className="px-4 py-3 text-left font-medium text-muted-foreground">Test</th><th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">Status</th><th className="px-4 py-3 text-right font-medium text-muted-foreground">Amount</th></tr></thead>
            <tbody>{orders.map((order) => (<tr key={order.id} className="border-b border-border last:border-0"><td className="px-4 py-3 font-medium">{order.id}</td><td className="px-4 py-3 hidden sm:table-cell">{order.patientName}</td><td className="px-4 py-3 text-muted-foreground">{order.testName}</td><td className="px-4 py-3 hidden md:table-cell capitalize">{order.status.replace("-"," ")}</td><td className="px-4 py-3 text-right font-medium">₹{order.amount}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
