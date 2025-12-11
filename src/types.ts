export interface Property {
    id: string;
    title: string;
    city: string;
    state: string;
    price: number;
    beds: number;
    baths: number;
    sqft: number;
    isFavorite: boolean;
    status: "For sale" | "Pending" | "Solid";
    imageUrl: string;
}

export interface PropertyFilters {
    city: string;
    minPrice: number | null;
    maxPrice: number | null;
    minBeds: number | null;
}

export type SortOption =
    | "price_asc"
    | "price_desc"
    | "sqft_asc"
    | "sqft_desc";
