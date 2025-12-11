import React from "react";
import type { Property } from "../types";

interface PropertyCardProps {
    property: Property;
    isFavorite: boolean;
    onToggleFavorite: () => void;
};

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <article
      style={{
        borderRadius: "18px",
        overflow: "hidden",
        border: "1px solid var(--border)",
        background: "#fff",
        boxShadow: "var(--shadow-soft)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", paddingTop: "62%" }}>
        <img
          src={property.imageUrl}
          alt={property.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Status pill */}
        <span
          style={{
            position: "absolute",
            left: 8,
            top: 8,
            padding: "4px 10px",
            borderRadius: 999,
            background: "rgba(15,23,42,0.85)",
            color: "#fff",
            fontSize: "0.75rem",
          }}
        >
          {property.status}
        </span>

        {/* Favorite button */}
        <button
          type="button"
          onClick={onToggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          style={{
            position: "absolute",
            right: 8,
            top: 8,
            borderRadius: "999px",
            border: "none",
            padding: "4px 8px",
            backgroundColor: "rgba(255,255,255,0.95)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 6px rgba(15,23,42,0.18)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              fontSize: "0.95rem",
              color: isFavorite ? "#f59e0b" : "#9ca3af",
            }}
          >
            {isFavorite ? "★" : "☆"}
          </span>
        </button>
      </div>

      <div
        style={{
          padding: "12px 14px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
            ${property.price.toLocaleString()}
          </div>
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            {property.beds} bd · {property.baths} ba · {property.sqft} sqft
          </div>
        </div>
        <div style={{ fontSize: "0.85rem" }}>{property.title}</div>
        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          {property.city}, {property.state}
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;