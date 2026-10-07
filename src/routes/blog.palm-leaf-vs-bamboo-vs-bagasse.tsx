import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, Flame, Timer, ShieldCheck, Recycle, ArrowRight, Check } from "lucide-react";

const CANONICAL = "https://vyenterprises.in/blog/palm-leaf-vs-bamboo-vs-bagasse";
const TITLE = "Palm Leaf vs Bamboo vs Bagasse Plates: Which Is Best?";
const DESCRIPTION =
  "Compare palm leaf, bamboo, and bagasse disposable plates on durability, heat resistance, composting time, and cost to pick the right eco-friendly dinnerware.";

export const Route = createFileRoute("/blog/palm-leaf-vs-bamboo-vs-bagasse")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: CANONICAL },
      { property: "og:image", content: "https://vyenterprises.in/og-vy-enterprises.jpg" },
      { name: "keywords", content: "palm leaf plates, areca plates, bamboo plates, bagasse plates, eco-friendly disposable products, areca plate manufacturer" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "https://vyenterprises.in/og-vy-enterprises.jpg" },

    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          author: { "@type": "Organization", name: "VY Enterprises" },
          publisher: { "@type": "Organization", name: "VY Enterprises" },
          mainEntityOfPage: CANONICAL,
        }),
      },
    ],
  }),
  component: ComparisonGuide,
});

type Row = { feature: string; palm: string; bamboo: string; bagasse: string };

const rows: Row[] = [
  { feature: "Raw material", palm: "Naturally fallen areca (palm) leaf sheaths", bamboo: "Bamboo fibre pulp, sometimes bonded with resins", bagasse: "Sugarcane pulp left after juice extraction" },
  { feature: "Durability", palm: "Rigid, sturdy, holds heavy gravies and oily food without bending", bamboo: "Firm but thinner; softens with prolonged moisture", bagasse: "Medium; can flex under heavy wet loads" },
  { feature: "Heat resistance", palm: "Microwave & oven safe up to ~140°C", bamboo: "Safe up to ~100°C; avoid direct oven use", bagasse: "Microwave safe up to ~120°C" },
  { feature: "Water & oil resistance", palm: "High — natural leaf grain repels oil", bamboo: "Medium — often needs a coating", bagasse: "Medium — treated with additives" },
  { feature: "Composting time", palm: "60 days in home compost, 100% biodegradable", bamboo: "90–180 days depending on binders", bagasse: "60–90 days in industrial compost" },
  { feature: "Chemicals used", palm: "None — only sun-dried and heat-pressed", bamboo: "May contain melamine or urea resins", bagasse: "May contain PFAS coatings (check supplier)" },
  { feature: "Look & feel", palm: "Premium, wood-like texture, no two pieces alike", bamboo: "Smooth, uniform, light brown", bagasse: "Paper-like, off-white, uniform" },
  { feature: "Best for", palm: "Weddings, catering, hot & oily South Indian meals", bamboo: "Snacks, dry appetisers, cold desserts", bagasse: "Party plates, takeaway, cold & warm food" },
];

