/**
 * Consistent Text Styles for All Pages
 * 
 * This file provides standardized text styling classes to ensure
 * consistent typography across all pages in the application.
 * 
 * Usage:
 * - Use these classes instead of inline Tailwind classes for text
 * - This ensures consistency across all pages
 * - Dark mode support is built-in
 */

export const textStyles = {
  // Page Level Titles
  pageTitle: "text-page-title",
  
  // Section Headers
  sectionTitle: "text-section-title",
  
  // Card Titles
  cardTitle: "text-card-title",
  
  // Body Text
  bodyPrimary: "text-body-primary",
  bodySecondary: "text-body-secondary",
  
  // Small Text
  smallPrimary: "text-small-primary",
  smallSecondary: "text-small-secondary",
  
  // Buttons
  buttonPrimary: "text-button-primary",
  buttonSmall: "text-button-small",
  
  // Statistics
  statValue: "text-stat-value",
  statLabel: "text-stat-label",
  
  // Legacy Tailwind Classes (for backward compatibility)
  // These map to our custom classes
  legacy: {
    h1: "text-page-title",
    h2: "text-section-title", 
    h3: "text-card-title",
    body: "text-body-primary",
    caption: "text-small-secondary",
    label: "text-small-primary",
    button: "text-button-primary",
  }
};

/**
 * Helper function to get the appropriate text class
 * 
 * @param style - The style key from textStyles object
 * @returns The CSS class string
 */
export const getTextClass = (style: keyof typeof textStyles.legacy) => {
  return textStyles.legacy[style];
};

/**
 * Default text styles for common components
 */
export const defaultTextStyles = {
  // Dashboard cards
  dashboardCard: {
    title: "text-card-title",
    value: "text-stat-value", 
    label: "text-stat-label",
    description: "text-body-secondary"
  },
  
  // Form elements
  form: {
    label: "text-small-primary",
    input: "text-body-primary",
    helper: "text-small-secondary",
    error: "text-small-primary text-red-600"
  },
  
  // Tables and lists
  table: {
    header: "text-small-primary",
    cell: "text-body-primary",
    caption: "text-small-secondary"
  },
  
  // Buttons and links
  button: {
    primary: "text-button-primary",
    small: "text-button-small",
    link: "text-body-primary"
  }
};
