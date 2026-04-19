import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, Menu, X, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpeg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/tests", label: "Tests" },
  { to: "/upload-prescription", label: "Upload Prescription" },
  { to: "/track-order", label: "Track Order" },
  { to: "/reports", label: "Reports" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      <div className="hidden bg-primary text-primary-foreground text-xs sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 sm:px-6">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> +91 6262424248</span>
            <span>support@topdiagnostic.com</span>
          </div>
          <span>NABL Accredited • ISO 15189 Certified</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="TOP DIAGNOSTIC" className="h-14 w-auto" />
          </Link>

          {!isAdmin && (
            <nav className="hidden items-center gap-0.5 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                    location.pathname === link.to
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-2">
            {!isAdmin && (
              <>
                <Link to="/book">
                  <Button size="sm" className="hidden bg-secondary text-secondary-foreground hover:bg-secondary/90 sm:inline-flex">
                    Book Test
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                      3
                    </span>
                  </Button>
                </Link>
              </>
            )}
            <Link to={isAdmin ? "/" : "/login"}>
              <Button variant="outline" size="sm" className="gap-1.5">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{isAdmin ? "Exit Admin" : "Login"}</span>
              </Button>
            </Link>
            {!isAdmin && (
              <Link to="/admin">
                <Button size="sm" className="hidden bg-primary text-primary-foreground hover:bg-primary/90 lg:inline-flex">
                  Admin
                </Button>
              </Link>
            )}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileOpen && !isAdmin && (
          <div className="border-t border-border bg-card px-4 py-3 lg:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/book" className="rounded-lg px-3 py-2.5 text-sm font-medium text-secondary" onClick={() => setMobileOpen(false)}>Book a Test</Link>
              <Link to="/admin" className="rounded-lg px-3 py-2.5 text-sm font-medium text-primary" onClick={() => setMobileOpen(false)}>Admin Panel</Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
