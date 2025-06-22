
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface DaySchedule {
  closed: boolean;
  openTime: string;
  closeTime: string;
}

interface WeekSchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export function checkOpeningHours(): boolean {
  // Development mode override - set this to true when working on the app
  const isDevelopmentMode = localStorage.getItem('dev-mode-override') === 'true';
  if (isDevelopmentMode) {
    return true;
  }

  try {
    // Load saved schedule
    const saved = localStorage.getItem('opening_hours');
    if (!saved) {
      // Default schedule: Monday-Saturday 11:00-22:00, Sunday closed
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const hour = now.getHours();
      
      if (day === 0) return false; // Sunday closed
      return hour >= 11 && hour < 22; // Monday-Saturday: 11:00-22:00
    }

    const schedule: WeekSchedule = JSON.parse(saved);
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes

    // Map day numbers to schedule keys
    const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayKey = dayKeys[day] as keyof WeekSchedule;
    const daySchedule = schedule[dayKey];

    // If closed, return false
    if (daySchedule.closed) return false;

    // Parse opening and closing times
    const [openHour, openMin] = daySchedule.openTime.split(':').map(Number);
    const [closeHour, closeMin] = daySchedule.closeTime.split(':').map(Number);
    
    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;

    // Check if current time is within opening hours
    return currentTime >= openTime && currentTime < closeTime;
  } catch (error) {
    console.error('Error checking opening hours:', error);
    // Fallback to default behavior
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    
    if (day === 0) return false; // Sunday closed
    return hour >= 11 && hour < 22; // Monday-Saturday: 11:00-22:00
  }
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
