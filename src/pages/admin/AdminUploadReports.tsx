import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { orders } from "@/lib/mock-data";
import { Upload, FileUp, CheckCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminUploadReports() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Upload Reports</h1>
      <p className="mt-1 text-sm text-muted-foreground">Upload diagnostic reports for completed orders</p>
      {submitted ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 mb-4"><CheckCircle className="h-8 w-8 text-success" /></div>
          <h2 className="text-xl font-bold">Report Uploaded!</h2>
          <p className="mt-2 text-muted-foreground">Patient will be notified via SMS and email.</p>
          <Button className="mt-6 bg-primary text-primary-foreground" onClick={() => { setSubmitted(false); setFileName(""); }}>Upload Another</Button>
        </motion.div>
      ) : (
        <form className="mt-8 max-w-xl space-y-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
          <div><Label htmlFor="orderId">Order ID</Label><select id="orderId" className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"><option value="">Select an order</option>{orders.map((o) => (<option key={o.id} value={o.id}>{o.id} — {o.patientName} — {o.testName}</option>))}</select></div>
          <div><Label>Report File</Label><label className="mt-1.5 flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 hover:border-primary/50">{fileName ? (<><FileUp className="h-10 w-10 text-primary" /><span className="text-sm font-medium">{fileName}</span></>) : (<><Upload className="h-10 w-10 text-muted-foreground" /><span className="text-sm text-muted-foreground">Click to upload report (PDF)</span></>)}<input type="file" className="hidden" accept=".pdf" onChange={(e) => e.target.files?.[0] && setFileName(e.target.files[0].name)} /></label></div>
          <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground">Upload Report</Button>
        </form>
      )}
    </div>
  );
}
