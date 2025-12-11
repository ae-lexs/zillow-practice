import type { Property } from "../types";

const MOCK_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    title: "Modern 2BR Apartment in Capitol Hill",
    city: "Seattle",
    state: "WA",
    price: 325_000,
    beds: 2,
    baths: 1,
    sqft: 900,
    isFavorite: false,
    status: "For sale",
    imageUrl:
      "https://images.pexels.com/photos/4392270/pexels-photo-4392270.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "prop-2",
    title: "Cozy Craftsman Near Green Lake",
    city: "Seattle",
    state: "WA",
    price: 780_000,
    beds: 3,
    baths: 2,
    sqft: 1450,
    isFavorite: false,
    status: "For sale",
    imageUrl:
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "prop-3",
    title: "Downtown Loft with City Views",
    city: "Portland",
    state: "OR",
    price: 545_000,
    beds: 1,
    baths: 1,
    sqft: 720,
    isFavorite: false,
    status: "For sale",
    imageUrl:
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "prop-4",
    title: "Suburban Family Home with Yard",
    city: "Bellevue",
    state: "WA",
    price: 915_000,
    beds: 4,
    baths: 3,
    sqft: 2200,
    isFavorite: false,
    status: "For sale",
    imageUrl:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export async function fetchProperties(): Promise<Property[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_PROPERTIES);
        }, 600);
    });
}