function ComparisonGuide() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-gradient-to-b from-secondary/40 to-background">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Leaf className="h-3.5 w-3.5" /> Eco Dinnerware Guide
          </div>
          <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            Palm Leaf vs Bamboo vs Bagasse Plates: Which Eco-Friendly Dinnerware Wins?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A practical comparison of the three most popular compostable plate materials — so you can
            pick the right disposable dinnerware for your restaurant, event, or home.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12 prose-invert">
        <p className="text-base leading-relaxed text-foreground/90">
          Searches for <strong>palm leaf plates</strong>, bamboo dinnerware, and bagasse tableware
          have grown fast as buyers move away from plastic and thermocol. All three are compostable,
          but they behave very differently in a real kitchen. Below is a side-by-side breakdown
          drawn from our decade of manufacturing eco-friendly disposables in Tiruchirappalli.
        </p>

        <div className="my-8 overflow-x-auto rounded-2xl border border-border/60 bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Feature</th>
                <th className="px-4 py-3">Palm Leaf (Areca)</th>
                <th className="px-4 py-3">Bamboo</th>
                <th className="px-4 py-3">Bagasse</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.feature} className="border-t border-border/50 align-top">
                  <td className="px-4 py-3 font-semibold text-foreground">{r.feature}</td>
                  <td className="px-4 py-3 text-foreground/80">{r.palm}</td>
                  <td className="px-4 py-3 text-foreground/80">{r.bamboo}</td>
                  <td className="px-4 py-3 text-foreground/80">{r.bagasse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-10 font-serif text-2xl font-semibold">1. Durability under real food loads</h2>
        <p className="mt-3 text-foreground/90">
          Palm leaf plates are pressed from thick areca sheaths, giving them the highest rigidity
          of the three. A single 12-inch palm leaf plate can carry sambar rice, gravies, and hot
          curries without warping. Bamboo pulp plates feel premium but are thinner and start
          softening after 30–40 minutes of contact with wet food. Bagasse sits in the middle —
          strong enough for party servings, but not the pick for oily biryani spreads.
        </p>

        <h2 className="mt-8 font-serif text-2xl font-semibold">2. Heat resistance</h2>
        <p className="mt-3 text-foreground/90">
          For hot Indian meals, heat handling matters more than material marketing. Palm leaf
          tolerates the highest temperatures — you can microwave or briefly oven-warm food in it.
          Bagasse is microwave-safe for reheating. Bamboo composites should be kept away from
          direct heat since the binder resins can release fumes.
        </p>

        <h2 className="mt-8 font-serif text-2xl font-semibold">3. Composting time & end-of-life</h2>
        <p className="mt-3 text-foreground/90">
          <strong>Palm leaf</strong> plates decompose in roughly 60 days in a backyard compost pit
          and leave no microplastic residue. <strong>Bagasse</strong> also composts in 60–90 days
          but usually needs industrial compost heat. <strong>Bamboo</strong> composites take
          longest — up to 180 days — because of the binders that give them their smooth finish.
        </p>

        <h2 className="mt-8 font-serif text-2xl font-semibold">4. Cost & sourcing</h2>
        <p className="mt-3 text-foreground/90">
          Bagasse is the cheapest per piece because sugarcane pulp is a mass byproduct. Palm leaf
          sits in the middle and delivers the best premium look for the price. Bamboo composites
          are the most expensive and carry the highest carbon footprint due to imports and resin
          processing.
        </p>

        <h2 className="mt-8 font-serif text-2xl font-semibold">Which should you choose?</h2>
        <ul className="mt-3 space-y-2 text-foreground/90">
          <li className="flex gap-2"><Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" /><span><strong>Weddings, catering, hot meals:</strong> palm leaf (areca) plates.</span></li>
          <li className="flex gap-2"><Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" /><span><strong>Takeaway & party packs:</strong> bagasse plates.</span></li>
          <li className="flex gap-2"><Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" /><span><strong>Dry snacks & desserts:</strong> bamboo dinnerware.</span></li>
        </ul>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border/60 bg-card p-4"><Flame className="h-5 w-5 text-primary" /><p className="mt-2 text-sm font-semibold">Highest heat tolerance</p><p className="text-xs text-muted-foreground">Palm leaf up to 140°C</p></div>
          <div className="rounded-xl border border-border/60 bg-card p-4"><Timer className="h-5 w-5 text-primary" /><p className="mt-2 text-sm font-semibold">Fastest to compost</p><p className="text-xs text-muted-foreground">Palm leaf in ~60 days</p></div>
          <div className="rounded-xl border border-border/60 bg-card p-4"><ShieldCheck className="h-5 w-5 text-primary" /><p className="mt-2 text-sm font-semibold">Zero chemicals</p><p className="text-xs text-muted-foreground">Only palm leaf is untreated</p></div>
        </div>

        <h2 className="mt-10 font-serif text-2xl font-semibold">Why palm leaf leads for Indian kitchens</h2>
        <p className="mt-3 text-foreground/90">
          For most Indian food service — hot rice meals, oily gravies, tiffin service — palm leaf
          (areca) plates win on durability, heat, and composting. They also carry a premium,
          natural wood-grain look that elevates plating for weddings and events. That is why
          restaurants, caterers, and event planners across Tamil Nadu now default to areca as
          their leaf dinnerware of choice.
        </p>

        <div className="mt-10 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <Recycle className="mt-1 h-6 w-6 text-primary" />
            <div>
              <h3 className="font-serif text-xl font-semibold">Explore our palm leaf plate range</h3>
              <p className="mt-2 text-sm text-foreground/80">
                VY Enterprises manufactures 100% biodegradable palm leaf plates, cups, and food
                containers from Tiruchirappalli — wholesale, retail, and custom-branded orders
                delivered across India.
              </p>
              <Link to="/products" className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
                View Product Collection <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
