import React from "react";

/**
 * FoodWasteCartIcon
 * Represents the Food Waste Reduction System.
 * - Dining cart drives in from the right to its place (representing logistics & management).
 * - Plate, fork, and knife fly in and float over the cart (representing food).
 */
export function FoodWasteCartIcon() {
  return (
    <svg
      viewBox="0 0 52 52"
      className="food-cart-svg size-10 overflow-visible"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* 1. Dining Cart / Trolley Structure */}
      <g className="cart-group">
        {/* Cart Handle */}
        <path d="M 8 24 L 14 24" strokeWidth="2.5" />
        {/* Vertical frame and horizontal shelves */}
        <path d="M 14 20 L 14 42" strokeWidth="2.2" />
        <path d="M 40 22 L 40 42" strokeWidth="2.2" />
        {/* Top tray deck */}
        <path d="M 12 26 L 42 26" strokeWidth="2.5" />
        {/* Bottom utility shelf */}
        <path d="M 14 38 L 40 38" strokeWidth="1.8" />
        {/* Left wheel */}
        <g className="wheel-left">
          <circle cx="17" cy="44" r="3" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
          <path d="M 17 42 L 17 46" strokeWidth="1.2" />
          <path d="M 15 44 L 19 44" strokeWidth="1.2" />
        </g>
        {/* Right wheel */}
        <g className="wheel-right">
          <circle cx="37" cy="44" r="3" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
          <path d="M 37 42 L 37 46" strokeWidth="1.2" />
          <path d="M 35 44 L 39 44" strokeWidth="1.2" />
        </g>
      </g>

      {/* 2. Food Elements Flying Over the Cart */}
      {/* Central Plate / Covered Cloche */}
      <g className="food-plate-group">
        {/* Oval Plate base */}
        <ellipse cx="27" cy="22" rx="9" ry="3" strokeWidth="2" fill="currentColor" fillOpacity="0.25" />
        {/* Inner rim */}
        <ellipse cx="27" cy="22" rx="5" ry="1.5" strokeWidth="1" strokeDasharray="2 1" />
        {/* Cloche dome top / serving glow */}
        <path d="M 21 21 C 21 15, 33 15, 33 21" strokeWidth="1.6" />
        <circle cx="27" cy="14" r="1.2" fill="currentColor" />
      </g>

      {/* Fork flying in from top-left */}
      <g className="food-fork-group">
        <path d="M 12 10 L 12 21" strokeWidth="1.8" />
        {/* Prongs */}
        <path d="M 9.5 9 L 9.5 13 C 9.5 15, 14.5 15, 14.5 13 L 14.5 9" strokeWidth="1.4" />
        <path d="M 12 9 L 12 14" strokeWidth="1.4" />
      </g>

      {/* Knife flying in from top-right */}
      <g className="food-knife-group">
        <path d="M 41 10 L 41 21" strokeWidth="1.8" />
        {/* Knife blade curve */}
        <path d="M 41 9 C 44 11, 44 15, 41 16 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="1.4" />
      </g>
    </svg>
  );
}

/**
 * BookRiffleIcon
 * Represents the Online Book Sharing Platform.
 * - Open book base with realistic, sequential page-riffle flutter animation on hover.
 */
export function BookRiffleIcon() {
  return (
    <svg
      viewBox="0 0 52 52"
      className="book-riffle-svg size-10 overflow-visible"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Book Binding Base (Left & Right Covers open) */}
      <g className="book-base">
        {/* Spine center */}
        <path d="M 26 13 L 26 40" strokeWidth="2.5" />
        {/* Left cover */}
        <path d="M 26 39 C 20 37, 12 37, 7 39 L 7 14 C 12 12, 20 12, 26 14 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
        {/* Right cover */}
        <path d="M 26 39 C 32 37, 40 37, 45 39 L 45 14 C 40 12, 32 12, 26 14 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
        {/* Book bookmark ribbon hanging out bottom */}
        <path d="M 26 37 L 26 44 L 28.5 42 L 31 44 L 31 37" strokeWidth="1.4" fill="currentColor" fillOpacity="0.3" />
      </g>

      {/* Static left page text lines */}
      <g className="book-left-lines opacity-60">
        <path d="M 12 18 L 22 18" strokeWidth="1.4" />
        <path d="M 11 23 L 22 23" strokeWidth="1.4" />
        <path d="M 11 28 L 20 28" strokeWidth="1.4" />
      </g>

      {/* Fluttering / Riffle Pages (Anchor origin at spine: x=26) */}
      <g className="book-riffle-pages">
        {/* Page 1 (Deepest) */}
        <path
          className="riffle-page riffle-page-1"
          d="M 26 14 C 31 12.5, 38 12.5, 43 14 L 43 38 C 38 36.5, 31 36.5, 26 38 Z"
          fill="currentColor"
          fillOpacity="0.15"
          strokeWidth="1.6"
        />
        {/* Page 2 */}
        <path
          className="riffle-page riffle-page-2"
          d="M 26 14 C 31 12.5, 38 12.5, 43 14 L 43 38 C 38 36.5, 31 36.5, 26 38 Z"
          fill="currentColor"
          fillOpacity="0.2"
          strokeWidth="1.6"
        />
        {/* Page 3 */}
        <path
          className="riffle-page riffle-page-3"
          d="M 26 14 C 31 12.5, 38 12.5, 43 14 L 43 38 C 38 36.5, 31 36.5, 26 38 Z"
          fill="currentColor"
          fillOpacity="0.25"
          strokeWidth="1.6"
        />
        {/* Page 4 (Topmost fluttering page) */}
        <path
          className="riffle-page riffle-page-4"
          d="M 26 14 C 31 12.5, 38 12.5, 43 14 L 43 38 C 38 36.5, 31 36.5, 26 38 Z"
          fill="currentColor"
          fillOpacity="0.3"
          strokeWidth="1.8"
        />
      </g>
    </svg>
  );
}
