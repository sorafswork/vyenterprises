import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/CategoryPage";

const IMG = "/images/products/paakku-areca-plates-v10.webp";
const DESC = "Areca leaf (paakku) plates, bowls and compartment trays from VY Enterprises, Trichy — natural palm-leaf disposable plates for retail and wholesale orders.";

export const Route = createFileRoute("/areca-leaf-plates")({
  head: () => categoryHead({ path: "/areca-leaf-plates", title: "Areca Leaf Plates | VY Enterprises", description: DESC, image: IMG, name: "Areca Leaf Plates" }),
  component: () => (
    <CategoryPage
      c={{
        h1: "Areca Leaf Plates",
        intro: "VY Enterprises supplies areca leaf plates — known locally as paakku plates — made from naturally fallen areca palm leaves. We serve households, caterers and businesses across Trichy, Tamil Nadu with retail and wholesale orders.",
        image: IMG,
        imageAlt: "Areca leaf compartment plates supplied by VY Enterprises",
        productsHeading: "Areca Leaf Plate Products",
        products: [
          { name: "Paakku Round Plate", desc: "Natural areca palm-leaf round plate for everyday meals." },
          { name: "Paakku 3-Compartment Plate", desc: "Round areca plate with three sections for meals and thali service." },
          { name: "Paakku 4-Compartment Tray", desc: "Meal tray with four sections for catering." },
          { name: "Areca Cups & Bowls", desc: "Round areca bowls for curries, desserts and starters." },
          { name: "Paakku Food Containers", desc: "Areca palm-leaf food containers with lids for takeaway meals." },
          { name: "Paakku Snacks Container", desc: "Retail-packed areca container for snacks and catering." },
        ],
        whyHeading: "Why Choose Areca Leaf Plates",
        why: [
          "Made from natural areca palm leaves",
          "An eco-friendly alternative to plastic disposable plates",
          "Sturdy enough for full meals",
          "Plate sizes: 12\", 10\", 8\", 5.5\" and 3\"",
          "Available for retail, bulk and wholesale orders",
        ],
        uses: ["Weddings and functions", "Catering services", "Restaurants and takeaways", "Temples and community events", "Home parties"],
        sections: [
          { heading: "What Are Areca Leaf Plates?", body: "Areca leaf plates are made by pressing the naturally shed sheaths of the areca palm into plates and bowls. No plastic coating is used, which makes them a popular eco-friendly choice for serving food at functions and events." },
          { heading: "How to Order", body: "Share the products, sizes and quantities you need on WhatsApp or by phone at +91 85086 57377. VY Enterprises confirms availability, pricing and delivery before dispatch." },
        ],
        links: [
          { to: "/areca-leaf-plates-trichy", label: "Areca Leaf Plates in Trichy" },
          { to: "/areca-leaf-plates-tamil-nadu", label: "Areca Leaf Plates in Tamil Nadu" },
          { to: "/paper-plates", label: "Paper Plates" },
        ],
      }}
    />
  ),
});
