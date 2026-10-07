import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { submitInquiry } from "@/lib/inquiries.functions";

import { motion, useScroll, useSpring, useInView, useMotionValue, animate as fmAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Leaf, Award, Truck, Phone, Mail, Instagram, MapPin, MessageCircle,
  Sparkles, Recycle, Package, Store, UtensilsCrossed, Hotel, Briefcase,
  Coffee, ChefHat, ArrowRight, ArrowUp, Check, Star, Plus, Minus,
  ShieldCheck, Boxes, PaintBucket, BadgeCheck, Clock, Users,
} from "lucide-react";
import logo from "@/assets/vy-logo.jpg";
import awardImg from "@/assets/img/award-2.jpg";
import crestLogo from "@/assets/img/vy-crest-logo.webp";
import slideArecaPlates from "@/assets/img/slide-areca-plates.webp";
import slideArecaPlats from "@/assets/img/slide-areca-plats.webp";
import slideArecaCups from "@/assets/img/slide-areca-cups.webp";
import slidePapperPlats from "@/assets/img/slide-papper-plats.webp";
import slideSquarePlates from "@/assets/img/slide-square-plates.webp";
import slideTeaCup from "@/assets/img/slide-tea-cup.webp";
import slideWaterCup from "@/assets/img/slide-water-cup.webp";
import slideDinningRoll from "@/assets/img/slide-dinning-roll.webp";
import slideVyPack1 from "@/assets/img/slide-vy-pack-1.jpg";
import slideVybPack from "@/assets/img/slide-vyb-pack.jpg";
// Portable public paths work on every host (Vercel, Cloudflare, custom domain).
const homePaakkuPlates = { url: "/images/home-products/paakku-areca-plates.webp" };
const homePaakkuCups = { url: "/images/home-products/paakku-cups.webp" };
const homePaperPlates = { url: "/images/home-products/paper-plates.webp" };
const homePaperCups = { url: "/images/home-products/paper-cups.webp" };
const homeYellowTeaCups = { url: "/images/home-products/yellow-tea-cups.webp" };
const homeFoodContainers = { url: "/images/home-products/paakku-food-containers.webp" };
const homeDiningRolls = { url: "/images/home-products/dining-rolls.webp" };
import introPoster from "@/assets/vy-intro-poster.jpg";

const HERO_SLIDES = [
  { src: slideArecaPlates, label: "Paakku Areca Plates" },
  { src: slideArecaCups, label: "Paakku Areca Cups" },
  { src: slidePapperPlats, label: "Silver Paper Plates" },
  { src: slideWaterCup, label: "Printed Paper Cups" },
  { src: slideTeaCup, label: "Tea & Snack Cups" },
  { src: slideVyPack1, label: "Paakku Food Containers" },
  { src: slideDinningRoll, label: "Dining Rolls" },
  { src: slideVybPack, label: "Paakku Retail Pack" },
  { src: slideSquarePlates, label: "Paakku Compartment Trays" },
  { src: slideArecaPlats, label: "Paakku Circle Plates" },
];

