import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/CategoryPage";

const IMG = "/images/products/paakku-areca-plates-v10.webp";
const DESC = "Looking for areca leaf plates in Trichy? VY Enterprises supplies paakku plates, compartment trays and areca bowls from Raman Nagar, with door-to-door delivery across Trichy.";

export const Route = createFileRoute("/areca-leaf-plates-trichy")({
  head: () => categoryHead({ path: "/areca-leaf-plates-trichy", title: "Areca Leaf Plates in Trichy | VY Enterprises", description: DESC, image: IMG, name: "Areca Leaf Plates in Trichy", kind: "local", areaServed: "Tiruchirappalli, Tamil Nadu" }),
  component: () => (
    <CategoryPage
      c={{
        h1: "Areca Leaf Plates Supplier in Trichy",
        intro: "VY Enterprises is an areca leaf plate supplier based at South Ramalinga Nagar, Trichy. We supply paakku plates, compartment trays, bowls and food containers to homes, caterers, restaurants and event organisers in Trichy, with retail and wholesale orders and door-to-door delivery.",
        image: IMG,
        imageAlt: "Areca leaf plates supplied by VY Enterprises in Trichy",
        productsHeading: "Areca Plates Available in Trichy",
        products: [
          { name: "Paakku Round Plates", desc: "Sizes 12\", 10\", 8\", 5.5\" and 3\" for meals, tiffin and snacks." },
          { name: "Compartment Plates & Trays", desc: "3-compartment round plates and 4-compartment meal trays for catering." },
          { name: "Areca Cups & Bowls", desc: "For curries, sweets, desserts and starters." },
          { name: "Paakku Food Containers", desc: "Areca containers with lids for takeaway and snacks." },
        ],
        whyHeading: "Why Trichy Customers Choose VY Enterprises",
        why: [
          "Local supplier in Trichy — easy to enquire and reorder",
          "Door-to-door delivery across Trichy and neighbouring regions",
          "Retail packs and wholesale quantities",
          "Natural areca palm-leaf plates as an alternative to plastic",
        ],
        uses: ["Weddings and functions", "Caterers", "Restaurants and mess", "Temple festivals", "Home parties"],
        sections: [
          { heading: "How to Order in Trichy", body: "Send your product list, quantities and delivery location on WhatsApp or by phone at +91 85086 57377, or through the enquiry form on our homepage. We confirm availability, pricing and the delivery date before dispatch." },
        ],
        faqs: [
          { q: "Where can I buy areca leaf plates in Trichy?", a: "You can order directly from VY Enterprises, No.27 Raman Nagar, South Ramalinga Nagar, Trichy – 620017. Call or WhatsApp +91 85086 57377." },
          { q: "What types of areca leaf plates does VY Enterprises offer?", a: "Round paakku plates in 12\", 10\", 8\", 5.5\" and 3\" sizes, 3-compartment plates, 4-compartment trays, areca cups and bowls, and areca food containers." },
          { q: "Are areca leaf plates suitable for food serving?", a: "Yes. They are made from areca palm leaves and are commonly used for serving meals, snacks and sweets at homes, functions and catering events." },
          { q: "Do you deliver in Trichy?", a: "Yes, we offer door-to-door delivery across Trichy and neighbouring regions." },
          { q: "How can I enquire about VY Enterprises areca plates?", a: "WhatsApp or call +91 85086 57377, email business@vyenterprises.in, or use the enquiry form on our homepage." },
        ],
        links: [
          { to: "/areca-leaf-plates", label: "All Areca Leaf Plates" },
          { to: "/areca-leaf-plates-tamil-nadu", label: "Areca Leaf Plates in Tamil Nadu" },
          { to: "/paper-plates", label: "Paper Plates" },
        ],
      }}
    />
  ),
});
