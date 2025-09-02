
export type View =
  | { name: 'dashboard' }
  | { name: 'parcels' }
  | { name: 'shops' }
  | { name: 'shopDetails', shopId: string }
  | { name: 'financials' };

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
}

export type TransactionCategory = 'Adera-PTP' | 'Adera-Shop' | 'Platform Fee' | 'Expense';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: TransactionCategory;
  amount: number;
}
