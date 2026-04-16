import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { diagnosticTests } from "@/lib/mock-data";
import type { DiagnosticTest } from "@/lib/mock-data";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, FlaskConical, User, MapPin, Home, CalendarDays, CreditCard, Search, Clock, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Select Test", icon: FlaskConical },
  { label: "Your Details", icon: User },
  { label: "City", icon: MapPin },
  { label: "Address", icon: Home },
  { label: "Date & Time", icon: CalendarDays },
  { label: "Payment", icon: CreditCard },
];
const cities = ["Mumbai","Delhi","Bangalore","Hyderabad","Chennai","Kolkata","Pune","Ahmedabad","Jaipur","Lucknow","Chandigarh","Indore","Nagpur","Bhopal","Patna"];
const timeSlots = ["06:00 AM - 07:00 AM","07:00 AM - 08:00 AM","08:00 AM - 09:00 AM","09:00 AM - 10:00 AM","10:00 AM - 11:00 AM","11:00 AM - 12:00 PM","02:00 PM - 03:00 PM","03:00 PM - 04:00 PM","04:00 PM - 05:00 PM"];

interface BookingData { test: DiagnosticTest | null; name: string; phone: string; email: string; age: string; gender: string; city: string; address: string; pincode: string; landmark: string; date: Date | undefined; timeSlot: string; }

