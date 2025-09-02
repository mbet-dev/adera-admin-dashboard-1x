
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
    totalOrders: 125,
    totalRevenue: 87500.00,
    status: ShopStatus.Active,
    joinedDate: '2023-01-15',
    statusHistory: [
      { status: ShopStatus.Active, date: '2023-01-15T10:00:00Z' },
      { status: ShopStatus.Pending, date: '2023-01-10T09:00:00Z' },
    ],
  },
  {
    id: 'shop-2',
    name: 'Sara Books',
    owner: 'Sara Dubale',
    totalOrders: 88,
    totalRevenue: 44000.50,
    status: ShopStatus.Active,
    joinedDate: '2023-02-20',
    statusHistory: [
      { status: ShopStatus.Active, date: '2023-02-20T11:00:00Z' },
      { status: ShopStatus.Pending, date: '2023-02-18T14:00:00Z' },
    ],
  },
  {
    id: 'shop-3',
    name: 'Nahom Electronic',
    owner: 'Nahom Getachew',
    totalOrders: 45,
    totalRevenue: 225000.00,
    status: ShopStatus.Inactive,
    joinedDate: '2023-03-10',
     statusHistory: [
      { status: ShopStatus.Inactive, date: '2023-09-01T12:00:00Z' },
      { status: ShopStatus.Active, date: '2023-03-10T16:30:00Z' },
      { status: ShopStatus.Pending, date: '2023-03-05T09:00:00Z' },
    ],
  },
  {
    id: 'shop-4',
    name: 'Liyu Boutique',
    owner: 'Liyu Kebede',
    totalOrders: 210,
    totalRevenue: 157500.75,
    status: ShopStatus.Active,
    joinedDate: '2022-12-05',
    statusHistory: [
      { status: ShopStatus.Active, date: '2022-12-05T09:00:00Z' },
      { status: ShopStatus.Pending, date: '2022-12-01T10:00:00Z' },
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
