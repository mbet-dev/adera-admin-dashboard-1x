export type View =
  | { name: 'dashboard' }
  | { name: 'parcels' }
  | { name: 'shops' }
  | { name: 'shopDetails', shopId: string }
  | { name: 'financials' }
  | { name: 'erp' }
  | { name: 'settings' };

export enum ParcelStatus {
  Created = 'Created',
  InTransit = 'In Transit',
  AtSortingHub = 'At Sorting Hub',
  Dispatched = 'Dispatched',
  Delivered = 'Delivered',
  Failed = 'Failed',
}

export interface Parcel {
  id: string;
  trackingId: string;
  sender: {
    name: string;
    address: string;
  };
  recipient: {
    name: string;
    address: string;
  };
  status: ParcelStatus;
  createdAt: string;
  updatedAt: string;
}

export enum ShopStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Pending = 'Pending Approval',
}

export interface Shop {
  id: string;
  name: string;
  owner: string;
  totalOrders: number;
  totalRevenue: number;
  status: ShopStatus;
  joinedDate: string;
  statusHistory: {
    status: ShopStatus;
    date: string;
  }[];
  performanceHistory: {
    date: string; // Changed from month to date for filtering
    orders: number;
    revenue: number;
  }[];
}

export type TransactionCategory = 'Adera-PTP' | 'Adera-Shop' | 'Platform Fee' | 'Expense';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: TransactionCategory;
  amount: number;
}

export enum EmployeeRole {
    Driver = 'Driver',
    HubWorker = 'Hub Worker',
    Manager = 'Manager',
}

export enum EmployeeStatus {
    Active = 'Active',
    OnLeave = 'On Leave',
    Inactive = 'Inactive',
}

export interface Employee {
    id: string;
    name: string;
    role: EmployeeRole;
    status: EmployeeStatus;
    email: string;
    phone: string;
    hubId?: string; // For Hub Workers
    vehicleId?: string; // For Drivers
    performance: {
        onTimeDeliveryRate?: number; // %
        parcelsProcessed?: number; // per hour
        avgRating?: number; // out of 5
    };
    avatarUrl: string;
}

export interface Shift {
    id: string;
    employeeId: string;
    date: string;
    startTime: string; // "HH:MM"
    endTime: string; // "HH:MM"
    hubId: string;
}
