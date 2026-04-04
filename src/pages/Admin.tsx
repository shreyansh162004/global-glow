import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getProducts, saveProducts, Product, brands, categories } from "@/data/products";
import { Pencil, Trash2, Plus, LogIn, LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ADMIN_USER = "admin";
const ADMIN_PASS = "global2024";

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("ge-admin-auth");
    if (auth === "true") {
      setAuthenticated(true);
      setProducts(getProducts());
    }
  }, []);

  const handleLogin = () => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setAuthenticated(true);
      localStorage.setItem("ge-admin-auth", "true");
      setProducts(getProducts());
    } else {
      toast({ title: "Invalid credentials", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("ge-admin-auth");
  };

  const handleDelete = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
    setProducts(updated);
    toast({ title: "Product deleted" });
  };

  const handleSave = (product: Product) => {
    let updated: Product[];
    if (editing) {
      updated = products.map((p) => (p.id === product.id ? product : p));
    } else {
      product.id = Date.now().toString();
      updated = [...products, product];
    }
    saveProducts(updated);
    setProducts(updated);
    setShowForm(false);
    setEditing(null);
    toast({ title: editing ? "Product updated" : "Product added" });
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-heading font-bold text-center">Admin Login</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:border-primary"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:border-primary"
          />
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-bold"
          >
            <LogIn className="w-4 h-4" /> Login
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-heading font-bold">Admin Dashboard</h1>
          <div className="flex gap-3">
            <button
              onClick={() => { setEditing(null); setShowForm(true); }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-sm">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {showForm && (
          <ProductForm
            product={editing}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        )}

        <div className="space-y-3">
          {products.map((p) => (
            <motion.div key={p.id} layout className="glass-card p-4 flex items-center gap-4">
              <img src={p.images[0]} alt={p.name} className="w-16 h-12 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.brand} • ₹{p.price.toLocaleString("en-IN")}</p>
              </div>
              <button
                onClick={() => { setEditing(p); setShowForm(true); }}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="p-2 hover:bg-destructive/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product: Product | null;
  onSave: (p: Product) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Product>(
    product || {
      id: "",
      name: "",
      price: 0,
      brand: brands[0],
      category: categories[0],
      specs: "",
      description: "",
      images: [""],
      featured: false,
    }
  );

  const update = (key: keyof Product, value: any) => setForm({ ...form, [key]: value });

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-8 space-y-4">
      <h2 className="text-lg font-heading font-bold">{product ? "Edit" : "Add"} Product</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input placeholder="Product Name" value={form.name} onChange={(e) => update("name", e.target.value)} className="px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:border-primary" />
        <input placeholder="Price" type="number" value={form.price || ""} onChange={(e) => update("price", Number(e.target.value))} className="px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:border-primary" />
        <select value={form.brand} onChange={(e) => update("brand", e.target.value)} className="px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:border-primary">
          {brands.map((b) => <option key={b} value={b}>{b}</option>)}
          <option value="Other">Other</option>
        </select>
        <select value={form.category} onChange={(e) => update("category", e.target.value)} className="px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:border-primary">
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input placeholder="Image URL" value={form.images[0]} onChange={(e) => update("images", [e.target.value])} className="md:col-span-2 px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:border-primary" />
        <input placeholder="Specs (brief)" value={form.specs} onChange={(e) => update("specs", e.target.value)} className="md:col-span-2 px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:border-primary" />
        <textarea placeholder="Description" value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} className="md:col-span-2 px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:border-primary resize-none" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} className="rounded" />
          Featured Product
        </label>
      </div>
      <div className="flex gap-3">
        <button onClick={() => onSave(form)} className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm">Save</button>
        <button onClick={onCancel} className="px-6 py-2 rounded-lg bg-secondary text-sm">Cancel</button>
      </div>
    </motion.div>
  );
}

export default Admin;
