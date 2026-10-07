import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useTransform, useInView, useMotionValue, animate as fmAnimate, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Leaf, Award, ShieldCheck, Sparkles, ArrowRight, ArrowUp, X, Search,
  Package, Coffee, UtensilsCrossed, Boxes, ChefHat, Recycle, BadgeCheck, Star,
} from "lucide-react";

import logo from "@/assets/vy-logo.jpg";
import award from "@/assets/img/vy.jpg";
import paakkuPack from "@/assets/img/vy_pack_1.jpg";
import paakkuPackB from "@/assets/img/vyb_pack.jpg";
import paakkuTray from "@/assets/img/15.webp";
import paakkuBowl from "@/assets/img/9.webp";
import paakkuPlate from "@/assets/img/8.webp";
import silverPlates from "@/assets/img/6.webp";
import diningRoll from "@/assets/img/5.webp";
import paperCupPrinted from "@/assets/img/4.webp";
import paperCupSonic from "@/assets/img/2.webp";

// Portable public paths are packaged by every deployment target.
const posterPaakkuPlate = "/images/products/paakku-areca-plates-v10.webp";
const posterPaakkuCup = "/images/products/paakku-cups-v10.webp";
const posterPaperPlate = "/images/products/paper-plates-v10.webp";
const posterPaperCup = "/images/products/paper-cups-v10.webp";
const posterYellowTea = "/images/products/yellow-tea-cups-v10.webp";
const posterFoodContainer = "/images/products/paakku-food-containers-v10.webp";
const posterDiningRoll = "/images/products/dining-rolls-v10.webp";
import posterSnacksContainer from "@/assets/img/snacks-container-v3.jpg";
import posterCirclePlate from "@/assets/img/circle-plate-v3.webp";
import nBambooPlate from "@/assets/img/n-bamboo-compartment-plate.webp";
import nArecaBowlSet from "@/assets/img/n-areca-bowl-plate-set.webp";
import nSilverPlates from "@/assets/img/n-silver-paper-plate-sizes.webp";
import nFloralTub from "@/assets/img/n-floral-paper-tub.webp";
import nCoffeeCup from "@/assets/img/n-coffee-paper-cup.webp";
import nFoodContainerPack from "@/assets/img/n-paakku-food-container-pack.jpg";
import nKraftRoll from "@/assets/img/n-kraft-dining-roll.webp";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Areca Plates, Paper Cups & Food Containers | VY Enterprises" },
      { name: "description", content: "Product collection from VY Enterprises Trichy — areca plates, areca cups, paper plates, paper cups, food containers & dining rolls. Areca plate manufacturer & supplier for wholesale and custom branding." },
      { name: "keywords", content: "areca plate manufacturer, areca plate supplier, areca cups, paper plates, paper cups, food containers, dining rolls, eco-friendly disposable products, VY Enterprises Trichy" },
      { property: "og:title", content: "Areca Plates, Paper Cups & Food Containers | VY Enterprises" },
      { property: "og:description", content: "Premium eco-friendly disposables: areca plates & cups, paper plates & cups, food containers and dining rolls. Wholesale & custom branding from Trichy." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vyenterprises.in/products" },
      { property: "og:image", content: `https://vyenterprises.in${award}` },
      { name: "twitter:title", content: "Areca Plates, Paper Cups & Food Containers | VY Enterprises" },
      { name: "twitter:description", content: "Premium eco-friendly disposables from VY Enterprises, Trichy — wholesale & custom branding." },
      { name: "twitter:image", content: `https://vyenterprises.in${award}` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://vyenterprises.in/products" }],

    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "VY Enterprises Eco-Friendly Disposables",
          itemListElement: [
            "Paakku (Areca) Plates",
            "Paakku Cups",
            "Paper Plates",
            "Paper Cups",
            "Yellow Tea Cups",
            "Paakku Food Containers",
            "Dining Rolls",
            "Paakku Snacks Container",
            "Paakku Circle Plates",
          ].map((name, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name,
              category: "Eco-friendly disposable tableware",
              material: "Biodegradable areca leaf / paper",
              brand: { "@type": "Brand", name: "VY Enterprises" },
            },
          })),
        }),
      },
    ],
  }),

  component: ProductsPage,
});

