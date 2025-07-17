export const DB_CONTENT: Record<string, Record<string, any[]>> = {
  "singapore-airlines": {
    passengers: [
      { _id: "KRIS-001", name: "Minji Kim", tier: "Solitaire PPS Club", miles: 980505, bookings: 12, status: "Active" },
      { _id: "KRIS-002", name: "Hanni Pham", tier: "KrisFlyer Elite Gold", miles: 150223, bookings: 5, status: "Active" },
      { _id: "KRIS-003", name: "Danielle Marsh", tier: "KrisFlyer Elite Silver", miles: 75000, bookings: 3, status: "Active" },
      { _id: "KRIS-004", name: "Haerin Kang", tier: "KrisFlyer", miles: 25000, bookings: 1, status: "Active" },
      { _id: "KRIS-005", name: "Hyein Lee", tier: "KrisFlyer", miles: 12500, bookings: 2, status: "Inactive" },
    ],
    flights: [
      { _id: "SQ38", flightNumber: "SQ38", from: "SIN", to: "LAX", aircraft: "A380-800", status: "On Time", duration_hours: 17.8, seats_available: { first: 2, business: 15, economy: 50} },
      { _id: "SQ22", flightNumber: "SQ22", from: "SIN", to: "EWR", aircraft: "A350-900ULR", status: "Delayed", duration_hours: 18.5, seats_available: { first: 0, business: 5, economy: 10} },
      { _id: "SQ322", flightNumber: "SQ322", from: "SIN", to: "LHR", aircraft: "B777-300ER", status: "Boarding", duration_hours: 14.2, seats_available: { first: 1, business: 0, economy: 5} },
      { _id: "SQ956", flightNumber: "SQ956", from: "SIN", to: "CGK", aircraft: "B737-8 MAX", status: "On Time", duration_hours: 1.8, seats_available: { first: 0, business: 8, economy: 25} },
    ],
    bookings: [
      { _id: "BK-01", passengerId: "KRIS-001", flightId: "SQ38", seat: "1A", class: "First", date: "2024-08-15T10:00:00Z", price: 12500.00 },
      { _id: "BK-02", passengerId: "KRIS-002", flightId: "SQ22", seat: "15D", class: "Business", date: "2024-09-01T23:30:00Z", price: 6800.00 },
      { _id: "BK-03", passengerId: "KRIS-003", flightId: "SQ322", seat: "35A", class: "Economy", date: "2024-07-20T21:00:00Z", price: 1250.00 },
      { _id: "BK-04", passengerId: "KRIS-001", flightId: "SQ22", seat: "11A", class: "Business", date: "2024-09-01T23:30:00Z", price: 7100.00 },
    ],
    fleet: [
        { _id: "AC-A380-1", aircraft_type: "A380-800", registration: "9V-SKU", age_years: 6, in_service: true },
        { _id: "AC-A350-1", aircraft_type: "A350-900ULR", registration: "9V-SGE", age_years: 5, in_service: true },
        { _id: "AC-B777-1", aircraft_type: "B777-300ER", registration: "9V-SWY", age_years: 9, in_service: true },
        { _id: "AC-B737-1", aircraft_type: "B737-8 MAX", registration: "9V-MBN", age_years: 2, in_service: false },
    ]
  },
  newjeans: {
    products: [
        { _id: "NJ-TEE-01", name: "Get Up Heart Tee", category: "Tops", price: 45.00, tags: ["y2k", "tee", "cute"], releaseDate: "2023-07-21T00:00:00Z", details: { material: "100% Cotton", care: "Machine wash cold" } },
        { _id: "NJ-BUN-01", name: "NJ Tokki Beanie", category: "Accessories", price: 35.00, tags: ["beanie", "bunny", "accessories"], releaseDate: "2023-01-02T00:00:00Z", details: { material: "Acrylic", care: "Hand wash" } },
        { _id: "NJ-BAG-01", name: "Super Shy Crossbody Bag", category: "Bags", price: 75.00, tags: ["bag", "y2k", "metallic"], releaseDate: "2023-07-21T00:00:00Z", details: { material: "Faux Leather", care: "Wipe clean" } },
        { _id: "NJ-JEAN-01", name: "Hype Boy Baggy Jeans", category: "Bottoms", price: 95.00, tags: ["jeans", "baggy", "denim"], releaseDate: "2022-08-01T00:00:00Z", details: { material: "Denim", care: "Machine wash cold" } },
        { _id: "NJ-PPG-01", name: "Powerpuff Girls Phone Case", category: "Accessories", price: 25.00, tags: ["phone", "collaboration"], releaseDate: "2023-07-21T00:00:00Z", details: { material: "Silicone", care: "Wipe clean" } }
    ],
    customers: [
        { _id: 1, name: "Minji Kim", email: "minji@bunnies.com", joinDate: "2022-08-01T00:00:00Z", loyaltyTier: "Bunnies Club", address: { city: "Seoul", country: "South Korea" } },
        { _id: 2, name: "Hanni Pham", email: "hanni@bunnies.com", joinDate: "2022-08-01T00:00:00Z", loyaltyTier: "Gold", address: { city: "Melbourne", country: "Australia" } },
        { _id: 3, name: "Danielle Marsh", email: "dani@bunnies.com", joinDate: "2023-01-02T00:00:00Z", loyaltyTier: "Silver", address: { city: "Newcastle", country: "Australia" } },
        { _id: 4, name: "Haerin Kang", email: "haerin@bunnies.com", joinDate: "2023-07-21T00:00:00Z", loyaltyTier: "Silver", address: { city: "Seoul", country: "South Korea" } },
        { _id: 5, name: "Hyein Lee", email: "hyein@bunnies.com", joinDate: "2024-01-01T00:00:00Z", loyaltyTier: "Bronze", address: { city: "Incheon", country: "South Korea" } }
    ],
    orders: [
        { _id: "ORD-001", customerId: 2, orderDate: "2024-05-25T14:00:00Z", totalAmount: 80.00, status: "shipped", items: [ { productId: "NJ-TEE-01", quantity: 1, price: 45.00 }, { productId: "NJ-BUN-01", quantity: 1, price: 35.00 } ]},
        { _id: "ORD-002", customerId: 1, orderDate: "2024-06-10T10:30:00Z", totalAmount: 120.00, status: "processing", items: [ { productId: "NJ-JEAN-01", quantity: 1, price: 95.00 }, { productId: "NJ-PPG-01", quantity: 1, price: 25.00 } ]},
        { _id: "ORD-003", customerId: 4, orderDate: "2024-06-12T18:00:00Z", totalAmount: 75.00, status: "delivered", items: [ { productId: "NJ-BAG-01", quantity: 1, price: 75.00 } ]},
        { _id: "ORD-004", customerId: 1, orderDate: "2024-06-15T11:00:00Z", totalAmount: 90.00, status: "processing", items: [ { productId: "NJ-TEE-01", quantity: 2, price: 45.00 } ]},
    ],
    inventory: [
        { productId: "NJ-TEE-01", size: "S", color: "White", stock: 50 },
        { productId: "NJ-TEE-01", size: "M", color: "White", stock: 30 },
        { productId: "NJ-TEE-01", size: "L", color: "White", stock: 15 },
        { productId: "NJ-JEAN-01", size: "26", color: "Light Wash", stock: 20 },
        { productId: "NJ-JEAN-01", size: "28", color: "Light Wash", stock: 25 },
        { productId: "NJ-BAG-01", size: "One Size", color: "Silver", stock: 40 },
        { productId: "NJ-BUN-01", size: "One Size", color: "Black", stock: 0 },
    ]
  },
};

export const DB_CONFIG = [
  { id: "singapore-airlines", name: "Singapore Airlines", collection_count: 4 },
  { id: "newjeans", name: "NewJeans", collection_count: 4 },
];
