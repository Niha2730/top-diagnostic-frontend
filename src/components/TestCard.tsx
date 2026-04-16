import type { DiagnosticTest } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Clock, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface TestCardProps {
  test: DiagnosticTest;
}

export function TestCard({ test }: TestCardProps) {
  const discount = Math.round(((test.originalPrice - test.price) / test.originalPrice) * 100);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="group relative flex flex-col rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-lg hover:shadow-primary/5">
      {test.popular && <Badge className="absolute -top-2.5 left-4 bg-primary text-primary-foreground">Popular</Badge>}
      <div className="mb-3"><span className="inline-block rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">{test.category}</span></div>
      <h3 className="text-base font-semibold leading-tight text-card-foreground mb-2">{test.name}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{test.description}</p>
      <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{test.turnaround}</span>
        <span className="flex items-center gap-1"><Layers className="h-3.5 w-3.5" />{test.parameters} parameters</span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-card-foreground">₹{test.price}</span>
            <span className="text-sm text-muted-foreground line-through">₹{test.originalPrice}</span>
          </div>
          <span className="text-xs font-medium text-success">{discount}% off</span>
        </div>
        <Link to={`/book?testId=${test.id}`}>
          <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
            <ShoppingCart className="h-3.5 w-3.5" /> Book
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
