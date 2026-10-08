import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "./site-config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const isProd = process.env.NODE_ENV === "production";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? "/luxury-car" : "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  if (basePath && cleanPath.startsWith(basePath)) {
    return cleanPath;
  }
  return `${basePath}${cleanPath}`;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function createWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  const cleanNumber = siteConfig.contact.whatsapp.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanNumber}?text=${encoded}`;
}
