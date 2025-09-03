import { type Parcel, ParcelStatus, type Shop, ShopStatus, type Transaction, EmployeeRole, EmployeeStatus, type Employee, type Shift } from '../types';

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
      { date: '2023-05-15', orders: 20, revenue: 14000 },
      { date: '2023-06-15', orders: 22, revenue: 15400 },
      { date: '2023-07-15', orders: 25, revenue: 17500 },
      { date: '2023-08-15', orders: 23, revenue: 16100 },
      { date: '2023-09-15', orders: 28, revenue: 19600 },
      { date: '2023-10-15', orders: 30, revenue: 21000 },
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
      { date: '2023-05-15', orders: 12, revenue: 6000 },
      { date: '2023-06-15', orders: 15, revenue: 7500 },
      { date: '2023-07-15', orders: 18, revenue: 9000 },
      { date: '2023-08-15', orders: 20, revenue: 10000 },
      { date: '2023-09-15', orders: 17, revenue: 8500.50 },
      { date: '2023-10-15', orders: 20, revenue: 10000 },
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
      { date: '2023-05-15', orders: 10, revenue: 50000 },
      { date: '2023-06-15', orders: 12, revenue: 60000 },
      { date: '2023-07-15', orders: 15, revenue: 75000 },
      { date: '2023-08-15', orders: 8, revenue: 40000 },
      { date: '2023-09-15', orders: 5, revenue: 25000 },
      { date: '2023-10-15', orders: 5, revenue: 25000 },
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
      { date: '2023-05-15', orders: 35, revenue: 26250 },
      { date: '2023-06-15', orders: 40, revenue: 30000 },
      { date: '2023-07-15', orders: 45, revenue: 33750 },
      { date: '2023-08-15', orders: 50, revenue: 37500.75 },
      { date: '2023-09-15', orders: 48, revenue: 36000 },
      { date: '2023-10-15', orders: 42, revenue: 31500 },
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
      { date: '2023-05-15', orders: 0, revenue: 0 },
      { date: '2023-06-15', orders: 0, revenue: 0 },
      { date: '2023-07-15', orders: 0, revenue: 0 },
      { date: '2023-08-15', orders: 0, revenue: 0 },
      { date: '2023-09-15', orders: 0, revenue: 0 },
      { date: '2023-10-25', orders: 5, revenue: 1500 },
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

export const mockEmployees: Employee[] = [
    { id: 'emp-1', name: 'Yonas Alemayehu', role: EmployeeRole.Driver, status: EmployeeStatus.Active, email: 'yonas.a@adera.com', phone: '0911234567', vehicleId: 'A84321', performance: { onTimeDeliveryRate: 98, avgRating: 4.8 }, avatarUrl: `https://i.pravatar.cc/150?u=emp-1` },
    { id: 'emp-2', name: 'Fatuma Mohammed', role: EmployeeRole.HubWorker, status: EmployeeStatus.Active, email: 'fatuma.m@adera.com', phone: '0912345678', hubId: 'HUB-BOLE', performance: { parcelsProcessed: 45 }, avatarUrl: `https://i.pravatar.cc/150?u=emp-2` },
    { id: 'emp-3', name: 'Samuel Girma', role: EmployeeRole.Driver, status: EmployeeStatus.Active, email: 'samuel.g@adera.com', phone: '0913456789', vehicleId: 'B12345', performance: { onTimeDeliveryRate: 95, avgRating: 4.6 }, avatarUrl: `https://i.pravatar.cc/150?u=emp-3` },
    { id: 'emp-4', name: 'Helen Berhanu', role: EmployeeRole.Manager, status: EmployeeStatus.Active, email: 'helen.b@adera.com', phone: '0914567890', hubId: 'HUB-BOLE', performance: { avgRating: 4.9 }, avatarUrl: `https://i.pravatar.cc/150?u=emp-4` },
    { id: 'emp-5', name: 'Dawit Tadesse', role: EmployeeRole.HubWorker, status: EmployeeStatus.OnLeave, email: 'dawit.t@adera.com', phone: '0915678901', hubId: 'HUB-CMC', performance: { parcelsProcessed: 52 }, avatarUrl: `https://i.pravatar.cc/150?u=emp-5` },
    { id: 'emp-6', name: 'Sara Lemma', role: EmployeeRole.Driver, status: EmployeeStatus.Inactive, email: 'sara.l@adera.com', phone: '0916789012', vehicleId: 'C54321', performance: { onTimeDeliveryRate: 99, avgRating: 4.9 }, avatarUrl: `https://i.pravatar.cc/150?u=emp-6` },
    { id: 'emp-7', name: 'Kebede Mekonnen', role: EmployeeRole.HubWorker, status: EmployeeStatus.Active, email: 'kebede.m@adera.com', phone: '0917890123', hubId: 'HUB-BOLE', performance: { parcelsProcessed: 48 }, avatarUrl: `https://i.pravatar.cc/150?u=emp-7` },
    { id: 'emp-8', name: 'Liya Assefa', role: EmployeeRole.Driver, status: EmployeeStatus.Active, email: 'liya.a@adera.com', phone: '0918901234', vehicleId: 'D98765', performance: { onTimeDeliveryRate: 97, avgRating: 4.7 }, avatarUrl: `https://i.pravatar.cc/150?u=emp-8` },
];


export const mockShifts: Shift[] = Array.from({ length: 20 }).map((_, i) => {
    const employee = mockEmployees[i % mockEmployees.length];
    const date = new Date();
    date.setDate(date.getDate() + (i % 7)); // Shifts for the next 7 days
    
    const isMorningShift = Math.random() > 0.5;

    return {
        id: `shift-${i}`,
        employeeId: employee.id,
        date: date.toISOString().split('T')[0],
        startTime: isMorningShift ? "08:00" : "16:00",
        endTime: isMorningShift ? "16:00" : "24:00",
        hubId: employee.hubId || (Math.random() > 0.5 ? 'HUB-BOLE' : 'HUB-CMC'),
    };
});
