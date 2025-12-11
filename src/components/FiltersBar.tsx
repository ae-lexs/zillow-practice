import React from "react";
import type { PropertyFilters } from "../types";

interface FiltersBarProps {
    filters: PropertyFilters;
    availableCities: string[];
    onChange: (nextFilters: PropertyFilters) => void;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
    filters,
    availableCities,
    onChange,
}) => {
    function handleCityChange(event: React.ChangeEvent<HTMLSelectElement>) {
        onChange({
            ...filters,
            city: event.target.value,
        });
    }

    function handleNumberChange(
        key: "minPrice" | "maxPrice" | "minBeds",
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        const raw = event.target.value;

        if (raw.trim() == "") {
            onChange({
                ...filters,
                [key]: null,
            });

            return;
        }

        const parsed = Number(raw);

        onChange({
            ...filters,
            [key]: Number.isNaN(parsed) ? null : parsed,
        });
    }

    return (
        <section className="app-filters-bar">
            <div
                style={{
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                    alignItems: "center",
                }}
            >
                {/* City Select */}
                <label
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        fontSize: "0.8rem",
                        gap: 4,
                    }}
                >
                    <span style={{ color: "var(--text-muted)" }}>City</span>
                    <select
                        value={filters.city}
                        onChange={handleCityChange}
                        style={{
                            padding: "6px 10px",
                            borderRadius: 999,
                            border: "1px solid var(--border)",
                            fontSize: "0.85rem",
                        }}
                    >
                        <option value="">All Cities</option>
                        {availableCities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </label>

                {/* Min Price */}
                <label
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        fontSize: "0.8rem",
                        gap: 4,
                    }}
                >
                    <span style={{ color: "var(--text-muted)" }}>Min Price</span>
                    <input
                        type="number"
                        inputMode="numeric"
                        value={filters.minPrice ?? ""}
                        onChange={(event) => handleNumberChange("minPrice", event)}
                        placeholder="Any"
                        style={{
                            padding: "6px 10px",
                            borderRadius: 999,
                            border: "1px solid var(--border)",
                            fontSize: "0.85rem",
                            width: 120,
                        }}
                    />
                </label>

                {/* Max Price */}
                <label
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        fontSize: "0.8rem",
                        gap: 4,
                    }}
                >
                    <span style={{ color: "var(--text-muted)" }}>Max Price</span>
                    <input
                        type="number"
                        inputMode="numeric"
                        value={filters.maxPrice ?? ""}
                        onChange={(event) => handleNumberChange("maxPrice", event)}
                        placeholder="Any"
                        style={{
                            padding: "6px 10px",
                            borderRadius: 999,
                            border: "1px solid var(--border)",
                            fontSize: "0.85rem",
                            width: 120,
                        }}
                    />
                </label>

                {/* Min Beds */}
                <label
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        fontSize: "0.8rem",
                        gap: 4,
                    }}
                >
                    <span style={{ color: "var(--text-muted)" }}>Min Beds</span>
                    <input
                        type="number"
                        inputMode="numeric"
                        value={filters.minBeds ?? ""}
                        onChange={(event) => handleNumberChange("minBeds", event)}
                        placeholder="Any"
                        style={{
                            padding: "6px 10px",
                            borderRadius: 999,
                            border: "1px solid var(--border)",
                            fontSize: "0.85rem",
                            width: 120,
                        }}
                    />
                </label>
            </div>

            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                {buildSummary(filters)}
            </div>
        </section>
    );
};

function buildSummary(filters: PropertyFilters): string {
    const parts: string[] = [];

    if (filters.city) {
        parts.push(filters.city);
    } else {
        parts.push("All Cities");
    }

    if (filters.minBeds != null) {
        parts.push(`${filters.minBeds}+ beds`);
    }

    if (filters.minPrice != null || filters.maxPrice != null) {
        const from = 
            filters.minPrice != null ? `$${filters.minPrice.toLocaleString()}` : "";
        const to = 
            filters.maxPrice != null ? `$${filters.maxPrice.toLocaleString()}` : "";

        if (from && to) {
            parts.push(`${from} - ${to}`);
        } else if (from) {
            parts.push(`≥ ${from}`);
        } else if (to) {
            parts.push(`≤ ${to}`);
        }
    }

    return parts.join(" · ");
}