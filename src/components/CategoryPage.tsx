import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

type InternalPath =
  | "/areca-leaf-plates"
  | "/areca-leaf-plates-trichy"
  | "/areca-leaf-plates-tamil-nadu"
  | "/paper-plates"
  | "/products";

export type CategoryContent = {
  h1: string;
  intro: string;
  image: string;
  imageAlt: string;
  productsHeading: string;
  products: { name: string; desc: string }[];
  whyHeading: string;
  why: string[];
  uses: string[];
  sections?: { heading: string; body: string }[];
  faqs?: { q: string; a: string }[];
  links: { to: InternalPath; label: string }[];
};

export function CategoryPage({ c }: { c: CategoryContent }) {
  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-4xl px-6 py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/">VY Enterprises</Link> / <Link to="/products">Products</Link> / <span>{c.h1}</span>
        </nav>
        <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{c.h1}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{c.intro}</p>
        <img src={c.image} alt={c.imageAlt} width={1400} height={1120} loading="eager" fetchPriority="high" decoding="async" className="mt-8 w-full rounded-2xl bg-secondary object-contain" />
        <h2 className="mt-12 font-display text-3xl font-bold">{c.productsHeading}</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {c.products.map((p) => (
            <li key={p.name} className="rounded-xl border border-border p-5">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
            </li>
          ))}
        </ul>
        <h2 className="mt-12 font-display text-3xl font-bold">{c.whyHeading}</h2>
        <ul className="mt-4 space-y-2">
          {c.why.map((w) => (
            <li key={w} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" />{w}</li>
          ))}
        </ul>
        <h2 className="mt-12 font-display text-3xl font-bold">Common Uses</h2>
        <p className="mt-3 text-muted-foreground">{c.uses.join(" · ")}</p>
        {c.sections?.map((s) => (
          <section key={s.heading}>
            <h2 className="mt-12 font-display text-3xl font-bold">{s.heading}</h2>
            <p className="mt-3 text-muted-foreground">{s.body}</p>
          </section>
        ))}
        {c.faqs && (
          <section>
            <h2 className="mt-12 font-display text-3xl font-bold">Frequently Asked Questions</h2>
            <div className="mt-4 space-y-5">
              {c.faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-semibold">{f.q}</h3>
                  <p className="mt-1 text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        <h2 className="mt-12 font-display text-3xl font-bold">Contact VY Enterprises</h2>
        <address className="mt-3 not-italic text-muted-foreground">
          VY Enterprises, No.27 Raman Nagar, South Ramalinga Nagar, Trichy – 620017, Tamil Nadu. Call or WhatsApp{" "}
          <a href="tel:+918508657377" className="underline">+91 85086 57377</a>, or email{" "}
          <a href="mailto:business@vyenterprises.in" className="underline">business@vyenterprises.in</a>.
        </address>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="https://wa.me/918508657377" className="inline-flex items-center gap-2 rounded-full gradient-forest px-5 py-2.5 text-sm font-medium text-primary-foreground">Enquire on WhatsApp <ArrowRight className="h-4 w-4" /></a>
          <Link to="/products" className="rounded-full border border-input px-5 py-2.5 text-sm font-medium">View VY Enterprises Products</Link>
          <a href="/#contact" className="rounded-full border border-input px-5 py-2.5 text-sm font-medium">Contact VY Enterprises</a>
          {c.links.map((l) => (
            <Link key={l.to} to={l.to} className="rounded-full border border-input px-5 py-2.5 text-sm font-medium">{l.label}</Link>
          ))}
        </div>
      </article>
    </main>
  );
}

const ORG = { "@id": "https://vyenterprises.in/#organization", "@type": "Organization", name: "VY Enterprises", url: "https://vyenterprises.in/" };

export function categoryHead(o: {
  path: string;
  title: string;
  description: string;
  image: string;
  name: string;
  kind?: "product" | "local";
  areaServed?: string;
}) {
  const url = `https://vyenterprises.in${o.path}`;
  const img = `https://vyenterprises.in${o.image}`;
  const main =
    o.kind === "local"
      ? { "@type": "Service", name: o.name, description: o.description, image: img, url, serviceType: "Areca leaf plate supply", provider: ORG, areaServed: o.areaServed }
      : { "@type": "Product", name: o.name, description: o.description, image: img, url, brand: { "@type": "Brand", name: "VY Enterprises" }, manufacturer: ORG };
  return {
    meta: [
      { title: o.title },
      { name: "description", content: o.description },
      { property: "og:title", content: o.title },
      { property: "og:description", content: o.description },
      { property: "og:type", content: o.kind === "local" ? "website" : "product.group" },
      { property: "og:url", content: url },
      { property: "og:image", content: img },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: o.title },
      { name: "twitter:description", content: o.description },
      { name: "twitter:image", content: img },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            main,
            { "@type": "BreadcrumbList", itemListElement: [
              { "@type": "ListItem", position: 1, name: "VY Enterprises", item: "https://vyenterprises.in/" },
              { "@type": "ListItem", position: 2, name: "Products", item: "https://vyenterprises.in/products" },
              { "@type": "ListItem", position: 3, name: o.name, item: url },
            ] },
          ],
        }),
      },
    ],
  };
}