function HeroSlider() {
  const [i, setI] = useState(0);
  const n = HERO_SLIDES.length;
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % n), 3000);
    return () => clearInterval(id);
  }, [n]);
  const prev = (i - 1 + n) % n;
  const next = (i + 1) % n;
  return (
    <div className="relative mx-auto flex h-[420px] w-full max-w-[560px] items-center justify-center sm:h-[480px]">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--leaf) 55%, transparent), transparent 65%)" }}
        animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-6 rounded-full border border-primary/15 animate-spin-slow" />
      <div className="absolute inset-16 rounded-full border border-dashed border-primary/20" />

      <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden">
        {HERO_SLIDES.map((s, idx) => {
          const isActive = idx === i;
          const isPrev = idx === prev;
          const isNext = idx === next;
          if (!isActive && !isPrev && !isNext) {
            return (
              <motion.img
                key={idx}
                src={s.src}
                alt={s.label}
                aria-hidden="true"
                width={200}
                height={200}
                loading="lazy"
                decoding="async"
                className="absolute h-40 w-40 rounded-3xl object-cover opacity-0"
              />
            );
          }
          const x = isActive ? "0%" : isPrev ? "-70%" : "70%";
          const scale = isActive ? 1 : 0.7;
          const opacity = isActive ? 1 : 0.35;
          const zIndex = isActive ? 20 : 10;
          return (
            <motion.img
              key={idx}
              src={s.src}
              alt={s.label}
              width={isActive ? 300 : 200}
              height={isActive ? 300 : 200}
              fetchPriority={idx === 0 ? "high" : "auto"}
              decoding={idx === 0 ? "sync" : "async"}
              className="absolute rounded-3xl object-cover shadow-elegant ring-1 ring-primary/20"
              style={{ zIndex }}
              initial={false}
              animate={{
                x,
                scale,
                opacity,
                width: isActive ? 300 : 200,
                height: isActive ? 300 : 200,
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          );
        })}
      </div>

      {isActiveBadge(HERO_SLIDES[i].label)}

      <div className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Show slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${idx === i ? "w-6 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/60"}`}
          />
        ))}
      </div>
    </div>
  );
}

function isActiveBadge(label: string) {
  return (
    <motion.div
      key={label}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute bottom-14 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full glass px-4 py-1.5 text-xs font-medium shadow-elegant"
    >
      <span className="text-primary">✦</span> {label}
    </motion.div>
  );
}

const FAQ_ITEMS: [string, string][] = [
  ["What products do you offer?", "Areca (paakku) plates, paakku cups, paper plates, paper cups, yellow tea cups, paakku food containers and dining rolls."],
  ["Can I order in bulk?", "Yes. Wholesale bulk orders are our specialty — with competitive pricing for restaurants, hotels, caterers and retailers."],
  ["Do you provide wholesale pricing?", "Absolutely. Contact us with your requirement and we'll share a tailored wholesale quote."],
  ["Can products be customized?", "Yes. Custom logo printing and brand-specific packaging is available for cups, plates and more."],
  ["Do you deliver door-to-door?", "Yes, we offer door-to-door delivery across Trichy and neighboring regions."],
  ["How do I place an order?", "Call us, message on WhatsApp, email business@vyenterprises.in, or fill out the inquiry form below."],
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VY Enterprises | Areca Leaf Plates & Paper Plates in Tamil Nadu" },
      { name: "description", content: "VY Enterprises is a Trichy-based supplier of areca leaf plates, paper plates and eco-friendly disposable products for homes, caterers and businesses in Tamil Nadu." },
      { name: "keywords", content: "VY Enterprises, VY Enterprises Trichy, areca plate manufacturer, areca plate supplier, eco-friendly disposable products, paper plates, paper cups, areca cups, food containers, dining rolls, Tiruchirappalli" },
      { property: "og:title", content: "VY Enterprises | Areca Leaf Plates & Paper Plates in Tamil Nadu" },
      { property: "og:description", content: "Eco-friendly disposable products from Trichy — areca plates & cups, paper plates & cups, food containers and dining rolls. Wholesale, retail and custom branding." },
      { property: "og:url", content: "https://vyenterprises.in/" },
      { property: "og:image", content: "https://vyenterprises.in/og-vy-enterprises.jpg" },
      { name: "twitter:title", content: "VY Enterprises | Areca Leaf Plates & Paper Plates in Tamil Nadu" },
      { name: "twitter:description", content: "Eco-friendly disposable products from Trichy — areca plates & cups, paper plates & cups, food containers and dining rolls." },
      { name: "twitter:image", content: "https://vyenterprises.in/og-vy-enterprises.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://vyenterprises.in/" },
      { rel: "preload", as: "image", href: HERO_SLIDES[0].src, fetchpriority: "high" },
    ],

    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://vyenterprises.in/#organization",
              name: "VY Enterprises",
              alternateName: "VY Enterprises Trichy",
              url: "https://vyenterprises.in/",
              logo: {
                "@type": "ImageObject",
                url: "https://vyenterprises.in/logo-vy-enterprises.png",
                width: 512,
                height: 512,
              },
              image: "https://vyenterprises.in/og-vy-enterprises.jpg",
              description:
                "Areca plate manufacturer and supplier of eco-friendly disposable products — areca plates & cups, paper plates & cups, food containers and dining rolls.",
              telephone: ["+918508657377", "+919385712098"],
              email: "business@vyenterprises.in",
              foundingDate: "2021",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+918508657377",
                  email: "business@vyenterprises.in",
                  contactType: "sales",
                  areaServed: "IN",
                  availableLanguage: ["en", "ta"],
                },
              ],


              address: {
                "@type": "PostalAddress",
                streetAddress: "No.27 Raman Nagar, South Ramalinga Nagar",
                addressLocality: "Trichy",
                postalCode: "620017",
                addressRegion: "Tamil Nadu",
                addressCountry: "IN",
              },
            },
            {
              "@type": "WebSite",
              "@id": "https://vyenterprises.in/#website",
              url: "https://vyenterprises.in/",
              name: "VY Enterprises",
              publisher: { "@id": "https://vyenterprises.in/#organization" },
            },
            {
              "@type": "LocalBusiness",
              "@id": "https://vyenterprises.in/#localbusiness",
              name: "VY Enterprises",
              description:
                "Manufacturer and supplier of eco-friendly disposable areca plates, paper cups, food containers and dining rolls in Tiruchirappalli.",
              url: "https://vyenterprises.in/",
              logo: "https://vyenterprises.in/logo-vy-enterprises.png",
              image: "https://vyenterprises.in/og-vy-enterprises.jpg",
              priceRange: "₹₹",
              telephone: "+918508657377",

              email: "business@vyenterprises.in",
              address: {
                "@type": "PostalAddress",
                streetAddress: "No.27 Raman Nagar, South Ramalinga Nagar",
                addressLocality: "Tiruchirappalli (Trichy)",
                postalCode: "620017",
                addressRegion: "Tamil Nadu",
                addressCountry: "IN",
              },
              parentOrganization: { "@id": "https://vyenterprises.in/#organization" },
              areaServed: [
                { "@type": "City", name: "Tiruchirappalli (Trichy)" },
                { "@type": "State", name: "Tamil Nadu" },
              ],
              hasMap: "https://www.google.com/maps/search/?api=1&query=VY+Enterprises+Raman+Nagar+Trichy+620017",
              knowsAbout: ["Areca leaf plates", "Paakku plates", "Paper plates", "Disposable plates", "Paper cups"],
            },
            {
              "@type": "FAQPage",
              "@id": "https://vyenterprises.in/#faq",
              mainEntity: FAQ_ITEMS.map(([q, a]) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
              })),
            },
          ],
        }),
      },
    ],
  }),

  component: Landing,
});

/* ---------- Small helpers ---------- */

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:py-32 ${className}`}>
      {children}
    </section>
  );
}

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
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = fmAnimate(mv, to, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(v) });
    return () => controls.stop();
  }, [inView, to, mv]);
  return <span ref={ref}>{Math.round(val).toLocaleString()}{suffix}</span>;
}

