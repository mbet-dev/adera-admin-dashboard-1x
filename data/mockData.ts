
import { type Parcel, ParcelStatus, type Shop, ShopStatus, type Transaction } from '../types';

export const mockParcels: Parcel[] = [
  {
    id: '1',
    trackingId: 'ADE20250803-1',
    sender: { name: 'Alex Johnson', address: 'Bole, Addis Ababa' },
    recipient: { name: 'Beza Tadesse', address: 'CMC, Addis Ababa' },
    status: ParcelStatus.Delivered,
    createdAt: '2023-10-26T10:00:00Z',
    updatedAt: '2023-10-27T14:30:00Z',
  },
  {
    id: '2',
    trackingId: 'ADE20250803-2',
    sender: { name: 'Kaldis Coffee', address: 'Kazanchis, Addis Ababa' },
    recipient: { name: 'Daniel Lemma', address: 'Ayat, Addis Ababa' },
    status: ParcelStatus.InTransit,
    createdAt: '2023-10-27T11:20:00Z',
    updatedAt: '2023-10-27T15:00:00Z',
  },
  {
    id: '3',
    trackingId: 'ADE20250803-3',
    sender: { name: 'Sara Books', address: 'Arat Kilo, Addis Ababa' },
    recipient: { name: 'Hana Girma', address: 'Piassa, Addis Ababa' },
    status: ParcelStatus.AtSortingHub,
    createdAt: '2023-10-27T13:00:00Z',
    updatedAt: '2023-10-27T14:45:00Z',
  },
  {
    id: '4',
    trackingId: 'ADE20250803-4',
    sender: { name: 'Nahom Electronic', address: 'Megenagna, Addis Ababa' },
    recipient: { name: 'Yosef Alemu', address: 'Summit, Addis Ababa' },
    status: ParcelStatus.Failed,
    createdAt: '2023-10-26T15:00:00Z',
    updatedAt: '2023-10-27T11:00:00Z',
  },
  {
    id: '5',
    trackingId: 'ADE20250803-5',
    sender: { name: 'Liyu Boutique', address: 'Old Airport, Addis Ababa' },
    recipient: { name: 'Frehiwot Belay', address: 'Gerji, Addis Ababa' },
    status: ParcelStatus.Dispatched,
    createdAt: '2023-10-27T14:10:00Z',
    updatedAt: '2023-10-27T15:15:00Z',
  },
    {
    id: '6',
    trackingId: 'ADE20250803-6',
    sender: { name: 'Beza Tadesse', address: 'CMC, Addis Ababa' },
    recipient: { name: 'Alex Johnson', address: 'Bole, Addis Ababa' },
    status: ParcelStatus.Created,
    createdAt: '2023-10-28T09:00:00Z',
    updatedAt: '2023-10-28T09:00:00Z',
  },
];

