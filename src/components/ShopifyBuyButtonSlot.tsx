type ShopifyBuyButtonSlotProps = {
  productName: string;
  compact?: boolean;
};

export function ShopifyBuyButtonSlot({ productName, compact = false }: ShopifyBuyButtonSlotProps) {
  return (
    <div
      className={`border border-sakura/30 bg-sakura/10 ${
        compact ? "p-3" : "p-4"
      }`}
      data-shopify-buy-button-slot={productName}
    >
      {/*
        Shopify Buy Button embed goes here.
        1. Create a Product Buy Button in Shopify Admin.
        2. Paste the generated embed code here or replace this component with a client-side Shopify embed component.
        3. Keep payment on Shopify Checkout. Do not collect or store card details in this website.
      */}
      <button
        type="button"
        className="w-full border border-sakura bg-sakura px-4 py-3 text-sm font-black uppercase tracking-[0.18em] text-ink transition hover:border-bone hover:bg-bone"
      >
        Buy Now with Shopify
      </button>
      {!compact ? (
        <p className="mt-3 text-xs leading-5 text-steel">
          Shopify Buy Button placeholder for {productName}. Checkout will be handled by Shopify.
        </p>
      ) : null}
    </div>
  );
}
