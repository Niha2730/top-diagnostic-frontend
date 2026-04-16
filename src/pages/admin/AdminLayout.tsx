import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { AdminSidebar, AdminMobileNav } from "@/components/layout/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <AdminSidebar />
        <div className="flex-1"><AdminMobileNav /><Outlet /></div>
      </div>
    </div>
  );
}
