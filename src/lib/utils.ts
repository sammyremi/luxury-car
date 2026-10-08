import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "./site-config";
import { getAssetUrl, getAssetPath } from "./asset-url";

export { getAssetUrl, getAssetPath };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
