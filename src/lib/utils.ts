
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function checkWiFiConnection(): boolean {
  // In a real app, this would check the actual SSID
  // For demo purposes, we'll use localStorage to simulate
  return localStorage.getItem('wifi-ssid') === 'TakeABowl-WiFi';
}

export function formatPrice(price: number): string {
  return `€${price.toFixed(2)}`;
}

export function getTableFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  const table = params.get('table');
  return table && /^[0-7]$/.test(table) ? `0${table}` : null;
}