/* ---------- Background ambient leaves ---------- */

function AmbientLeaves() {
  const leaves = Array.from({ length: 14 });
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {leaves.map((_, i) => {
        const delay = (i * 2.7) % 20;
        const duration = 22 + (i % 5) * 4;
        const top = (i * 37) % 90;
        const size = 14 + (i % 4) * 6;
        return (
          <Leaf
            key={i}
            className="absolute text-primary/25"
            style={{
              top: `${top}%`,
              left: 0,
              width: size,
              height: size,
              animation: `drift ${duration}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------- Cursor glow ---------- */

function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  useEffect(() => {
    const onMove = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) { x.set(t.clientX); y.set(t.clientY); }
    };
    // On touch devices the glow follows the scroll position so the same
    // ambient animation is visible while scrolling on mobile.
    let raf = 0;
    let progress = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
        progress = window.scrollY / max;
        x.set(window.innerWidth * (0.5 + 0.35 * Math.sin(progress * Math.PI * 4)));
        y.set(window.innerHeight * (0.25 + 0.5 * ((progress * 3) % 1)));
      });
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full md:h-[420px] md:w-[420px]"
      style={{
        x, y,
        background: "radial-gradient(closest-side, color-mix(in oklab, var(--leaf) 45%, transparent), transparent 70%)",
        mixBlendMode: "multiply",
      }}
    />
  );
}

/* ---------- Nav ---------- */

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["About", "#about"], ["Products", "#products"], ["Sustainability", "#sustainability"],
    ["Custom", "#custom"], ["Partners", "#partners"], ["Contact", "#contact"],
  ];
  return (
    <header className="fixed inset-x-0 top-4 z-50 mx-auto flex w-[min(1200px,94%)] items-center justify-between rounded-full glass px-4 py-2.5 shadow-elegant">
      <a href="#top" className="flex items-center gap-2.5">
        <img src={logo} alt="VY Enterprises logo — eco-friendly disposable products" className="h-9 w-9 rounded-full object-cover ring-1 ring-primary/20" />
        <div className="leading-tight">
          <div className="font-display text-base font-semibold text-foreground">VY Enterprises</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Eco • Trichy</div>
        </div>
      </a>
      <nav className="hidden items-center gap-1 lg:flex">
        {links.map(([l, h]) => (
          <a key={h} href={h} className="rounded-full px-3.5 py-1.5 text-sm font-medium text-foreground/80 transition hover:bg-accent hover:text-foreground">{l}</a>
        ))}
      </nav>
      <a href="#contact" className="hidden rounded-full gradient-forest px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant transition hover:brightness-110 sm:inline-flex">Get a quote</a>
      <button onClick={() => setOpen(!open)} className="rounded-full border border-border p-2 lg:hidden" aria-label="Menu">
        {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-16 mx-2 rounded-2xl glass p-3 shadow-elegant lg:hidden">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 text-sm hover:bg-accent">{l}</a>
          ))}
        </div>
      )}
    </header>
  );
}

/* ---------- Scroll progress ---------- */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });
  return <motion.div className="fixed left-0 top-0 z-[70] h-[3px] origin-left gradient-forest" style={{ scaleX: width, width: "100%" }} />;
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <div id="top" className="relative overflow-hidden pt-32">
      <Section className="!py-16 md:!py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-foreground/80">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Serving India since 2021
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 text-5xl font-semibold leading-[1.05] text-foreground sm:text-6xl md:text-7xl">
                Premium <span className="text-gradient-forest">Eco-Friendly</span> Disposables
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Sustainable areca plates, paper cups & food containers for restaurants, caterers, hotels, retailers and businesses across Tamil Nadu.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Premium Quality", "Eco-Friendly", "Wholesale & Retail", "Custom Branding", "Door Delivery"].map((t) => (
                  <span key={t} className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">{t}</span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#products" className="group inline-flex items-center gap-2 rounded-full gradient-forest px-6 py-3 text-sm font-medium text-primary-foreground shadow-elegant transition hover:-translate-y-0.5">
                  Explore Products <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur hover:bg-accent">
                  Contact Us
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: product slider */}
          <HeroSlider />
        </div>
      </Section>
    </div>
  );
}

/* ---------- Award Showcase ---------- */

function AwardShowcase() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <motion.div
            className="relative mx-auto w-full max-w-md"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-2xl" />
            <motion.img
              src={awardImg}
              alt="VY Enterprises receiving award at KIPL Hello Confexa for excellence in eco-friendly manufacturing"
              className="relative z-10 w-full rounded-3xl object-cover shadow-elegant ring-1 ring-primary/20"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="absolute -right-3 -top-3 z-20 rounded-full gradient-forest px-4 py-2 text-xs font-semibold text-primary-foreground shadow-elegant"
              animate={{ rotate: [0, -6, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="inline-flex items-center gap-1"><Award className="h-3.5 w-3.5" /> Award Winner</span>
            </motion.div>
          </motion.div>
        </Reveal>

        <div className="overflow-hidden">
          <div className="flex items-start justify-between gap-4">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-foreground/80">
                <BadgeCheck className="h-3.5 w-3.5 text-primary" /> KIPL Hello Confexa Honoree
              </span>
            </Reveal>
            <motion.img
              src={crestLogo}
              alt="VY Enterprises gold crest logo"
              loading="lazy" decoding="async"
              className="h-28 w-28 shrink-0 rounded-2xl object-contain shadow-elegant ring-1 ring-primary/20 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 self-end mt-4"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="mt-5 whitespace-nowrap">
            <motion.div
              className="flex gap-8 text-3xl font-semibold text-gradient-forest sm:text-5xl md:text-7xl"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="flex items-center gap-8">
                  VY ENTERPRISES
                  <Leaf className="h-6 w-6 shrink-0 text-primary sm:h-8 sm:w-8" />
                </span>
              ))}
            </motion.div>
          </div>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Recognised for excellence in eco-friendly manufacturing — a proud milestone in our journey to make sustainable disposables the new standard.
            </p>
          </Reveal>

          <ul className="mt-6 grid gap-3 sm:max-w-xl">
            {[
              "Premium-quality eco-friendly products",
              "Bulk order supply",
              "Retail and wholesale services",
            ].map((point, i) => (
              <Reveal key={point} delay={0.15 + i * 0.08}>
                <li className="flex items-start gap-3 rounded-2xl glass px-4 py-3 shadow-elegant">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="min-w-0 text-sm font-medium text-foreground sm:text-base">{point}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

    </section>
  );
}

/* ---------- About / Timeline ---------- */

function About() {
  const milestones = [
    { year: "2021", title: "Founded in Trichy", text: "VY Enterprises begins its journey with a promise: premium disposables that respect the planet." },
    { year: "2022", title: "Wholesale network", text: "Partnered with restaurants, tea shops and caterers across Tamil Nadu." },
    { year: "2023", title: "Custom branding launched", text: "Bespoke printing for cups, plates and packaging for hotels & corporates." },
    { year: "2024", title: "Award-winning service", text: "Recognized for quality, customer care and consistent door-to-door delivery." },
    { year: "Today", title: "1000+ happy customers", text: "Serving daily bulk orders with the same quality-first commitment." },
  ];
  return (
    <Section id="about">
      <Reveal>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">About</span>
          <h2 className="mt-3 text-4xl font-semibold text-foreground md:text-5xl">A sustainable business, <span className="text-gradient-forest">built on trust</span>.</h2>
          <p className="mt-4 text-muted-foreground">
            Since 2021, VY Enterprises has supplied high-quality, eco-friendly disposable products across restaurants, hotels, caterers and retailers — with wholesale pricing, custom branding and door-to-door delivery.
          </p>
        </div>
      </Reveal>

      <div className="relative mt-16 grid gap-10 md:grid-cols-2">
        <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/30 to-transparent md:block" />
        {milestones.map((m, i) => (
          <Reveal key={m.year} delay={i * 0.05}>
            <div className={`relative rounded-3xl glass p-6 shadow-elegant ${i % 2 === 0 ? "md:mr-8" : "md:ml-8 md:mt-16"}`}>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full gradient-forest text-primary-foreground shadow-elegant">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <div className="font-display text-2xl font-semibold text-forest">{m.year}</div>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{m.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{m.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Stats ---------- */

function Stats() {
  const stats = [
    { n: 2021, s: "", l: "Company Established" },
    { n: 10, s: "+", l: "Product Categories" },
    { n: 1000, s: "+", l: "Happy Customers" },
    { n: 500, s: "+", l: "Bulk Orders" },
    { n: 100, s: "%", l: "Quality Commitment" },
  ];
  return (
    <Section className="!py-16">
      <Reveal>
        <div className="rounded-3xl gradient-forest p-8 text-primary-foreground shadow-elegant md:p-12">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-5">
            {stats.map((s) => (
              <div key={s.l}>
                <div className="font-display text-4xl font-semibold md:text-5xl">
                  <Counter to={s.n} suffix={s.s} />
                </div>
                <div className="mt-2 text-sm opacity-85">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- Awards ---------- */

function Awards() {
  const awards = [
    { t: "Quality Excellence", y: "2023", d: "For consistent premium disposable products." },
    { t: "Customer Choice", y: "2024", d: "Recognized by wholesale partners across Tamil Nadu." },
    { t: "Green Business", y: "2024", d: "For commitment to biodegradable, eco-friendly supply." },
  ];
  return (
    <Section id="awards">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Awards</span>
            <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Recognized for <span className="text-gradient-forest">quality & excellence</span></h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">Trusted by hundreds of businesses for quality, delivery and care.</p>
        </div>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {awards.map((a, i) => (
          <Reveal key={a.t} delay={i * 0.08}>
            <div className="group relative overflow-hidden rounded-3xl glass p-8 shadow-elegant transition hover:-translate-y-1">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/20 blur-2xl transition group-hover:bg-gold/40" />
              <Award className="h-10 w-10 text-gold" />
              <div className="mt-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{a.y}</div>
              <h3 className="mt-1 text-xl font-semibold">{a.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{a.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Products ---------- */

const productCatalog = [
  { id: "areca-plates", name: "Paakku (Areca) Plates", sizes: ["12\"", "10\"", "8\"", "5.5\"", "3\""], desc: "Naturally fallen areca leaf, hot-pressed. Sturdy, elegant, 100% compostable.", icon: UtensilsCrossed, image: homePaakkuPlates.url },
  { id: "areca-cups", name: "Paakku Cups", sizes: ["Standard"], desc: "Natural biodegradable cups for a refined table setting.", icon: Coffee, image: homePaakkuCups.url },
  { id: "paper-plates", name: "Paper Plates", sizes: ["12\"", "10\"", "9\"", "8\"", "7\"", "6\"", "180 GSM"], desc: "Food-safe, heavy-duty 180 GSM paper plates for every occasion.", icon: UtensilsCrossed, image: homePaperPlates.url },
  { id: "paper-cups", name: "Paper Cups", sizes: ["90 ml", "110 ml", "150 ml", "210 ml", "250 ml"], desc: "Leak-proof paper cups for tea, coffee and cold beverages.", icon: Coffee, image: homePaperCups.url },
  { id: "yellow-tea", name: "Yellow Tea Cups", sizes: ["90 ml"], desc: "Classic yellow tea cups for tea shops and caterers.", icon: Coffee, image: homeYellowTeaCups.url },
  { id: "containers", name: "Paakku Food Containers", sizes: ["Takeaway"], desc: "Eco-friendly takeaway containers made from areca leaf.", icon: Package, image: homeFoodContainers.url },
  { id: "dining-rolls", name: "Dining Rolls", sizes: ["Sold by KG"], desc: "Food-grade dining rolls available by the kilogram for bulk needs.", icon: Boxes, image: homeDiningRolls.url },
];

function Products() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <Section id="products">
      <Reveal>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Products</span>
          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Everything your table needs, <span className="text-gradient-forest">nothing the earth doesn't</span>.</h2>
          <p className="mt-4 text-muted-foreground">From premium areca plates to leak-proof paper cups — supplied in wholesale quantities with custom branding available.</p>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productCatalog.map((p, i) => {
          const Icon = p.icon;
          const open = active === p.id;
          return (
            <Reveal key={p.id} delay={(i % 3) * 0.06}>
              <motion.article
                layout
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl glass p-6 shadow-elegant"
              >
                <img
                  src={p.image}
                  alt={`${p.name} eco-friendly disposable product from VY Enterprises`}
                  width={960}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="mb-6 aspect-[5/4] w-full rounded-2xl object-contain"
                />
                <div className="flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-forest text-primary-foreground shadow-elegant">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
                    <Leaf className="h-3 w-3" /> Eco
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.sizes.map((s) => (
                    <span key={s} className="rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-[11px] font-medium text-foreground/80">{s}</span>
                  ))}
                </div>

                <motion.div
                  initial={false}
                  animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Food-safe & compostable</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Bulk pricing available</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Custom branding on request</li>
                  </ul>
                </motion.div>

                <div className="mt-5 flex gap-2">
                  <a href="#contact" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full gradient-forest px-4 py-2 text-xs font-medium text-primary-foreground shadow-elegant">
                    Inquiry <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  <button
                    onClick={() => setActive(open ? null : p.id)}
                    className="rounded-full border border-border bg-background/60 px-4 py-2 text-xs font-medium hover:bg-accent"
                  >
                    {open ? "Hide" : "Details"}
                  </button>
                </div>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- Product finder ---------- */

const finderMap: Record<string, string[]> = {
  Restaurant: ["Paakku (Areca) Plates", "Paakku Food Containers", "Dining Rolls"],
  "Tea Shop": ["Paper Cups", "Yellow Tea Cups"],
  Wedding: ["Paakku (Areca) Plates", "Paper Plates", "Paakku Cups"],
  Hotel: ["Paper Plates", "Paakku Food Containers", "Dining Rolls"],
  Office: ["Paper Cups", "Yellow Tea Cups"],
  Catering: ["Paakku (Areca) Plates", "Paper Plates", "Paakku Food Containers"],
};

function Finder() {
  const [pick, setPick] = useState<string | null>(null);
  const options = [
    { l: "Restaurant", i: UtensilsCrossed }, { l: "Tea Shop", i: Coffee }, { l: "Wedding", i: Sparkles },
    { l: "Hotel", i: Hotel }, { l: "Office", i: Briefcase }, { l: "Catering", i: ChefHat },
  ];
  return (
    <Section id="finder">
      <Reveal>
        <div className="rounded-3xl glass p-8 shadow-elegant md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Product Finder</span>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">What are you looking for today?</h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">Pick your business type and we'll recommend the right products for you.</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {options.map(({ l, i: Ic }) => {
              const on = pick === l;
              return (
                <button key={l} onClick={() => setPick(l)}
                  className={`group flex flex-col items-center gap-2 rounded-2xl border p-4 text-sm font-medium transition ${on ? "gradient-forest text-primary-foreground border-transparent shadow-elegant" : "border-border bg-background/60 hover:bg-accent"}`}>
                  <Ic className="h-5 w-5" /> {l}
                </button>
              );
            })}
          </div>
          {pick && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <div className="text-sm font-semibold text-primary">Recommended for {pick}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {finderMap[pick].map((p) => (
                  <span key={p} className="rounded-full bg-background px-3 py-1.5 text-sm shadow-sm">{p}</span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- Sustainability lifecycle ---------- */

function Sustainability() {
  const steps = [
    { l: "Tree", i: "🌳" }, { l: "Areca Leaf", i: "🍃" }, { l: "Plate", i: "🍽️" },
    { l: "Customer", i: "👥" }, { l: "Compost", i: "🌱" }, { l: "Tree", i: "🌳" },
  ];
  return (
    <Section id="sustainability">
      <Reveal>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Sustainability</span>
          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">From leaf to plate, <span className="text-gradient-forest">back to earth</span>.</h2>
          <p className="mt-4 text-muted-foreground">Every product is chosen for its low footprint. Naturally fallen leaves, compostable paper, zero plastic waste.</p>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 150 }}
                className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl glass shadow-elegant md:h-28 md:w-28"
              >
                <div className="text-3xl">{s.i}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{s.l}</div>
              </motion.div>
              {i < steps.length - 1 && <ArrowRight className="h-4 w-4 text-primary" />}
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- Custom Printing ---------- */

function CustomPrinting() {
  const steps = [
    { t: "Blank cup", d: "Start with a clean, food-safe base." },
    { t: "Logo printing", d: "High-precision printing of your logo and brand." },
    { t: "Finished cup", d: "Quality-checked, branded and ready." },
    { t: "Packaging", d: "Neatly packed and dispatched to your door." },
  ];
  return (
    <Section id="custom">
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Custom Branding</span>
            <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Your brand, <span className="text-gradient-forest">on every cup</span>.</h2>
            <p className="mt-4 text-muted-foreground">Custom logo printing, restaurant branding and bulk corporate orders. From single-color logos to full-color designs.</p>
            <ul className="mt-6 space-y-2 text-sm">
              {["Custom logo printing", "Company name printing", "Restaurant branding", "Bulk corporate orders"].map((t) => (
                <li key={t} className="flex items-center gap-2"><PaintBucket className="h-4 w-4 text-primary" /> {t}</li>
              ))}
            </ul>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.08}>
                <div className="h-full rounded-3xl glass p-6 shadow-elegant">
                  <div className="font-display text-3xl font-semibold text-gradient-forest">0{i + 1}</div>
                  <h3 className="mt-2 text-lg font-semibold">{s.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- Why Choose Us ---------- */

function WhyUs() {
  const items = [
    { l: "Premium Quality", i: ShieldCheck }, { l: "Eco Friendly", i: Leaf }, { l: "Door Delivery", i: Truck },
    { l: "Wholesale", i: Boxes }, { l: "Retail", i: Store }, { l: "Affordable Pricing", i: BadgeCheck },
    { l: "Customization", i: PaintBucket }, { l: "Award Winning", i: Award }, { l: "Fast Service", i: Clock },
    { l: "Trusted Supplier", i: Users },
  ];
  return (
    <Section id="why">
      <Reveal>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Why VY</span>
          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Ten reasons buyers <span className="text-gradient-forest">stay with us</span>.</h2>
        </div>
      </Reveal>
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {items.map(({ l, i: Ic }, idx) => (
          <Reveal key={l} delay={(idx % 5) * 0.05}>
            <div className="group flex h-full flex-col items-center gap-3 rounded-2xl glass p-5 text-center shadow-elegant transition hover:-translate-y-1">
              <div className="grid h-12 w-12 place-items-center rounded-xl gradient-forest text-primary-foreground shadow-elegant transition group-hover:scale-110">
                <Ic className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold">{l}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Partners marquee ---------- */

function Partners() {
  const partners = ["Mangalan Mangal", "Pothys Food Stall", "Archana Sweet", "FSM Company", "+ Your Business"];
  const row = [...partners, ...partners];
  return (
    <Section id="partners" className="!py-16">
      <Reveal>
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Business Partners</span>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Trusted by growing brands</h2>
        </div>
      </Reveal>
      <div className="mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee gap-4">
          {row.map((p, i) => (
            <div key={i} className="flex h-16 min-w-[220px] items-center justify-center rounded-2xl glass px-6 font-display text-lg text-foreground/80 shadow-elegant">
              {p}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Delivery ---------- */

function Delivery() {
  const steps = ["Warehouse", "Packing", "Loading", "Transportation", "Customer"];
  return (
    <Section id="delivery">
      <Reveal>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Delivery</span>
          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Door-to-door, <span className="text-gradient-forest">on time, every time</span>.</h2>
        </div>
      </Reveal>
      <div className="mt-12 rounded-3xl glass p-6 shadow-elegant md:p-10">
        <div className="relative h-24 overflow-hidden rounded-2xl bg-accent/40">
          <div className="absolute inset-x-4 bottom-3 h-px bg-primary/30" />
          <div className="absolute bottom-4 animate-truck">
            <Truck className="h-10 w-10 text-primary" />
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s} delay={i * 0.08}>
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-background/60 p-4 text-center">
                <div className="grid h-9 w-9 place-items-center rounded-full gradient-forest text-primary-foreground text-xs font-semibold">{i + 1}</div>
                <div className="text-sm font-semibold">{s}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Testimonials ---------- */

function Testimonials() {
  const items = [
    { n: "Ravi Kumar", b: "Restaurant Owner", r: "The areca plates are beautiful and sturdy. Guests love the natural look at our banquets." },
    { n: "Priya S.", b: "Caterer", r: "VY has been our go-to for bulk supply. Delivery is always on time and pricing is fair." },
    { n: "Karthik M.", b: "Tea Shop", r: "Yellow tea cups are perfect. Customers keep asking where we get them from!" },
    { n: "Divya R.", b: "Hotel Manager", r: "Custom branded cups look premium. Our guests noticed the difference immediately." },
    { n: "Suresh V.", b: "Event Planner", r: "Reliable partner for weddings. Wide range and easy to order in large quantities." },
  ];
  const row = [...items, ...items];
  return (
    <Section id="testimonials" className="overflow-hidden">
      <Reveal>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Testimonials</span>
          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">What our <span className="text-gradient-forest">customers say</span></h2>
        </div>
      </Reveal>
      <div className="mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-5">
          {row.map((t, i) => (
            <div key={i} className="w-[340px] shrink-0 rounded-3xl glass p-6 shadow-elegant">
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 text-sm text-foreground/85">"{t.r}"</p>
              <div className="mt-5 text-sm font-semibold">{t.n}</div>
              <div className="text-xs text-muted-foreground">{t.b}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- FAQ ---------- */

function FAQ() {
  const faqs = FAQ_ITEMS;

  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq">
      <Reveal>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">FAQ</span>
          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Questions, answered.</h2>
        </div>
      </Reveal>
      <div className="mt-10 divide-y divide-border rounded-3xl glass shadow-elegant">
        {faqs.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <div key={q}>
              <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                <span className="text-base font-semibold">{q}</span>
                <span className={`grid h-8 w-8 place-items-center rounded-full border border-border transition ${isOpen ? "gradient-forest border-transparent text-primary-foreground rotate-180" : ""}`}>
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
              <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} className="overflow-hidden">
                <p className="px-6 pb-6 text-sm text-muted-foreground">{a}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  return (
    <Section id="contact">
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-3xl gradient-forest p-8 text-primary-foreground shadow-elegant md:p-10">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] opacity-80">Contact</span>
            <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Let's get you a quote.</h2>
            <p className="mt-4 max-w-md opacity-90">Wholesale, retail or custom branding — reach us any time. We respond within business hours.</p>

            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0" /><div><div className="font-semibold">VY Enterprises</div><div className="opacity-90">No.27 Raman Nagar, South Ramalinga Nagar,<br />Trichy – 620017, Tamil Nadu</div></div></div>
              <div className="flex items-start gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0" /><div><a href="tel:+918508657377" className="block">+91 85086 57377</a><a href="tel:+919385712098" className="block">+91 93857 12098</a></div></div>
              <div className="flex items-start gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0" /><a href="mailto:business@vyenterprises.in">business@vyenterprises.in</a></div>
              <div className="flex items-start gap-3"><Instagram className="mt-0.5 h-5 w-5 shrink-0" /><a href="https://instagram.com/vy__enterprises" target="_blank" rel="noopener">@vy__enterprises</a></div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <a href="https://wa.me/918508657377" className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/25"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
              <a href="tel:+918508657377" className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/25"><Phone className="h-4 w-4" /> Call</a>
              <a href="mailto:business@vyenterprises.in" className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/25"><Mail className="h-4 w-4" /> Email</a>
              <a href="https://instagram.com/vy__enterprises" target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/25"><Instagram className="h-4 w-4" /> Instagram</a>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/20">
              <iframe
                title="Map"
                src="https://www.google.com/maps?q=Raman+Nagar+South+Ramalinga+Nagar+Trichy+620017&output=embed"
                className="h-56 w-full"
                loading="lazy"
              />
            </div>
          </div>

          <InquiryForm />

        </div>
      </Reveal>
    </Section>
  );
}

function InquiryForm() {
  const send = useServerFn(submitInquiry);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const values = {
      name: String(fd.get("name") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      businessType: String(fd.get("businessType") ?? "").trim(),
      requirement: String(fd.get("requirement") ?? "").trim(),
    };

    if (!values.name || values.phone.length < 6) {
      setStatus("error");
      setMessage("Please enter your name and a valid phone number.");
      return;
    }

    setStatus("sending");
    setMessage("");
    try {
      await send({ data: values });

      // WhatsApp Business notification: open WhatsApp with the full inquiry pre-filled
      const waText = [
        "New inquiry from vyenterprises.in",
        `Name: ${values.name}`,
        `Phone: ${values.phone}`,
        `Email: ${values.email || "-"}`,
        `Business type: ${values.businessType || "-"}`,
        `Requirement: ${values.requirement || "-"}`,
      ].join("\n");
      window.open(`https://wa.me/918508657377?text=${encodeURIComponent(waText)}`, "_blank", "noopener");

      setStatus("sent");
      setMessage("Thank you! Your inquiry has been submitted successfully. Our team will contact you shortly.");
      form.reset();
    } catch (err) {
      console.error("[inquiry] submit failed", err);
      setStatus("error");
      setMessage("Sorry, we couldn't submit your inquiry. Please try again or reach us on WhatsApp.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl glass p-8 shadow-elegant md:p-10">
      <h3 className="text-2xl font-semibold">Inquiry form</h3>
      <p className="mt-1 text-sm text-muted-foreground">Tell us what you need and we'll get back with a quote.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm sm:col-span-1"><span className="font-medium">Name</span><input name="name" required maxLength={100} className="rounded-xl border border-border bg-background px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-ring" placeholder="Your name" /></label>
        <label className="flex flex-col gap-1.5 text-sm sm:col-span-1"><span className="font-medium">Phone</span><input name="phone" required maxLength={30} className="rounded-xl border border-border bg-background px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-ring" placeholder="+91" /></label>
        <label className="flex flex-col gap-1.5 text-sm sm:col-span-2"><span className="font-medium">Email</span><input name="email" type="email" maxLength={255} className="rounded-xl border border-border bg-background px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-ring" placeholder="you@business.com" /></label>
        <label className="flex flex-col gap-1.5 text-sm sm:col-span-2"><span className="font-medium">Business type</span>
          <select name="businessType" className="rounded-xl border border-border bg-background px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-ring">
            {["Restaurant", "Tea Shop", "Wedding", "Hotel", "Office", "Catering", "Other"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm sm:col-span-2"><span className="font-medium">Requirement</span>
          <textarea name="requirement" rows={4} maxLength={1000} className="rounded-xl border border-border bg-background px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-ring" placeholder="Products, quantities, delivery location…" />
        </label>
      </div>
      <button type="submit" disabled={status === "sending"} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-forest px-6 py-3 text-sm font-medium text-primary-foreground shadow-elegant hover:brightness-110 disabled:opacity-70">
        {status === "sending" ? "Sending…" : "Send inquiry"} <ArrowRight className="h-4 w-4" />
      </button>
      {message && (
        <p role="status" className={`mt-4 text-sm ${status === "error" ? "text-destructive" : "text-primary"}`}>{message}</p>
      )}
    </form>
  );
}

/* ---------- Footer ---------- */


function Footer() {
  return (
    <footer className="relative mt-10 border-t border-border">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <Leaf key={i} className="absolute text-primary/15 animate-float" style={{ left: `${(i * 13) % 100}%`, top: `${(i * 23) % 90}%`, width: 20 + (i % 3) * 8, height: 20 + (i % 3) * 8, animationDelay: `${i * 0.7}s` }} />
        ))}
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="VY Enterprises logo — eco-friendly disposable products" className="h-11 w-11 rounded-full object-cover ring-1 ring-primary/20" />
            <div>
              <div className="font-display text-lg font-semibold">VY Enterprises</div>
              <div className="text-xs text-muted-foreground">Premium eco-friendly disposables • Trichy</div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">Sustainable disposable products for restaurants, hotels, caterers and retailers. Wholesale, retail and custom branding.</p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Quick Links</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#about" className="hover:text-primary">About</a></li>
            <li><a href="#products" className="hover:text-primary">Products</a></li>
            <li><a href="#custom" className="hover:text-primary">Custom Branding</a></li>
            <li><a href="#contact" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Reach us</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="tel:+918508657377" className="hover:text-primary">+91 85086 57377</a></li>
            <li><a href="mailto:business@vyenterprises.in" className="hover:text-primary">business@vyenterprises.in</a></li>
            <li><a href="https://instagram.com/vy__enterprises" target="_blank" rel="noopener" className="hover:text-primary">@vy__enterprises</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:px-8">
          <div>© {new Date().getFullYear()} VY Enterprises. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Loader ---------- */

function Loader() {
  const [gone, setGone] = useState(false);
  const [showNameScene, setShowNameScene] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const nameVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const el = videoRef.current;
    if (el) {
      el.muted = true;
      const attempt = el.play();
      if (attempt && typeof attempt.catch === "function") {
        attempt.catch(() => {
          // autoplay blocked (e.g. inside preview iframe): run a timed fallback sequence
          timers.push(setTimeout(() => setShowNameScene(true), 2200));
          timers.push(
            setTimeout(() => {
              setGone(true);
            }, 6500),
          );
        });
      }
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!showNameScene) return;
    const el = nameVideoRef.current;
    if (el) {
      el.muted = true;
      void el.play().catch(() => {});
    }
  }, [showNameScene]);

  const finish = () => {
    setGone(true);
  };

  if (gone) return null;
  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-forest"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <video
        ref={videoRef}
        poster={introPoster}
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={(event) => setShowNameScene(event.currentTarget.currentTime >= 8.1)}
        onSeeked={(event) => setShowNameScene(event.currentTarget.currentTime >= 8.1)}
        onEnded={finish}
        onError={finish}
        aria-label="VY Enterprises eco-friendly products and services introduction"
        className="h-full w-full object-cover"
      >
        <source src="/videos/vy-enterprises-intro.webm" type="video/webm" />
        <source src="/videos/vy-enterprises-intro.mp4" type="video/mp4" />
      </video>

      {showNameScene && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
        >
          <video
            ref={nameVideoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="h-full w-full object-cover"
          >
            <source src="/videos/vy-enterprises-name-background.webm" type="video/webm" />
            <source src="/videos/vy-enterprises-name-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-forest/35" />
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-primary-foreground"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <div className="font-display text-4xl font-semibold sm:text-6xl lg:text-7xl">VY Enterprises</div>
            <div className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] sm:text-sm">Premium Eco-Friendly Products</div>
          </motion.div>
        </motion.div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/65 via-transparent to-forest/20" />
      <button
        type="button"
        onClick={finish}
        className="absolute right-5 top-5 rounded-full border border-primary-foreground/35 bg-forest/65 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-elegant sm:right-8 sm:top-8"
        aria-label="Skip introduction"
      >
        Skip intro
      </button>
    </motion.div>
  );
}

/* ---------- Back to top ---------- */

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <a href="#top"
      className={`fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full gradient-forest text-primary-foreground shadow-elegant transition ${show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`}
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </a>
  );
}

/* ---------- Page ---------- */

function Landing() {
  return (
    <>
      <Loader />
      <CursorGlow />
      <ScrollProgress />
      <AmbientLeaves />
      <Nav />
      <main>
        <Hero />
        <AwardShowcase />
        <About />
        <Stats />
        <Awards />
        <Products />
        <Finder />
        <Sustainability />
        <CustomPrinting />
        <WhyUs />
        <Partners />
        <Delivery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
