import React from "react";
import type { SortOption } from "../types";

interface SortControlProps {
    sort: SortOption;
    onChange: (next: SortOption) => void;
}

export const SortControl: React.FC<SortControlProps> = ({ sort, onChange}) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Sort by
            </span>
            <select
                value={sort}
                onChange={(e) => onChange(e.target.value as SortOption)}
                style={{
                    padding: "6px 10px",
                    borderRadius: 999,
                    border: "1px solid var(--border)",
                    fontSize: "0.85rem",
                }}
            >
                <option value="price_asc">Price (low → high)</option>
                <option value="price_desc">Price (high → low)</option>
                <option value="sqft_asc">Sqft (small → large)</option>
                <option value="sqft_desc">Sqft (large → small)</option>
            </select>
        </div>
    );
};