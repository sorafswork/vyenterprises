import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/CategoryPage";

const IMG = "/images/products/paakku-areca-plates-v10.webp";
const DESC = "VY Enterprises, based in Trichy, supplies areca leaf plates and disposable products to restaurants, caterers and retailers in Tamil Nadu. Enquire for wholesale and bulk orders.";

export const Route = createFileRoute("/areca-leaf-plates-tamil-nadu")({
  head: () => categoryHead({ path: "/areca-leaf-plates-tamil-nadu", title: "Areca Leaf Plate Supplier in Tamil Nadu | VY Enterprises", description: DESC, image: IMG, name: "Areca Leaf Plate Supplier in Tamil Nadu", kind: "local", areaServed: "Tamil Nadu, India" }),
  component: () => (
    <CategoryPage
      c={{
        h1: "Areca Leaf Plate Supplier in Tamil Nadu",
        intro: "VY Enterprises is an areca leaf plate supplier based in Trichy, working with restaurants, tea shops, caterers and retailers in Tamil Nadu. We handle wholesale and bulk orders for paakku plates, areca cups, paper plates and other disposable products.",
        image: IMG,
        imageAlt: "VY Enterprises areca leaf plates for wholesale orders",
        productsHeading: "Products for Tamil Nadu Businesses",
        products: [
          { name: "Areca Leaf Plates", desc: "Round paakku plates in 12\", 10\", 8\", 5.5\" and 3\" sizes." },
          { name: "Compartment Plates & Trays", desc: "3- and 4-compartment areca trays for meal service." },
          { name: "Areca Cups & Food Containers", desc: "Bowls and lidded containers for catering and takeaway." },
          { name: "Paper Plates & Cups", desc: "Silver paper plates (6\"–12\", 180 GSM) and printed paper cups." },
        ],
        whyHeading: "Working With VY Enterprises",
        why: [
          "Wholesale and retail orders",
          "Custom branding available on request",
          "Door-to-door delivery across Trichy and neighbouring regions",
          "Orders from other parts of Tamil Nadu are confirmed individually",
        ],
        uses: ["Restaurants and hotels", "Caterers and event organisers", "Retail shops and resellers", "Temples and community events"],
        sections: [
          { heading: "Service Coverage & Ordering", body: "We are based in Trichy and deliver door-to-door across Trichy and neighbouring regions. For orders from elsewhere in Tamil Nadu, share your products, quantities and location on WhatsApp (+91 85086 57377) or email business@vyenterprises.in — we will confirm availability, pricing and delivery arrangements for your order before dispatch." },
        ],
        links: [
          { to: "/areca-leaf-plates", label: "All Areca Leaf Plates" },
          { to: "/areca-leaf-plates-trichy", label: "Areca Leaf Plates in Trichy" },
          { to: "/paper-plates", label: "Paper Plates" },
        ],
      }}
    />
  ),
});
