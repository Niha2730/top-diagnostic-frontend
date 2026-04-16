import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { diagnosticTests } from "@/lib/mock-data";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CartPage() {
  const [items, setItems] = useState(diagnosticTests.slice(0, 3).map((t) => ({ ...t, quantity: 1 })));
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = items.reduce((sum, i) => sum + (i.originalPrice - i.price) * i.quantity, 0);
  const updateQty = (id: string, delta: number) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)));
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <p className="mt-1 text-muted-foreground">{items.length} test(s) in cart</p>
        {items.length === 0 ? (
          <div className="flex flex-col items-center py-20">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
            <Link to="/tests"><Button className="mt-4 bg-primary text-primary-foreground">Browse Tests</Button></Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-3">
              {items.map((item) => (
                <motion.div key={item.id} layout className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.category} • {item.turnaround}</p>
                    <div className="mt-1 flex items-center gap-2"><span className="font-bold">₹{item.price}</span><span className="text-xs text-muted-foreground line-through">₹{item.originalPrice}</span></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, -1)} className="flex h-7 w-7 items-center justify-center rounded-md border border-border hover:bg-muted"><Minus className="h-3 w-3" /></button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="flex h-7 w-7 items-center justify-center rounded-md border border-border hover:bg-muted"><Plus className="h-3 w-3" /></button>
                  </div>
                  <button onClick={() => remove(item.id)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                </motion.div>
              ))}
            </div>
            <div className="rounded-xl border border-border bg-card p-6 h-fit">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal + discount}</span></div>
                <div className="flex justify-between text-success"><span>Discount</span><span>-₹{discount}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Home Collection</span><span className="text-success">Free</span></div>
                <div className="my-3 border-t border-border" />
                <div className="flex justify-between text-lg font-bold"><span>Total</span><span>₹{subtotal}</span></div>
              </div>
              <Button className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">Proceed to Checkout</Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