export const mockShops: Shop[] = [
  {
    id: 'shop-1',
    name: 'Kaldis Coffee',
    owner: 'Tsegaye Frehiwot',
    totalOrders: 158,
    totalRevenue: 110600.00,
    status: ShopStatus.Active,
    joinedDate: '2023-01-15',
    statusHistory: [
      { status: ShopStatus.Active, date: '2023-01-15T10:00:00Z' },
      { status: ShopStatus.Pending, date: '2023-01-10T09:00:00Z' },
    ],
    performanceHistory: [
      { month: 'May', orders: 20, revenue: 14000 },
      { month: 'Jun', orders: 22, revenue: 15400 },
      { month: 'Jul', orders: 25, revenue: 17500 },
      { month: 'Aug', orders: 23, revenue: 16100 },
      { month: 'Sep', orders: 28, revenue: 19600 },
      { month: 'Oct', orders: 30, revenue: 21000 },
    ],
  },
  {
    id: 'shop-2',
    name: 'Sara Books',
    owner: 'Sara Dubale',
    totalOrders: 102,
    totalRevenue: 51000.50,
    status: ShopStatus.Active,
    joinedDate: '2023-02-20',
    statusHistory: [
      { status: ShopStatus.Active, date: '2023-02-20T11:00:00Z' },
      { status: ShopStatus.Pending, date: '2023-02-18T14:00:00Z' },
    ],
     performanceHistory: [
      { month: 'May', orders: 12, revenue: 6000 },
      { month: 'Jun', orders: 15, revenue: 7500 },
      { month: 'Jul', orders: 18, revenue: 9000 },
      { month: 'Aug', orders: 20, revenue: 10000 },
      { month: 'Sep', orders: 17, revenue: 8500.50 },
      { month: 'Oct', orders: 20, revenue: 10000 },
    ],
  },
  {
    id: 'shop-3',
    name: 'Nahom Electronic',
    owner: 'Nahom Getachew',
    totalOrders: 55,
    totalRevenue: 275000.00,
    status: ShopStatus.Inactive,
    joinedDate: '2023-03-10',
     statusHistory: [
      { status: ShopStatus.Inactive, date: '2023-09-01T12:00:00Z' },
      { status: ShopStatus.Active, date: '2023-03-10T16:30:00Z' },
      { status: ShopStatus.Pending, date: '2023-03-05T09:00:00Z' },
    ],
    performanceHistory: [
      { month: 'May', orders: 10, revenue: 50000 },
      { month: 'Jun', orders: 12, revenue: 60000 },
      { month: 'Jul', orders: 15, revenue: 75000 },
      { month: 'Aug', orders: 8, revenue: 40000 },
      { month: 'Sep', orders: 5, revenue: 25000 },
      { month: 'Oct', orders: 5, revenue: 25000 },
    ],
  },
  {
    id: 'shop-4',
    name: 'Liyu Boutique',
    owner: 'Liyu Kebede',
    totalOrders: 260,
    totalRevenue: 195000.75,
    status: ShopStatus.Active,
    joinedDate: '2022-12-05',
    statusHistory: [
      { status: ShopStatus.Active, date: '2022-12-05T09:00:00Z' },
      { status: ShopStatus.Pending, date: '2022-12-01T10:00:00Z' },
    ],
    performanceHistory: [
      { month: 'May', orders: 35, revenue: 26250 },
      { month: 'Jun', orders: 40, revenue: 30000 },
      { month: 'Jul', orders: 45, revenue: 33750 },
      { month: 'Aug', orders: 50, revenue: 37500.75 },
      { month: 'Sep', orders: 48, revenue: 36000 },
      { month: 'Oct', orders: 42, revenue: 31500 },
    ],
  },
    {
    id: 'shop-5',
    name: 'Fresh Corner',
    owner: 'Abebe Bikila',
    totalOrders: 5,
    totalRevenue: 1500.00,
    status: ShopStatus.Pending,
    joinedDate: '2023-10-25',
    statusHistory: [
        { status: ShopStatus.Pending, date: '2023-10-25T11:45:00Z' },
    ],
    performanceHistory: [
      { month: 'May', orders: 0, revenue: 0 },
      { month: 'Jun', orders: 0, revenue: 0 },
      { month: 'Jul', orders: 0, revenue: 0 },
      { month: 'Aug', orders: 0, revenue: 0 },
      { month: 'Sep', orders: 0, revenue: 0 },
      { month: 'Oct', orders: 5, revenue: 1500 },
    ],
  },
];

export const mockTransactions: Transaction[] = Array.from({ length: 50 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i * 3);
    const type = Math.random();
    let category: 'Adera-PTP' | 'Adera-Shop' | 'Platform Fee' | 'Expense';
    let description: string;
    let amount: number;

    if (type < 0.45) {
        category = 'Adera-PTP';
        description = `Delivery Fee - #${Math.floor(1000 + Math.random() * 9000)}`;
        amount = 50 + Math.random() * 150;
    } else if (type < 0.8) {
        category = 'Adera-Shop';
        description = `Sale from ${mockShops[i % mockShops.length].name}`;
        amount = 200 + Math.random() * 1800;
    } else if (type < 0.9) {
        category = 'Platform Fee';
        description = `Monthly Subscription - ${mockShops[i % mockShops.length].name}`;
        amount = 500;
    } else {
        category = 'Expense';
        description = `Server Maintenance`;
        amount = -(1000 + Math.random() * 2000);
    }

    return {
        id: `txn-${i + 1}`,
        date: date.toISOString(),
        category,
        description,
        amount: parseFloat(amount.toFixed(2)),
    };
});