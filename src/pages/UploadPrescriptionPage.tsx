import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileImage, CheckCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function UploadPrescriptionPage() {
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) setFileName(e.target.files[0].name); };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-bold">Upload Prescription</h1>
        <p className="mt-1 text-muted-foreground">Upload your doctor's prescription and we'll book the tests for you</p>
        {uploaded ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-12 flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 mb-4"><CheckCircle className="h-8 w-8 text-success" /></div>
            <h2 className="text-xl font-bold">Prescription Uploaded!</h2>
            <p className="mt-2 text-muted-foreground">Our team will review your prescription and contact you within 2 hours.</p>
            <Button className="mt-6 bg-primary text-primary-foreground" onClick={() => setUploaded(false)}>Upload Another</Button>
          </motion.div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); setUploaded(true); }}>
            <div><Label htmlFor="patient">Patient Name</Label><Input id="patient" placeholder="Enter patient name" className="mt-1.5" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label htmlFor="age">Age</Label><Input id="age" type="number" placeholder="e.g. 30" className="mt-1.5" /></div>
              <div><Label htmlFor="gender">Gender</Label><select id="gender" className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"><option value="">Select</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div>
            </div>
            <div><Label htmlFor="phone">Phone Number</Label><Input id="phone" type="tel" placeholder="+91 98765 43210" className="mt-1.5" /></div>
            <div>
              <Label>Prescription Image</Label>
              <label className="mt-1.5 flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 hover:border-primary/50">
                {fileName ? (<><FileImage className="h-10 w-10 text-primary" /><span className="text-sm font-medium">{fileName}</span></>) : (<><Upload className="h-10 w-10 text-muted-foreground" /><span className="text-sm text-muted-foreground">Click to upload or drag and drop</span><span className="text-xs text-muted-foreground">PNG, JPG, PDF up to 10MB</span></>)}
                <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleFile} />
              </label>
            </div>
            <div><Label htmlFor="notes">Additional Notes</Label><Textarea id="notes" placeholder="Any specific instructions..." className="mt-1.5" rows={3} /></div>
            <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Submit Prescription</Button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
}
