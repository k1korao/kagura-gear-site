export type PolicyPageContent = {
  title: string;
  eyebrow: string;
  intro: string;
  sections: {
    heading: string;
    body: string;
  }[];
};

export const shippingPolicy: PolicyPageContent = {
  title: "Shipping Policy",
  eyebrow: "Orders and delivery",
  intro:
    "This starter policy is written for launch readiness. Review it with your actual Shopify shipping settings before publishing.",
  sections: [
    {
      heading: "Processing",
      body: "Orders are prepared after payment is completed through Shopify Checkout. Typical processing time is 1 to 3 business days unless a product page states otherwise.",
    },
    {
      heading: "Delivery",
      body: "Shipping options, carrier rates, and estimated delivery windows are shown at checkout. Delivery times may vary by destination, carrier volume, and customs processing.",
    },
    {
      heading: "Tracking",
      body: "When tracking is available, customers receive a shipping confirmation email with tracking details after the order leaves the warehouse.",
    },
  ],
};

export const returnPolicy: PolicyPageContent = {
  title: "Return Policy",
  eyebrow: "Returns and exchanges",
  intro:
    "Use this as a clean placeholder until your Shopify return rules, address, and support workflow are final.",
  sections: [
    {
      heading: "Return Window",
      body: "Unused items in original packaging may be eligible for return within 30 days of delivery. Final sale items and opened consumables may not be returnable.",
    },
    {
      heading: "Condition",
      body: "Products should be returned clean, undamaged, and with original packaging. Items with heavy use, stains, or missing parts may be rejected.",
    },
    {
      heading: "How to Start",
      body: "Customers should contact support with their order number, product name, and reason for return before sending any item back.",
    },
  ],
};

export const privacyPolicy: PolicyPageContent = {
  title: "Privacy Policy",
  eyebrow: "Privacy and data",
  intro:
    "Kagura Gear should rely on Shopify for checkout and payment processing. Review this page before launch so it matches your actual apps, analytics, and support tools.",
  sections: [
    {
      heading: "Information Collected",
      body: "We may collect contact details, shipping details, order information, support messages, and website analytics needed to operate the store.",
    },
    {
      heading: "Payments",
      body: "Payment information is handled by Shopify and supported payment providers. This website is not designed to collect or store credit card data.",
    },
    {
      heading: "Contact",
      body: "Customers may contact support to ask about privacy requests, account questions, or order-related data.",
    },
  ],
};

export const termsOfService: PolicyPageContent = {
  title: "Terms of Service",
  eyebrow: "Store terms",
  intro:
    "This is launch placeholder copy. Replace it with final legal terms before accepting real orders.",
  sections: [
    {
      heading: "Use of Site",
      body: "Customers agree to use this site for lawful purchases and account activity. Product images, designs, and brand assets remain property of Kagura Gear.",
    },
    {
      heading: "Products",
      body: "Product availability, pricing, and descriptions may change. Final order totals, taxes, shipping, and payment details are confirmed through Shopify Checkout.",
    },
    {
      heading: "Limitation",
      body: "Kagura Gear is not responsible for delays or issues caused by carriers, payment providers, incorrect customer information, or events outside reasonable control.",
    },
  ],
};
