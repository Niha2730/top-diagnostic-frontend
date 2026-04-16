import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TestsPage from "./pages/TestsPage";
import BookPage from "./pages/BookPage";
import CartPage from "./pages/CartPage";
import ReportsPage from "./pages/ReportsPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import UploadPrescriptionPage from "./pages/UploadPrescriptionPage";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminPrescriptions from "./pages/admin/AdminPrescriptions";
import AdminUpdateStatus from "./pages/admin/AdminUpdateStatus";
import AdminUploadReports from "./pages/admin/AdminUploadReports";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tests" element={<TestsPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/upload-prescription" element={<UploadPrescriptionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="prescriptions" element={<AdminPrescriptions />} />
          <Route path="update-status" element={<AdminUpdateStatus />} />
          <Route path="upload-reports" element={<AdminUploadReports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
