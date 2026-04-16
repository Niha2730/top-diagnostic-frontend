import { Link } from "react-router-dom";
import { Search, Shield, ChevronRight, Star, Droplets, HeartPulse, Microscope, Home as HomeIcon, FileText, Package, Award, Users, Zap, MapPin, ArrowRight, Download, Smartphone, FlaskConical, Scan, Dna, TestTubes, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TestCard } from "@/components/TestCard";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { diagnosticTests } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function HomePage() {
  const [search, setSearch] = useState("");
  const popularTests = diagnosticTests.filter((t) => t.popular);
  const filteredPopular = search ? diagnosticTests.filter((t) => t.name.toLowerCase().includes(search.toLowerCase())) : popularTests;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Star className="h-4 w-4 fill-primary" /> Trusted by 50,000+ patients
              </div>
              <h1 className="text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Book Diagnostic Tests & <span className="text-primary">Health Checkups</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed sm:text-xl">
                Accurate reports, home sample collection, and fast results — all from the comfort of your home.
              </p>
              <div className="mt-8 flex max-w-lg items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search tests (e.g., Blood Test, Full Body Checkup)" className="h-12 pl-10 bg-card" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/book"><Button size="lg" className="h-12 bg-primary text-primary-foreground hover:bg-primary/90 gap-2">Book a Test <ArrowRight className="h-4 w-4" /></Button></Link>
                <Link to="/tests"><Button size="lg" variant="outline" className="h-12 gap-2">Explore Packages <Package className="h-4 w-4" /></Button></Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full">
                  {[{ icon: Microscope, label: "Lab Tests", color: "bg-primary/10 text-primary" }, { icon: HomeIcon, label: "Home Collection", color: "bg-secondary/10 text-secondary" }, { icon: FileText, label: "Smart Reports", color: "bg-info/10 text-info" }, { icon: Shield, label: "NABL Certified", color: "bg-success/10 text-success" }].map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-2 rounded-2xl bg-card p-5 shadow-sm">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}><item.icon className="h-6 w-6" /></div>
                      <span className="text-xs font-medium text-center">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12"><h2 className="text-2xl font-bold sm:text-3xl">Our Services</h2><p className="mt-2 text-muted-foreground">Comprehensive diagnostic solutions for your health needs</p></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[{ icon: Droplets, title: "Blood Tests", desc: "CBC, Sugar, Thyroid & more" }, { icon: HeartPulse, title: "Full Body Checkups", desc: "70+ parameters covered" }, { icon: Microscope, title: "Specialized Tests", desc: "Advanced diagnostics" }, { icon: HomeIcon, title: "Home Collection", desc: "Free sample pickup" }, { icon: FileText, title: "Smart Reports", desc: "Easy-to-read digital reports" }, { icon: Package, title: "Health Packages", desc: "Curated wellness plans" }].map((s) => (
              <div key={s.title} className="flex flex-col items-center text-center rounded-2xl border border-border p-5 hover:shadow-md hover:border-primary/30 transition-all group">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors mb-3"><s.icon className="h-6 w-6 text-primary" /></div>
                <h3 className="text-sm font-semibold">{s.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12"><h2 className="text-2xl font-bold sm:text-3xl">Why Choose TOP DIAGNOSTIC?</h2><p className="mt-2 text-muted-foreground">We set the standard in diagnostic excellence</p></div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {[{ icon: Award, title: "Accurate Reports", desc: "99.9% accuracy with state-of-the-art equipment" }, { icon: Shield, title: "Certified Labs", desc: "NABL accredited and ISO 15189 certified" }, { icon: Users, title: "Expert Doctors", desc: "Reports verified by experienced pathologists" }, { icon: Zap, title: "Fast Turnaround", desc: "Most reports within 6-24 hours" }, { icon: MapPin, title: "Wide Network", desc: "Present across 50+ cities" }, { icon: Star, title: "Affordable Pricing", desc: "Up to 60% off on tests" }].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10"><item.icon className="h-5 w-5 text-secondary" /></div>
                <div><h3 className="font-semibold text-sm">{item.title}</h3><p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR TESTS */}
      <section className="py-16 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">{search ? "Search Results" : "Popular Tests"}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{search ? `${filteredPopular.length} tests found` : "Most booked tests by our patients"}</p>
            </div>
            <Link to="/tests" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex">View All <ChevronRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPopular.slice(0, 6).map((test) => <TestCard key={test.id} test={test} />)}
          </div>
          {filteredPopular.length === 0 && <div className="py-12 text-center text-muted-foreground">No tests found matching "{search}"</div>}
        </div>
      </section>

      {/* HEALTH PACKAGES */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12"><h2 className="text-2xl font-bold sm:text-3xl">Health Packages</h2><p className="mt-2 text-muted-foreground">Comprehensive checkup packages tailored for your wellness</p></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[{ name: "Basic Health Checkup", tests: "CBC, Sugar, Thyroid, Lipid Profile, Urine Routine", count: 45, price: 999, originalPrice: 2500 }, { name: "Full Body Checkup", tests: "70+ parameters covering all major organs", count: 72, price: 1999, originalPrice: 4500 }, { name: "Women's Wellness", tests: "Thyroid, Iron, Vitamin D, B12, CBC, HbA1c", count: 55, price: 1499, originalPrice: 3500 }].map((pkg) => (
              <div key={pkg.name} className="rounded-2xl border border-border bg-card p-6 flex flex-col hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="flex items-center gap-2 mb-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"><Package className="h-5 w-5 text-primary" /></div><h3 className="font-bold">{pkg.name}</h3></div>
                <p className="text-sm text-muted-foreground flex-1">{pkg.tests}</p>
                <div className="mt-3 text-xs text-muted-foreground">{pkg.count} Tests Included</div>
                <div className="mt-4 flex items-center justify-between">
                  <div><span className="text-xl font-bold">₹{pkg.price}</span><span className="ml-2 text-sm text-muted-foreground line-through">₹{pkg.originalPrice}</span></div>
                  <Link to="/book"><Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Book Now</Button></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEST CATEGORIES */}
      <section className="py-16 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12"><h2 className="text-2xl font-bold sm:text-3xl">Test Categories</h2><p className="mt-2 text-muted-foreground">Browse tests by category</p></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[{ icon: FlaskConical, label: "Pathology", count: "120+ tests" }, { icon: Scan, label: "Radiology", count: "40+ tests" }, { icon: Dna, label: "Molecular", count: "30+ tests" }, { icon: TestTubes, label: "Routine Tests", count: "80+ tests" }, { icon: Activity, label: "Advanced Tests", count: "50+ tests" }].map((cat) => (
              <Link key={cat.label} to="/tests" className="flex flex-col items-center gap-3 rounded-2xl border border-border p-6 text-center hover:shadow-md hover:border-primary/30 transition-all group">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent group-hover:bg-primary/10 transition-colors"><cat.icon className="h-7 w-7 text-primary" /></div>
                <div><h3 className="font-semibold text-sm">{cat.label}</h3><p className="text-xs text-muted-foreground mt-0.5">{cat.count}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-gradient-to-b from-background to-accent/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12"><h2 className="text-2xl font-bold sm:text-3xl">How It Works</h2><p className="mt-2 text-muted-foreground">Simple 4-step process to get tested</p></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[{ step: "01", icon: Search, title: "Book Test", desc: "Search and select your test online" }, { step: "02", icon: HomeIcon, title: "Sample Collection", desc: "Our phlebotomist visits your home" }, { step: "03", icon: Microscope, title: "Lab Processing", desc: "Samples processed at NABL certified labs" }, { step: "04", icon: FileText, title: "Get Reports", desc: "Download digital reports online" }].map((item) => (
              <div key={item.step} className="relative flex flex-col items-center text-center">
                <div className="mb-4 relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg"><item.icon className="h-7 w-7" /></div>
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-bold">{item.step}</span>
                </div>
                <h3 className="font-bold text-sm">{item.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-16 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">About TOP DIAGNOSTIC</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">TOP DIAGNOSTIC is a trusted diagnostic provider with advanced labs and an expert team. We deliver accurate, affordable, and timely diagnostic services across India.</p>
              <p className="mt-3 text-muted-foreground leading-relaxed">With 200+ collection centers in 50+ cities, NABL accreditation, and ISO 15189 certification, we ensure every report meets the highest quality standards.</p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[{ value: "50K+", label: "Happy Patients" }, { value: "200+", label: "Collection Centers" }, { value: "500+", label: "Tests Available" }].map((stat) => (
                  <div key={stat.label} className="text-center rounded-xl border border-border p-3"><div className="text-xl font-bold text-primary">{stat.value}</div><div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div></div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8 w-full max-w-sm aspect-square flex flex-col items-center justify-center gap-4">
                <Shield className="h-16 w-16 text-primary" /><div className="text-center"><p className="font-bold text-lg">NABL Accredited</p><p className="text-sm text-muted-foreground">ISO 15189 Certified Lab</p><p className="text-sm text-muted-foreground mt-1">ICMR Approved</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12"><h2 className="text-2xl font-bold sm:text-3xl">Health Articles & Tips</h2><p className="mt-2 text-muted-foreground">Stay informed about your health</p></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[{ title: "Why Regular Blood Tests Are Important", desc: "Understanding the significance of routine blood work in preventive healthcare.", category: "Preventive Care" }, { title: "Complete Guide to Thyroid Testing", desc: "Learn about T3, T4, TSH tests and how to interpret results.", category: "Endocrinology" }, { title: "Diabetes: Early Signs & Tests You Need", desc: "Recognize early warning signs of diabetes and the right diagnostic tests.", category: "Diabetes" }].map((article) => (
              <div key={article.title} className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow group">
                <div className="h-40 bg-gradient-to-br from-primary/10 to-accent/30 flex items-center justify-center"><FileText className="h-12 w-12 text-primary/40" /></div>
                <div className="p-5">
                  <span className="text-xs font-medium text-secondary">{article.category}</span>
                  <h3 className="font-bold text-sm mt-1 group-hover:text-primary transition-colors">{article.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{article.desc}</p>
                  <button className="mt-3 text-xs font-medium text-primary flex items-center gap-1 hover:underline">Read More <ArrowRight className="h-3 w-3" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOAD REPORT CTA */}
      <section className="py-16 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">Download Your Reports</h2>
              <p className="mt-2 text-primary-foreground/80">Enter your mobile number or booking ID to download your test reports.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1"><Smartphone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Enter mobile number or booking ID" className="h-12 pl-10 bg-card" /></div>
              <Link to="/reports"><Button size="lg" className="h-12 bg-card text-primary hover:bg-card/90 gap-2 whitespace-nowrap"><Download className="h-4 w-4" /> Download Report</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* UPLOAD PRESCRIPTION CTA */}
      <section className="py-12 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-secondary-foreground sm:text-3xl">Have a Prescription?</h2>
          <p className="mt-2 text-secondary-foreground/80">Upload your prescription and we'll book the tests for you.</p>
          <Link to="/upload-prescription"><Button size="lg" className="mt-6 bg-card text-secondary hover:bg-card/90">Upload Prescription</Button></Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