/* ---------- Product data ---------- */

type Category =
  | "Paakku Plates"
  | "Paakku Cups"
  | "Paper Plates"
  | "Paper Cups"
  | "Yellow Tea Cups"
  | "Food Containers"
  | "Table Service"
  | "Dining Rolls"
  | "Tiffin Boxes"
  | "Paakku Snacks Container"
  | "Paakku Circle Plates";

type Product = {
  id: string;
  title: string;
  desc: string;
  category: Category;
  image: string;
  tag?: string;
  poster?: boolean;
};

const products: Product[] = [
  { id: "poster-paakku-plate", title: "Paakku (Areca) Compartment Plate", desc: "Featured poster — natural areca palm-leaf 3-compartment plate.", category: "Paakku Plates", image: posterPaakkuPlate, tag: "New Arrival", poster: true },
  { id: "paakku-round-plate", title: "Paakku Round Plate", desc: "Natural areca palm-leaf round plate — sturdy, food-safe, biodegradable.", category: "Paakku Plates", image: paakkuPlate, tag: "Best Seller" },
  { id: "paakku-compartment-tray", title: "Paakku 4-Compartment Tray", desc: "Meal tray with four sections — perfect for thali & catering.", category: "Paakku Plates", image: paakkuTray, tag: "Catering" },

  { id: "poster-paakku-cup", title: "Paakku Areca Cups & Bowls", desc: "Featured poster — round areca palm-leaf cups and bowls.", category: "Paakku Cups", image: posterPaakkuCup, tag: "New Arrival", poster: true },
  { id: "paakku-bowl-set", title: "Paakku Bowl Set", desc: "Round areca bowls for curries, desserts and starters.", category: "Paakku Cups", image: paakkuBowl },

  { id: "poster-paper-plate", title: "Silver Paper Plates — Full Range", desc: "Featured poster — silver paper plates in sizes 6 to 12.", category: "Paper Plates", image: posterPaperPlate, tag: "New Arrival", poster: true },
  { id: "silver-paper-plates", title: "Silver Paper Plates — Sizes 6 to 12", desc: "Premium silver-coated paper plates in five sizes.", category: "Paper Plates", image: silverPlates, tag: "Multi-size" },

  { id: "poster-paper-cup", title: "Printed Paper Cup — Floral", desc: "Featured poster — soya-ink printed floral paper cup.", category: "Paper Cups", image: posterPaperCup, tag: "New Arrival", poster: true },
  { id: "paper-cup-printed", title: "Printed Paper Cup — Soya Ink", desc: "Elegant floral print paper cup printed with soya-based ink.", category: "Paper Cups", image: paperCupPrinted },
  { id: "paper-cup-character", title: "Character Print Paper Cup", desc: "Fun character-printed paper cup for parties & events.", category: "Paper Cups", image: paperCupSonic },

  { id: "poster-yellow-tea", title: "Yellow Tea Cup — Coffee Print", desc: "Featured poster — food-grade paper cup with coffee print.", category: "Yellow Tea Cups", image: posterYellowTea, tag: "New Arrival", poster: true },
  { id: "yellow-tea-cup", title: "Yellow Tea Cup — Plain", desc: "Warm yellow-tinted paper tea cup, food-grade and compostable.", category: "Yellow Tea Cups", image: paperCupPrinted },

  { id: "poster-food-container", title: "Paakku Food Container — Meal Ready", desc: "Featured poster — natural areca palm-leaf food container.", category: "Food Containers", image: posterFoodContainer, tag: "New Arrival", poster: true },
  { id: "paakku-container-a", title: "Paakku Food Container — Meal Box", desc: "Leak & heat resistant areca meal container with lid.", category: "Food Containers", image: paakkuPack, tag: "Hot & Cold" },
  { id: "paakku-container-b", title: "Paakku Assorted Pack — Plates & Bowls", desc: "Retail-ready assorted pack of areca plates, bowls & trays.", category: "Food Containers", image: paakkuPackB, tag: "Retail Pack" },

  { id: "poster-dining-roll", title: "Dining Roll — Kraft Poster", desc: "Featured poster — multi-layer kraft dining roll.", category: "Dining Rolls", image: posterDiningRoll, tag: "New Arrival", poster: true },
  { id: "dining-roll", title: "Dining Roll — Kraft Paper", desc: "Multi-layer kraft dining roll for hygienic table service.", category: "Dining Rolls", image: diningRoll },

  { id: "table-service-kit", title: "Clean & Practical Table Service Kit", desc: "Curated table service kit for restaurants and events.", category: "Table Service", image: paakkuPackB },
  { id: "tiffin-box", title: "Areca Tiffin Box Container", desc: "Compartment tiffin box crafted from areca palm-leaf.", category: "Tiffin Boxes", image: paakkuTray },

  { id: "paakku-snacks-container", title: "Paakku Snacks Container", desc: "Areca palm-leaf snacks container — retail pack with premium branding, ideal for takeaway snacks & catering.", category: "Paakku Snacks Container", image: posterSnacksContainer, tag: "New Arrival", poster: true },
  { id: "paakku-circle-plates", title: "Paakku Circle Plates", desc: "Round bamboo/areca circle plate with 3 compartments — elegant and 100% natural.", category: "Paakku Circle Plates", image: posterCirclePlate, tag: "New Arrival", poster: true },

  { id: "n-bamboo-compartment-plate", title: "Paakku 3-Compartment Round Plate", desc: "Natural areca palm-leaf round plate with three neat compartments — ideal for meals and thali service.", category: "Paakku Circle Plates", image: nBambooPlate, tag: "New" },
  { id: "n-areca-bowl-plate-set", title: "Paakku Bowl & Plate Set", desc: "Matching areca palm-leaf bowl and side plate — perfect for curries, desserts and starters.", category: "Paakku Cups", image: nArecaBowlSet, tag: "New" },
  { id: "n-silver-paper-plate-sizes", title: "Silver Paper Plates — Size 6 to 12", desc: "Premium silver-coated paper plates available in five packed sizes for parties and catering.", category: "Paper Plates", image: nSilverPlates, tag: "New" },
  { id: "n-floral-paper-tub", title: "Floral Print Paper Tub", desc: "Food-grade paper tub with floral design printed using soya-based ink — for biryani, snacks and desserts.", category: "Paper Cups", image: nFloralTub, tag: "New" },
  { id: "n-coffee-paper-cup", title: "Coffee Special Brew Paper Cup", desc: "Food-grade printed paper cup for hot coffee and tea service.", category: "Yellow Tea Cups", image: nCoffeeCup, tag: "New" },
  { id: "n-paakku-food-container-pack", title: "Paakku Food Container Pack", desc: "Branded retail pack of areca palm-leaf food containers with lids — leak and heat resistant.", category: "Food Containers", image: nFoodContainerPack, tag: "New" },
  { id: "n-kraft-dining-roll", title: "Kraft Dining Roll", desc: "Soft multi-layer kraft dining roll for hygienic table service in restaurants and messes.", category: "Dining Rolls", image: nKraftRoll, tag: "New" },
];

