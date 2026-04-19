import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Building2,
  Landmark,
  GitBranch,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import logo from "@/assets/logo.jpeg";

const officeAddress =
  "Opposite Shagun Hotel, Peer Gate, Bhopal, Madhya Pradesh, India, 462001";

const operatingLocations = "Bhopal, Nagpur, Jabalpur, Raipur & Indore";

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="TOP DIAGNOSTIC" className="h-20 w-auto rounded-lg" />
            </div>
            <p className="text-sm text-card/70 leading-relaxed">
              NABL accredited diagnostic laboratory providing accurate and affordable health testing services with home sample collection across India.
            </p>
            <p className="mt-3 text-xs font-medium text-secondary italic">"The Path Of Your Health"</p>
            <div className="mt-4 flex items-center gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-card/10 text-card/70 hover:bg-secondary hover:text-secondary-foreground transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-card">Quick Links</h3>
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-sm text-card/70 hover:text-secondary transition-colors">Home</Link>
              <Link to="/tests" className="text-sm text-card/70 hover:text-secondary transition-colors">All Tests</Link>
              <Link to="/upload-prescription" className="text-sm text-card/70 hover:text-secondary transition-colors">Upload Prescription</Link>
              <Link to="/track-order" className="text-sm text-card/70 hover:text-secondary transition-colors">Track Order</Link>
              <Link to="/reports" className="text-sm text-card/70 hover:text-secondary transition-colors">Download Reports</Link>
              <Link to="/book" className="text-sm text-card/70 hover:text-secondary transition-colors">Book a Test</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-card">Our Services</h3>
            <div className="flex flex-col gap-2.5">
              {["Blood Tests", "Full Body Checkup", "Diabetes Care", "Heart Health Panel", "Women's Health", "Home Sample Collection"].map(s => (
                <span key={s} className="text-sm text-card/70">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-card">Contact Us</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5 text-sm text-card/70">
                <Phone className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                <span>+91 6262424248</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-card/70">
                <Mail className="h-4 w-4 text-secondary shrink-0" />
                <span>support@topdiagnostic.com</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-card/70">
                <MapPin className="h-4 w-4 text-secondary shrink-0 mt-0.5" aria-hidden />
                <div className="flex min-w-0 flex-col gap-2.5">
                  <div className="flex items-start gap-2">
                    <Building2 className="h-3.5 w-3.5 text-secondary shrink-0 mt-0.5" aria-hidden />
                    <div>
                      <p className="font-medium text-card">Corporate Office</p>
                      <p className="mt-0.5">{officeAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Landmark className="h-3.5 w-3.5 text-secondary shrink-0 mt-0.5" aria-hidden />
                    <div>
                      <p className="font-medium text-card">Registered Office</p>
                      <p className="mt-0.5">{officeAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-card/70">
                <GitBranch className="h-4 w-4 text-secondary shrink-0 mt-0.5" aria-hidden />
                <div>
                  <p className="font-medium text-card">Operating In</p>
                  <p className="mt-0.5">{operatingLocations}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-card/70">
                <Clock className="h-4 w-4 text-secondary shrink-0" />
                <span>Mon - Sun: 6 AM - 10 PM</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-card/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-card/50">
          <span>© 2026 TOP DIAGNOSTIC. All rights reserved.</span>
          <span>NABL Accredited • ISO 15189 Certified • ICMR Approved</span>
        </div>
      </div>
    </footer>
  );
}