export default function BookPage() {
  const [searchParams] = useSearchParams();
  const testId = searchParams.get("testId") || "";
  const navigate = useNavigate();
  const preselected = testId ? diagnosticTests.find((t) => t.id === testId) || null : null;
  const [step, setStep] = useState(preselected ? 1 : 0);
  const [data, setData] = useState<BookingData>({ test: preselected, name: "", phone: "", email: "", age: "", gender: "", city: "", address: "", pincode: "", landmark: "", date: undefined, timeSlot: "" });
  const [search, setSearch] = useState("");
  const [paying, setPaying] = useState(false);
  const update = (partial: Partial<BookingData>) => setData((p) => ({ ...p, ...partial }));
  const canNext = (): boolean => { switch (step) { case 0: return !!data.test; case 1: return !!(data.name && data.phone.length >= 10 && data.age && data.gender); case 2: return !!data.city; case 3: return !!(data.address && data.pincode.length >= 6); case 4: return !!(data.date && data.timeSlot); default: return true; } };
  const testPrice = data.test?.price || 0;
  const gstAmount = Math.round(testPrice * 0.05);
  const totalAmount = testPrice + gstAmount;

  const handlePayment = () => {
    setPaying(true);
    const win = window as any;
    if (win.Razorpay) {
      const rzp = new win.Razorpay({ key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_XXXXXXXXXXXXXX", amount: totalAmount * 100, currency: "INR", name: "TOP DIAGNOSTIC", description: data.test?.name || "Diagnostic Test", handler: () => { setPaying(false); setStep(6); }, prefill: { name: data.name, contact: data.phone, email: data.email }, theme: { color: "#0EA5E9" }, modal: { ondismiss: () => setPaying(false) } });
      rzp.open();
    } else { alert("Razorpay SDK not loaded."); setPaying(false); }
  };

  if (step === 6) {
    return (
      <div className="min-h-screen flex flex-col"><Header /><div className="flex-1 flex items-center justify-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/20"><Check className="h-10 w-10 text-success" /></div>
          <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground mb-2">Your <span className="font-semibold text-foreground">{data.test?.name}</span> test has been booked.</p>
          <p className="text-sm text-muted-foreground mb-6">Our phlebotomist will visit on <span className="font-medium text-foreground">{data.date?.toLocaleDateString("en-IN", { dateStyle: "long" })}</span> at <span className="font-medium text-foreground">{data.timeSlot}</span>.</p>
          <Button onClick={() => navigate("/track-order")} className="bg-primary text-primary-foreground">Track Your Order</Button>
        </motion.div>
      </div><Footer /></div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
        {/* Stepper */}
        <div className="mb-8 overflow-x-auto"><div className="flex items-center justify-between min-w-[600px]">
          {steps.map((s, i) => { const Icon = s.icon; const isActive = i === step; const isDone = i < step; return (
            <div key={s.label} className="flex items-center gap-1 flex-1 last:flex-initial">
              <div className="flex flex-col items-center gap-1">
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors", isDone && "border-success bg-success text-success-foreground", isActive && "border-primary bg-primary text-primary-foreground", !isDone && !isActive && "border-border text-muted-foreground")}>{isDone ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}</div>
                <span className={cn("text-[10px] font-medium whitespace-nowrap", isActive ? "text-primary" : isDone ? "text-success" : "text-muted-foreground")}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className={cn("flex-1 h-0.5 mx-2 rounded-full", i < step ? "bg-success" : "bg-border")} />}
            </div>
          ); })}
        </div></div>

        <AnimatePresence mode="wait"><motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
          {step === 0 && (<div><h2 className="text-xl font-bold mb-1">Select a Test</h2><p className="text-sm text-muted-foreground mb-4">Choose the diagnostic test you'd like to book</p><div className="relative max-w-sm mb-4"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search tests..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
            <div className="grid gap-3 sm:grid-cols-2">{diagnosticTests.filter((t) => t.name.toLowerCase().includes(search.toLowerCase())).map((test) => (
              <button key={test.id} onClick={() => update({ test })} className={cn("flex flex-col items-start rounded-xl border p-4 text-left transition-all", data.test?.id === test.id ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border bg-card hover:border-primary/40")}>
                <span className="font-semibold text-sm">{test.name}</span>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground"><span className="flex items-center gap-1"><Clock className="h-3 w-3" />{test.turnaround}</span><span className="flex items-center gap-1"><Layers className="h-3 w-3" />{test.parameters} params</span></div>
                <div className="mt-2 flex items-center gap-2"><span className="font-bold text-foreground">₹{test.price}</span><span className="text-xs text-muted-foreground line-through">₹{test.originalPrice}</span></div>
              </button>
            ))}</div></div>)}

          {step === 1 && (<div><h2 className="text-xl font-bold mb-1">Your Details</h2><p className="text-sm text-muted-foreground mb-4">Enter the patient's information</p><div className="grid gap-4 max-w-lg">
            <div><label className="text-sm font-medium mb-1 block">Full Name *</label><Input value={data.name} onChange={(e) => update({ name: e.target.value })} placeholder="Enter full name" /></div>
            <div><label className="text-sm font-medium mb-1 block">Mobile Number *</label><Input value={data.phone} onChange={(e) => update({ phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} placeholder="10-digit mobile number" /></div>
            <div><label className="text-sm font-medium mb-1 block">Email</label><Input value={data.email} onChange={(e) => update({ email: e.target.value })} placeholder="email@example.com" type="email" /></div>
            <div className="grid grid-cols-2 gap-4"><div><label className="text-sm font-medium mb-1 block">Age *</label><Input value={data.age} onChange={(e) => update({ age: e.target.value.replace(/\D/g, "").slice(0, 3) })} placeholder="Age" /></div>
            <div><label className="text-sm font-medium mb-1 block">Gender *</label><div className="flex gap-2">{["Male","Female","Other"].map((g) => (<button key={g} onClick={() => update({ gender: g })} className={cn("flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors", data.gender === g ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted")}>{g}</button>))}</div></div></div>
          </div></div>)}

          {step === 2 && (<div><h2 className="text-xl font-bold mb-1">Select Your City</h2><p className="text-sm text-muted-foreground mb-4">Choose the city for home sample collection</p><div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg">{cities.map((city) => (<button key={city} onClick={() => update({ city })} className={cn("rounded-xl border px-4 py-3 text-sm font-medium transition-all", data.city === city ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20" : "border-border hover:border-primary/40")}>{city}</button>))}</div></div>)}

          {step === 3 && (<div><h2 className="text-xl font-bold mb-1">Collection Address</h2><p className="text-sm text-muted-foreground mb-4">Where should we send the phlebotomist?</p><div className="grid gap-4 max-w-lg">
            <div><label className="text-sm font-medium mb-1 block">Full Address *</label><textarea value={data.address} onChange={(e) => update({ address: e.target.value })} placeholder="House/flat number, building, street" rows={3} className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" /></div>
            <div className="grid grid-cols-2 gap-4"><div><label className="text-sm font-medium mb-1 block">Pincode *</label><Input value={data.pincode} onChange={(e) => update({ pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })} placeholder="6-digit pincode" /></div><div><label className="text-sm font-medium mb-1 block">Landmark</label><Input value={data.landmark} onChange={(e) => update({ landmark: e.target.value })} placeholder="Near..." /></div></div>
          </div></div>)}

          {step === 4 && (<div><h2 className="text-xl font-bold mb-1">Select Date & Time</h2><p className="text-sm text-muted-foreground mb-4">Pick a convenient slot</p><div className="flex flex-col sm:flex-row gap-6">
            <div className="rounded-xl border border-border p-3 w-fit"><Calendar mode="single" selected={data.date} onSelect={(d: Date | undefined) => update({ date: d })} disabled={(d: Date) => d < new Date(new Date().setHours(0,0,0,0))} /></div>
            <div className="flex-1"><p className="text-sm font-medium mb-2">Available Slots</p><div className="grid grid-cols-1 gap-2">{timeSlots.map((slot) => (<button key={slot} onClick={() => update({ timeSlot: slot })} className={cn("rounded-lg border px-4 py-2.5 text-sm font-medium transition-all text-left", data.timeSlot === slot ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20" : "border-border hover:border-primary/40")}>{slot}</button>))}</div></div>
          </div></div>)}

          {step === 5 && (<div><h2 className="text-xl font-bold mb-1">Confirm & Pay</h2><p className="text-sm text-muted-foreground mb-6">Review your booking details</p><div className="max-w-lg space-y-4">
            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <Row label="Test" value={data.test?.name || ""} /><Row label="Patient" value={`${data.name}, ${data.age}/${data.gender.charAt(0)}`} /><Row label="Phone" value={data.phone} /><Row label="City" value={data.city} /><Row label="Address" value={`${data.address}, ${data.pincode}`} /><Row label="Date" value={data.date?.toLocaleDateString("en-IN", { dateStyle: "long" }) || ""} /><Row label="Time Slot" value={data.timeSlot} />
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Test Price</span><span className="line-through text-muted-foreground">₹{data.test?.originalPrice}</span></div>
              <div className="flex justify-between text-sm mt-1"><span className="text-muted-foreground">Discounted Price</span><span>₹{testPrice}</span></div>
              <div className="flex justify-between text-sm mt-1"><span className="text-muted-foreground">GST (5%)</span><span>₹{gstAmount}</span></div>
              <div className="flex justify-between text-sm mt-1"><span className="text-muted-foreground">Home Collection</span><span className="text-success">Free</span></div>
              <div className="mt-3 border-t border-border pt-3 flex justify-between text-lg font-bold"><span>Total</span><span>₹{totalAmount}</span></div>
            </div>
            <Button onClick={handlePayment} disabled={paying} className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">{paying ? "Processing..." : `Pay ₹${totalAmount}`}</Button>
            <p className="text-xs text-center text-muted-foreground">Secured by Razorpay • 100% Safe & Secure</p>
          </div></div>)}
        </motion.div></AnimatePresence>

        {step < 6 && (<div className="mt-8 flex items-center justify-between">
          <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="gap-1"><ChevronLeft className="h-4 w-4" /> Back</Button>
          {step < 5 && <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext()} className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90">Next <ChevronRight className="h-4 w-4" /></Button>}
        </div>)}
      </div>
      <Footer />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between text-sm"><span className="text-muted-foreground">{label}</span><span className="font-medium text-right max-w-[60%]">{value}</span></div>;
}
