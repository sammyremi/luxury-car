/**
 * Central Asset URL Resolver for Nova Car
 * Ensures all public assets (inventory images, Porsche/EV frames, logos, fallbacks)
 * correctly resolve across local development (http://localhost:3000/) and GitHub Pages (https://sammyremi.github.io/luxury-car/).
 */
export function getAssetUrl(path: string): string {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }

  const isProd = process.env.NODE_ENV === "production";
  const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? "/luxury-car" : "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (basePath && cleanPath.startsWith(basePath)) {
    return cleanPath;
  }
  return `${basePath}${cleanPath}`;
}

export const getAssetPath = getAssetUrl;
