import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function checkOpeningHours(): boolean {
  // For demo purposes, always return true
  return true;
  
  // Original logic (commented out for demo):
  // const now = new Date();
  // const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  // const hour = now.getHours();
  // 
  // // Sunday is closed (day 0)
  // if (day === 0) return false;
  // 
  // // Monday-Saturday: 11:00-22:00
  // return hour >= 11 && hour < 22;
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
