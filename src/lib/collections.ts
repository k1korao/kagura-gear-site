export const collectionDetails = {
  keycaps: { title: "Keycaps", intro: "A fresh point of view, one key at a time.", empty: "Our first keycap collection is taking shape.", body: "We're working on colors, themes, and the details that make a set feel like yours. Get launch updates as the collection comes together." },
  deskmats: { title: "Deskmats & mousepads", intro: "Find the feel, footprint, and finishing touch for your desk.", empty: "More surfaces are on the way.", body: "Get launch updates for the next KIKORA collection." },
  accessories: { title: "Accessories", intro: "The finishing touches that bring it all together.", empty: "Good details take a little time.", body: "Our accessory collection is in development. Stay in the loop for what's coming to KIKORA." },
} as const;
export type CollectionKey = keyof typeof collectionDetails;
export function isCollection(category: string): category is CollectionKey {
  return Object.hasOwn(collectionDetails, category);
}
