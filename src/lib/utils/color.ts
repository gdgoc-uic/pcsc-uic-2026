export const normalizeHexColor = (color: string | null | undefined): string => {
  if (!color || typeof color !== "string") {
    return "#ffffff";
  }
  
  const cleaned = color.replace(/^#/, "");
  
  if (/^[0-9A-Fa-f]{6}$/.test(cleaned)) {
    return `#${cleaned.toLowerCase()}`;
  }
  
  if (/^[0-9A-Fa-f]{3}$/.test(cleaned)) {
    return `#${cleaned[0]}${cleaned[0]}${cleaned[1]}${cleaned[1]}${cleaned[2]}${cleaned[2]}`.toLowerCase();
  }
  
  return "#ffffff";
};