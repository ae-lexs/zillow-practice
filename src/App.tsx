import React, { useMemo, useState } from 'react';

import type { Property, PropertyFilters, SortOption } from "./types";

import { useProperties } from './hooks/useProperties';

import PropertyCard from './components/PropertyCard';
import { FiltersBar } from './components/FiltersBar';
import { SortControl } from './components/SortControl';


const App: React.FC  = () => {
  const { properties, isLoading, error } = useProperties();

  const [filters, setFilters] = useState<PropertyFilters>({
    city: "",
    minPrice: null,
    maxPrice: null,
    minBeds: null,
  });

  const [sort, setSort] = useState<SortOption>("price_asc");

  const availableCities = useMemo(
    () => 
      Array.from(
        new Set(
          properties.map((property) => `${property.city}, ${property.state}`)
        )
      ).sort(),
      [properties]
    );

  const filteredProperties = useMemo(
    () => applyFilters(properties, filters),
    [properties, filters]
  );

  const sortedProperties = useMemo(
    () => applySorting(filteredProperties, sort),
    [filteredProperties, sort],
  );

  return (
    <div className="app-root">
      <div className="app-shell">
        {/* Header */}
        <header className="app-header">
          <div className="app-title">
            <h1>
              <span className="logo-dot" />
              Zillow React Practice
            </h1>
            <p>Browse mock listings, apply filters, and manage favorites.</p>
          </div>
          <span className="badge">Practice mode</span>
        </header>

        {/* Filters */}
        <FiltersBar
          filters={filters}
          availableCities={availableCities}
          onChange={setFilters}
        />

        {/* Sorting */}
        <div style={{ marginTop: 12, marginBottom: -8 }}>
          <SortControl sort={sort} onChange={setSort} />
        </div>

        {/* Content */}
        <main>
          {isLoading && (
            <p style={{ color: "var(--text-muted)" }}>Loading properties…</p>
          )}

          {error && (
            <p style={{ color: "crimson" }}>
              Something went wrong loading properties.
            </p>
          )}

          {!isLoading && !error && sortedProperties.length === 0 && (
            <p style={{ color: "var(--text-muted)", marginTop: 16 }}>
              No properties match your filters. Try widening your search.
            </p>
          )}

          {!isLoading && !error && sortedProperties.length > 0 && (
            <div className="properties-grid">
              {sortedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function applyFilters(properties: Property[], filters: PropertyFilters): Property[] {
  return properties.filter((property) => {
    const cityLabel = `${property.city}, ${property.state}`;

    if (filters.city && cityLabel !== filters.city) {
      return false;
    }

    if (filters.minPrice != null && property.price < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice != null && property.price > filters.maxPrice) {
      return false;
    }

    if (filters.minBeds != null && property.beds < filters.minBeds) {
      return false;
    }

    return true;
  });
}

function applySorting(properties: Property[], sort: SortOption): Property[] {
  const sorted = [...properties];

  switch(sort) {
    case "price_asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price_desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "sqft_asc":
      return sorted.sort((a, b) => a.sqft - b.sqft);
    case "sqft_desc":
      return sorted.sort((a, b) => b.sqft - a.sqft);
    default:
      return sorted;
  }
}

export default App