const categories: Category[] = [
  "Paakku Plates", "Paakku Cups", "Paper Plates", "Paper Cups",
  "Yellow Tea Cups", "Food Containers", "Table Service", "Dining Rolls", "Tiffin Boxes",
  "Paakku Snacks Container", "Paakku Circle Plates",
];

const categoryIcons: Record<Category, React.ComponentType<{ className?: string }>> = {
  "Paakku Plates": Leaf,
  "Paakku Cups": Coffee,
  "Paper Plates": UtensilsCrossed,
  "Paper Cups": Coffee,
  "Yellow Tea Cups": Coffee,
  "Food Containers": Package,
  "Table Service": ChefHat,
  "Dining Rolls": Recycle,
  "Tiffin Boxes": Boxes,
  "Paakku Snacks Container": Package,
  "Paakku Circle Plates": Leaf,
};

/* ---------- Helpers ---------- */

function Reveal({ children, delay = 0, y = 24 }: { children: React.ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  useEffect(() => {
    if (!inView) return;
    const c = fmAnimate(mv, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
    const un = mv.on("change", v => { if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix; });
    return () => { c.stop(); un(); };
  }, [inView, to, suffix, mv]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ---------- Page ---------- */

function ProductsPage() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  const [filter, setFilter] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");
  const [lightbox, setLightbox] = useState<Product | null>(null);

  const filtered = useMemo(
    () =>
      products.filter(
        p =>
          (filter === "All" || p.category === filter) &&
          (query === "" || (p.title + p.desc).toLowerCase().includes(query.toLowerCase()))
      ),
    [filter, query]
  );

  const productRef = useRef<HTMLDivElement>(null);
  const scrollToProducts = () => productRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // parallax for hero image
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroP, [0, 1], ["0%", "25%"]);
  const heroScale = useTransform(heroP, [0, 1], [1.05, 1.2]);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      {/* progress bar */}
      <motion.div style={{ scaleX: bar }} className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left gradient-forest" />

      {/* nav */}
      <header className="fixed left-0 right-0 top-2 z-40 mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="glass flex items-center gap-2 rounded-full px-3 py-1.5 shadow-elegant">
          <img src={logo} alt="VY Enterprises logo — premium eco-friendly disposables manufacturer" className="h-8 w-8 rounded-full object-cover" />
          <span className="text-sm font-semibold tracking-tight">VY Enterprises</span>
        </Link>
        <nav className="glass hidden items-center gap-1 rounded-full px-1.5 py-1.5 text-sm shadow-elegant md:flex">
          <Link to="/" className="rounded-full px-4 py-1.5 hover:bg-accent/40">Home</Link>
          <a href="#gallery" className="rounded-full px-4 py-1.5 hover:bg-accent/40">Gallery</a>
          <a href="#awards" className="rounded-full px-4 py-1.5 hover:bg-accent/40">Awards</a>
          <a href="#cta" className="rounded-full gradient-forest px-4 py-1.5 text-primary-foreground">Enquire</a>
        </nav>
      </header>

      {/* HERO */}
      <section ref={heroRef} className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0"
        >
          <img src={award} alt="VY Enterprises recognized for excellence in eco-friendly manufacturing" className="h-full w-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85" />
        {/* floating shapes */}
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-24 w-24 rounded-full blur-2xl"
              style={{
                left: `${(i * 13 + 5) % 90}%`,
                top: `${(i * 19 + 8) % 80}%`,
                background: i % 2 ? "color-mix(in oklab, var(--leaf) 55%, transparent)" : "color-mix(in oklab, var(--gold) 40%, transparent)",
              }}
              animate={{ y: [0, -30, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5" /> Product Collection · 2026
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.05 }}
            className="font-display text-4xl font-bold leading-[1.05] sm:text-6xl md:text-7xl"
          >
            Premium Eco-Friendly<br />
            <span className="bg-gradient-to-r from-[color:var(--leaf)] via-white to-[color:var(--gold)] bg-clip-text text-transparent">
              Disposable Products
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-sm text-white/80 sm:text-base"
          >
            Sustainable • Food Safe • Biodegradable • Trusted Quality
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <motion.button
              onClick={scrollToProducts}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 rounded-full gradient-forest px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant"
            >
              View Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
            <a href="#cta" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20">
              Request Quote
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
            className="mt-14 flex items-center justify-center gap-6 text-[11px] uppercase tracking-[0.25em] text-white/70"
          >
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Food-Grade</span>
            <span className="flex items-center gap-1.5"><Leaf className="h-3.5 w-3.5" /> 100% Natural</span>
            <span className="flex items-center gap-1.5"><Award className="h-3.5 w-3.5" /> Award Winning</span>
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/40 p-1">
            <span className="block h-2 w-1 rounded-full bg-white/80" />
          </div>
        </motion.div>
      </section>

      {/* Section divider */}
      <SectionDivider />

      {/* PRODUCTS */}
      <section ref={productRef} id="products" className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--forest)]">The Collection</p>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Every product, individually crafted</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Explore our full range of premium eco-friendly disposables — organised by category, presented in high resolution.
            </p>
          </div>
        </Reveal>

        {/* filter bar */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <FilterChip active={filter === "All"} onClick={() => setFilter("All")}>All</FilterChip>
            {categories.map(c => (
              <FilterChip key={c} active={filter === c} onClick={() => setFilter(c)}>{c}</FilterChip>
            ))}
          </div>
          <div className="mx-auto mt-5 flex max-w-md items-center gap-2 rounded-full border border-input bg-card px-4 py-2 shadow-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </Reveal>

        {/* grid */}
        <motion.div
          layout
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onView={() => setLightbox(p)} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">No products match your search.</p>
        )}
      </section>

      {/* CATEGORY SECTIONS */}
      {categories.map((cat, idx) => {
        const items = products.filter(p => p.category === cat);
        if (items.length === 0) return null;
        const Icon = categoryIcons[cat];
        return (
          <section key={cat} id={`cat-${cat.replace(/\s+/g, "-").toLowerCase()}`} className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
            <Reveal>
              <div className={`flex flex-col items-start gap-3 ${idx % 2 ? "md:items-end md:text-right" : ""}`}>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-[color:var(--forest)]">
                  <Icon className="h-3.5 w-3.5" /> {cat}
                </div>
                <h3 className="font-display text-3xl font-bold sm:text-4xl">{cat}</h3>
                <p className="max-w-xl text-sm text-muted-foreground">
                  Available in multiple sizes and pack formats. Ideal for restaurants, hotels, caterers and retail.
                </p>
              </div>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} onView={() => setLightbox(p)} />
              ))}
            </div>
          </section>
        );
      })}

      <SectionDivider />

      {/* GALLERY */}
      <section id="gallery" className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--forest)]">Product Gallery</p>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">A closer look</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Tap any product to open a high-resolution preview.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {products.map((p, i) => (
            <motion.button
              key={p.id}
              onClick={() => setLightbox(p)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group relative block w-full overflow-hidden rounded-3xl border border-border bg-card shadow-elegant"
            >
              <img
                src={p.image}
                alt={`${p.title} — ${p.category} by VY Enterprises, areca plate manufacturer & supplier in Trichy`}
                loading="lazy" decoding="async"
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-x-4 bottom-4 translate-y-4 text-left text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="text-xs uppercase tracking-widest text-white/70">{p.category}</div>
                <div className="mt-1 font-display text-lg">{p.title}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* AWARDS */}
      <section id="awards" className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0">
          <img src={award} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--forest)]/85 via-[color:var(--forest)]/80 to-black/85" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 text-white sm:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs backdrop-blur-md">
                <Award className="h-3.5 w-3.5" /> Awards & Achievements
              </div>
              <h2 className="mt-5 font-display text-4xl font-bold sm:text-5xl">
                Recognized for Excellence in Eco-Friendly Manufacturing
              </h2>
              <p className="mt-4 text-white/80">
                Our commitment to quality, sustainability, innovation, and customer satisfaction — celebrated on the national stage.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { n: 5, s: "+", label: "Years of trust" },
              { n: 1200, s: "+", label: "Happy clients" },
              { n: 40, s: "+", label: "Product variants" },
              { n: 100, s: "%", label: "Biodegradable" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-center backdrop-blur-md">
                  <div className="font-display text-4xl font-bold text-[color:var(--gold)] sm:text-5xl">
                    <Counter to={s.n} suffix={s.s} />
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-white/75">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              { i: BadgeCheck, t: "Quality" },
              { i: Leaf, t: "Sustainability" },
              { i: Sparkles, t: "Innovation" },
              { i: Star, t: "Customer Love" },
            ].map((v, i) => (
              <Reveal key={v.t} delay={i * 0.08}>
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur">
                  <v.i className="h-5 w-5 text-[color:var(--gold)]" />
                  <span className="text-sm font-medium">{v.t}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border gradient-forest p-10 text-primary-foreground shadow-elegant md:p-16">
            <motion.div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
              animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[color:var(--gold)]/25 blur-3xl"
              animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 7, repeat: Infinity }}
            />
            <div className="relative max-w-2xl">
              <h2 className="font-display text-4xl font-bold sm:text-5xl">Wholesale, Retail & Bulk Orders</h2>
              <p className="mt-4 text-primary-foreground/85">
                Custom branding, door delivery across India, and dedicated support for your business. Talk to our team today.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/919999999999"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[color:var(--forest)] shadow-elegant transition hover:scale-[1.03]"
                >
                  Enquire on WhatsApp <ArrowRight className="h-4 w-4" />
                </a>
                <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-white/20">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* footer */}
      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} VY Enterprises · Tiruchirappalli, Tamil Nadu
      </footer>

      <BackToTop />

      {/* lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lb"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={e => e.stopPropagation()}
              className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-card shadow-2xl"
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <img src={lightbox.image} alt={`${lightbox.title} — eco-friendly ${lightbox.category} from VY Enterprises Trichy`} className="max-h-[70vh] w-full object-contain bg-[color:var(--beige)]" />
              <div className="p-6">
                <div className="text-xs uppercase tracking-widest text-[color:var(--forest)]">{lightbox.category}</div>
                <h4 className="mt-1 font-display text-2xl font-bold">{lightbox.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{lightbox.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Sub-components ---------- */

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-full border px-4 py-1.5 text-xs font-medium transition ${
        active
          ? "border-transparent gradient-forest text-primary-foreground shadow-elegant"
          : "border-border bg-card hover:bg-accent/40"
      }`}
    >
      {children}
    </button>
  );
}

function ProductCard({ product, index, onView }: { product: Product; index: number; onView: () => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="glass group relative overflow-hidden rounded-3xl border border-border shadow-elegant"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--beige)]">
        {product.poster ? (
          <motion.img
            src={product.image}
            alt={`${product.title} — eco-friendly ${product.category} from VY Enterprises Trichy`}
            loading="lazy" decoding="async"
            className="h-full w-full object-contain"
            initial={{ scale: 1 }}
            animate={{ y: [0, -10, 0, 10, 0], scale: [1, 1.03, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : (
          <img
            src={product.image}
            alt={`${product.title} — eco-friendly ${product.category} from VY Enterprises Trichy`}
            loading="lazy" decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        )}
        {product.poster && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            initial={{ x: "-120%" }}
            animate={{ x: ["-120%", "120%"] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
            style={{
              background: "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%)",
            }}
          />
        )}
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[color:var(--forest)] backdrop-blur">
            {product.tag}
          </span>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div className="p-5">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--forest)]">
          {product.category}
        </div>
        <h4 className="mt-1 font-display text-xl font-semibold">{product.title}</h4>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.desc}</p>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={onView}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full gradient-forest px-4 py-2 text-xs font-semibold text-primary-foreground shadow-elegant"
        >
          View Details <ArrowRight className="h-3.5 w-3.5" />
        </motion.button>
      </div>
    </motion.article>
  );
}

function SectionDivider() {
  return (
    <div className="relative py-6">
      <div className="mx-auto h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-[color:var(--leaf)]/60 to-transparent" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[color:var(--forest)]"
        animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <Leaf className="h-5 w-5" />
      </motion.div>
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 rounded-full gradient-forest p-3 text-primary-foreground shadow-elegant"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
