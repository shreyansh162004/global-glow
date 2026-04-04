import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Step = "lang" | "budget" | "usage" | "brand" | "done";

interface ChatMessage {
  from: "bot" | "user";
  text: string;
}

const budgets = [
  { label: "₹20,000 – ₹40,000", min: 20000, max: 40000 },
  { label: "₹40,000 – ₹70,000", min: 40000, max: 70000 },
  { label: "₹70,000 – ₹1,00,000", min: 70000, max: 100000 },
  { label: "₹1,00,000+", min: 100000, max: 999999 },
];

const usages = ["Gaming", "Study", "Office", "Editing"];
const brandsList = ["HP", "Dell", "Lenovo", "Apple", "Asus", "Acer", "MSI", "Any"];

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("lang");
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: "bot", text: "👋 Hi! I'll help you find the perfect laptop. Choose your language:" },
  ]);
  const [selectedBudget, setSelectedBudget] = useState<typeof budgets[0] | null>(null);
  const navigate = useNavigate();

  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);

  const addMsg = (from: "bot" | "user", text: string) =>
    setMessages((prev) => [...prev, { from, text }]);

  const chooseLang = (l: "en" | "hi") => {
    setLang(l);
    addMsg("user", l === "en" ? "English" : "हिंदी");
    setTimeout(() => {
      addMsg("bot", l === "en" ? "Great! What's your budget range?" : "बढ़िया! आपका बजट क्या है?");
      setStep("budget");
    }, 300);
  };

  const chooseBudget = (b: typeof budgets[0]) => {
    setSelectedBudget(b);
    addMsg("user", b.label);
    setTimeout(() => {
      addMsg("bot", t("What will you use it for?", "आप इसे किसलिए इस्तेमाल करेंगे?"));
      setStep("usage");
    }, 300);
  };

  const chooseUsage = (u: string) => {
    addMsg("user", u);
    setTimeout(() => {
      addMsg("bot", t("Any brand preference?", "कोई ब्रांड पसंद?"));
      setStep("brand");
    }, 300);
  };

  const chooseBrand = (brand: string) => {
    addMsg("user", brand);
    setTimeout(() => {
      addMsg("bot", t("Perfect! Let me find the best options for you! 🚀", "बढ़िया! आपके लिए बेस्ट ऑप्शन ढूंढता हूँ! 🚀"));
      setStep("done");
      setTimeout(() => {
        const params = new URLSearchParams();
        if (selectedBudget) {
          params.set("minPrice", selectedBudget.min.toString());
          params.set("maxPrice", selectedBudget.max.toString());
        }
        if (brand !== "Any") params.set("brand", brand);
        navigate(`/products?${params.toString()}`);
        setOpen(false);
      }, 1000);
    }, 300);
  };

  const reset = () => {
    setStep("lang");
    setMessages([{ from: "bot", text: "👋 Hi! I'll help you find the perfect laptop. Choose your language:" }]);
    setSelectedBudget(null);
  };

  return (
    <>
      {/* Floating button with robot */}
      <motion.button
        onClick={() => { setOpen(true); reset(); }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-3 rounded-full bg-primary text-primary-foreground font-bold shadow-lg animate-glow-pulse group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Robot emoji with waving hand */}
        <span className="text-2xl">🤖</span>
        <span className="hidden sm:flex items-center gap-1 text-sm">
          Find your perfect laptop
          <span className="inline-block origin-bottom-right animate-wave text-lg">👋</span>
        </span>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[340px] max-h-[480px] rounded-2xl overflow-hidden border border-border bg-card shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <div>
                  <p className="font-heading font-bold text-sm">Global Enterprises</p>
                  <p className="text-xs opacity-80">Laptop Assistant</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-primary-foreground/20 rounded-full transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                      msg.from === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary text-secondary-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Options */}
            <div className="p-3 border-t border-border space-y-2">
              {step === "lang" && (
                <div className="flex gap-2">
                  <OptionBtn label="English" onClick={() => chooseLang("en")} />
                  <OptionBtn label="हिंदी" onClick={() => chooseLang("hi")} />
                </div>
              )}
              {step === "budget" && (
                <div className="grid grid-cols-2 gap-2">
                  {budgets.map((b) => (
                    <OptionBtn key={b.label} label={b.label} onClick={() => chooseBudget(b)} />
                  ))}
                </div>
              )}
              {step === "usage" && (
                <div className="grid grid-cols-2 gap-2">
                  {usages.map((u) => (
                    <OptionBtn key={u} label={u} onClick={() => chooseUsage(u)} />
                  ))}
                </div>
              )}
              {step === "brand" && (
                <div className="grid grid-cols-4 gap-1.5">
                  {brandsList.map((b) => (
                    <OptionBtn key={b} label={b} onClick={() => chooseBrand(b)} small />
                  ))}
                </div>
              )}
              {step === "done" && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="w-4 h-4 animate-pulse" />
                  <span>{t("Redirecting...", "रीडायरेक्ट हो रहा है...")}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

function OptionBtn({ label, onClick, small }: { label: string; onClick: () => void; small?: boolean }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`rounded-lg border border-border bg-secondary hover:bg-primary/10 hover:border-primary/30 transition-all text-center font-medium ${
        small ? "px-2 py-1.5 text-xs" : "px-3 py-2 text-sm"
      }`}
    >
      {label}
    </motion.button>
  );
}

export default Chatbot;
