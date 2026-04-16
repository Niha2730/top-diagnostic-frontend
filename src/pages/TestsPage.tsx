import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TestCard } from "@/components/TestCard";
import { diagnosticTests, categories } from "@/lib/mock-data";
import { Search } from "lucide-react";

export default function TestsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = diagnosticTests.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || t.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-bold">All Diagnostic Tests</h1>
        <p className="mt-1 text-muted-foreground">Browse from our comprehensive test catalog</p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search tests..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${category === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`}>{cat}</button>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((test) => <TestCard key={test.id} test={test} />)}
        </div>
        {filtered.length === 0 && <div className="py-16 text-center text-muted-foreground">No tests found</div>}
      </div>
      <Footer />
    </div>
  );
}
