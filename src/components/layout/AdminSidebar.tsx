import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, FileText, Upload, RefreshCw } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const adminLinks = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/prescriptions", label: "Prescriptions", icon: FileText },
  { to: "/admin/upload-reports", label: "Upload Reports", icon: Upload },
  { to: "/admin/update-status", label: "Update Status", icon: RefreshCw },
];

export function AdminSidebar() {
  const location = useLocation();
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <img src={logo} alt="TOP DIAGNOSTIC" className="h-12 w-auto" />
        <span className="text-lg font-bold">Admin</span>
      </div>
      <nav className="flex flex-col gap-1 p-3">
        {adminLinks.map((link) => {
          const isActive = link.to === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(link.to);
          return (
            <Link key={link.to} to={link.to} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function AdminMobileNav() {
  const location = useLocation();
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-border bg-card px-4 py-2 lg:hidden">
      {adminLinks.map((link) => {
        const isActive = link.to === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(link.to);
        return (
          <Link key={link.to} to={link.to} className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
            <link.icon className="h-3.5 w-3.5" />
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
