
import { format, isToday, startOfDay } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  builderData?: any;
}

export interface Order {
  id: string;
  tableNumber: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'printed' | 'completed';
  createdAt: Date;
  printed: boolean;
}

const TIMEZONE = 'Europe/Brussels';
const ORDERS_STORAGE_KEY = 'takeabowl-orders';

class OrdersManager {
  private orders: Order[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    this.loadOrders();
    this.purgeOldOrders();
  }

  private loadOrders(): void {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.orders = parsed.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt)
        }));
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      this.orders = [];
    }
  }

  private saveOrders(): void {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(this.orders));
      this.notifyListeners();
    } catch (error) {
      console.error('Error saving orders:', error);
    }
  }

  private purgeOldOrders(): void {
    const now = new Date();
    const brusselsNow = toZonedTime(now, TIMEZONE);
    const todayStart = startOfDay(brusselsNow);
    const todayStartUTC = fromZonedTime(todayStart, TIMEZONE);

    const beforeCount = this.orders.length;
    this.orders = this.orders.filter(order => order.createdAt >= todayStartUTC);
    
    if (beforeCount !== this.orders.length) {
      console.log(`Purged ${beforeCount - this.orders.length} old orders`);
      this.saveOrders();
    }
  }

  public addOrder(order: Omit<Order, 'id' | 'createdAt' | 'status' | 'printed'>): void {
    const newOrder: Order = {
      ...order,
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      status: 'pending',
      printed: false
    };

    this.orders.unshift(newOrder);
    this.saveOrders();
  }

  public getTodaysOrders(): Order[] {
    const now = new Date();
    const brusselsNow = toZonedTime(now, TIMEZONE);
    
    return this.orders.filter(order => {
      const orderBrussels = toZonedTime(order.createdAt, TIMEZONE);
      return isToday(orderBrussels);
    }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  public markAsPrinted(orderId: string): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.printed = true;
      order.status = 'printed';
      this.saveOrders();
    }
  }

  public updateOrderStatus(orderId: string, status: Order['status']): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      this.saveOrders();
    }
  }

  public subscribe(callback: () => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(callback => callback());
  }

  // For demo purposes - simulate orders coming in
  public addMockOrder(): void {
    const mockItems: OrderItem[] = [
      { id: 1, name: 'Sushi Burger Crispy Chicken', quantity: 1, price: 12.50 },
      { id: 2, name: 'Coca-Cola', quantity: 1, price: 2.50 }
    ];

    this.addOrder({
      tableNumber: `0${Math.floor(Math.random() * 7) + 1}`,
      customerName: `Client ${Math.floor(Math.random() * 100)}`,
      items: mockItems,
      total: mockItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    });
  }
}

export const ordersManager = new OrdersManager();
