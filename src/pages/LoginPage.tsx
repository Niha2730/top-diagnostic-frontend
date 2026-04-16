import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FlaskConical, Phone, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, setupRecaptcha, sendOtp, type ConfirmationResult } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => { const unsub = onAuthStateChanged(auth, (user) => { if (user) setStep("success"); }); return unsub; }, []);
  useEffect(() => { if (timer <= 0) return; const id = setInterval(() => setTimer((t) => t - 1), 1000); return () => clearInterval(id); }, [timer]);

  const handleSendOtp = async () => {
    if (phone.length < 10) { setError("Please enter a valid 10-digit mobile number"); return; }
    setError(""); setLoading(true);
    try { const verifier = setupRecaptcha("recaptcha-container"); const result = await sendOtp(phone, verifier); setConfirmationResult(result); setStep("otp"); setTimer(30); } catch (err: any) { setError(err?.message || "Failed to send OTP."); } finally { setLoading(false); }
  };

  const handleOtpChange = (index: number, value: string) => { if (!/^\d*$/.test(value)) return; const newOtp = [...otp]; newOtp[index] = value.slice(-1); setOtp(newOtp); if (value && index < 5) otpRefs.current[index + 1]?.focus(); };
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => { if (e.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus(); };

  const handleVerifyOtp = async () => {
    const code = otp.join(""); if (code.length !== 6) { setError("Please enter the complete 6-digit OTP"); return; }
    if (!confirmationResult) { setError("Session expired. Please resend OTP."); return; }
    setError(""); setLoading(true);
    try { await confirmationResult.confirm(code); setStep("success"); } catch { setError("Invalid OTP."); } finally { setLoading(false); }
  };

  const handleResend = async () => {
    if (timer > 0) return; setOtp(["", "", "", "", "", ""]); setError(""); setLoading(true);
    try { const verifier = setupRecaptcha("recaptcha-container"); const result = await sendOtp(phone, verifier); setConfirmationResult(result); setTimer(30); } catch (err: any) { setError(err?.message || "Failed to resend OTP."); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary mb-3"><FlaskConical className="h-6 w-6 text-primary-foreground" /></div>
              <AnimatePresence mode="wait">
                {step === "phone" && <motion.div key="ph" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><h1 className="text-2xl font-bold">Welcome to TOP DIAGNOSTIC</h1><p className="mt-1 text-sm text-muted-foreground">Enter your mobile number to login</p></motion.div>}
                {step === "otp" && <motion.div key="ot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><h1 className="text-2xl font-bold">Verify OTP</h1><p className="mt-1 text-sm text-muted-foreground">Enter the 6-digit code sent to +91 {phone}</p></motion.div>}
                {step === "success" && <motion.div key="su" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><h1 className="text-2xl font-bold">Login Successful!</h1><p className="mt-1 text-sm text-muted-foreground">You're now logged in</p></motion.div>}
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              {step === "phone" && (
                <motion.div key="phone-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div><Label htmlFor="phone">Mobile Number</Label><div className="relative mt-1.5"><div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-sm text-muted-foreground"><Phone className="h-4 w-4" /><span>+91</span></div><Input id="phone" type="tel" placeholder="98765 43210" value={phone} onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setError(""); }} className="pl-[4.5rem]" maxLength={10} /></div></div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button className="w-full bg-primary text-primary-foreground" size="lg" onClick={handleSendOtp} disabled={loading || phone.length !== 10}>{loading ? <><Loader2 className="h-4 w-4 animate-spin" />Sending OTP...</> : "Send OTP"}</Button>
                  <p className="text-center text-xs text-muted-foreground">By continuing, you agree to our Terms of Service</p>
                </motion.div>
              )}
              {step === "otp" && (
                <motion.div key="otp-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                  <div className="flex justify-center gap-2">{otp.map((digit, i) => (<input key={i} ref={(el) => { otpRefs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={(e) => handleOtpChange(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(i, e)} className="h-12 w-12 rounded-lg border border-input bg-transparent text-center text-lg font-semibold shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring" autoFocus={i === 0} />))}</div>
                  {error && <p className="text-center text-sm text-destructive">{error}</p>}
                  <Button className="w-full bg-primary text-primary-foreground" size="lg" onClick={handleVerifyOtp} disabled={loading || otp.join("").length !== 6}>{loading ? <><Loader2 className="h-4 w-4 animate-spin" />Verifying...</> : "Verify & Login"}</Button>
                  <div className="flex items-center justify-between">
                    <button onClick={() => { setStep("phone"); setOtp(["", "", "", "", "", ""]); setError(""); }} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" />Change number</button>
                    <button onClick={handleResend} disabled={timer > 0} className={`text-sm font-medium ${timer > 0 ? "text-muted-foreground" : "text-primary hover:underline"}`}>{timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}</button>
                  </div>
                </motion.div>
              )}
              {step === "success" && (
                <motion.div key="success-step" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20"><CheckCircle2 className="h-8 w-8 text-success" /></div>
                  <p className="text-sm text-muted-foreground">Redirecting you to home page...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div id="recaptcha-container" />
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
