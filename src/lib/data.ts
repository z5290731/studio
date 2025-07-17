export const DB_CONTENT: Record<string, Record<string, any[]>> = {
  "singapore-airlines": {
    passengers: [
      { id: "KRIS-001", name: "Minji Kim", tier: "Solitaire PPS Club", miles: 980505 },
      { id: "KRIS-002", name: "Hanni Pham", tier: "KrisFlyer Elite Gold", miles: 150223 },
      { id: "KRIS-003", name: "Danielle Marsh", tier: "KrisFlyer Elite Silver", miles: 75000 },
      { id: "KRIS-004", name: "Haerin Kang", tier: "KrisFlyer", miles: 25000 },
      { id: "KRIS-005", name: "Hyein Lee", tier: "KrisFlyer", miles: 12500 },
    ],
    flights: [
      { flightNumber: "SQ38", from: "SIN", to: "LAX", aircraft: "A380-800", status: "On Time" },
      { flightNumber: "SQ22", from: "SIN", to: "EWR", aircraft: "A350-900ULR", status: "Delayed" },
      { flightNumber: "SQ322", from: "SIN", to: "LHR", aircraft: "B777-300ER", status: "Boarding" },
      { flightNumber: "SQ956", from: "SIN", to: "CGK", aircraft: "B737-8 MAX", status: "On Time" },
    ],
  },
  newjeans: {
    members: [
      { id: 1, name: "Minji", position: "Leader, Vocalist", birthdate: "2004-05-07", emoji: "🐻" },
      { id: 2, name: "Hanni", position: "Vocalist, Dancer", birthdate: "2004-10-06", emoji: "🐰" },
      { id: 3, name: "Danielle", position: "Vocalist, Dancer", birthdate: "2005-04-11", emoji: "🐶" },
      { id: 4, name: "Haerin", position: "Vocalist, Dancer", birthdate: "2006-05-15", emoji: "🐹" },
      { id: 5, name: "Hyein", position: "Vocalist, Maknae", birthdate: "2008-04-21", emoji: "🐣" },
    ],
    albums: [
      { id: "EP01", title: "New Jeans", releaseDate: "2022-08-01", tracks: ["Attention", "Hype Boy", "Cookie", "Hurt"] },
      { id: "SA01", title: "OMG", releaseDate: "2023-01-02", tracks: ["OMG", "Ditto"] },
      { id: "EP02", title: "Get Up", releaseDate: "2023-07-21", tracks: ["New Jeans", "Super Shy", "ETA", "Cool With You", "Get Up", "ASAP"] },
      { id: "SA02", title: "How Sweet", releaseDate: "2024-05-24", tracks: ["How Sweet", "Bubble Gum"] },
    ],
  },
};

export const DB_CONFIG = [
  { id: "singapore-airlines", name: "Singapore Airlines", collection_count: 2 },
  { id: "newjeans", name: "NewJeans", collection_count: 2 },
];
