import React, { useState, useEffect } from 'react';
import KpiCard from './KpiCard';
import { mockParcels, mockShops } from '../data/mockData';
import { type Parcel, type Shop, ParcelStatus } from '../types';
import { TruckIcon, PackageIcon as BoxIcon, DollarSignIcon, UsersIcon } from './Icons';
import { ParcelStatusBadge } from './ParcelStatusBadge';
import { KpiCardSkeleton, ListSkeleton } from './skeletons';

const RecentParcels: React.FC<{ parcels: Parcel[] }> = ({ parcels }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Parcels</h3>
        <div className="space-y-4">
            {parcels.slice(0, 5).map((parcel) => (
                <div key={parcel.id} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <div>
                        <p className="font-semibold text-gray-800 dark:text-white">{parcel.trackingId}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">To: {parcel.recipient.name}</p>
                    </div>
                    <ParcelStatusBadge status={parcel.status} />
                </div>
            ))}
        </div>
    </div>
);

const NewShops: React.FC<{ shops: Shop[] }> = ({ shops }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">New Partner Shops</h3>
        <div className="space-y-4">
            {shops.filter(s => new Date(s.joinedDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).slice(0, 5).map((shop) => (
                <div key={shop.id} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <div>
                        <p className="font-semibold text-gray-800 dark:text-white">{shop.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Owner: {shop.owner}</p>
                    </div>
                    <span className="text-xs font-medium text-teal-600 dark:text-teal-300 bg-teal-100 dark:bg-teal-900 px-2 py-1 rounded-full">{new Date(shop.joinedDate).toLocaleDateString()}</span>
                </div>
            ))}
        </div>
    </div>
);


const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  const totalParcels = mockParcels.length;
  const inProgressParcels = mockParcels.filter(p => p.status === ParcelStatus.InTransit || p.status === ParcelStatus.Dispatched).length;
  const totalRevenue = mockShops.reduce((acc, shop) => acc + shop.totalRevenue, 0);
  const activeShops = mockShops.filter(s => s.status === 'Active').length;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard Overview</h1>
      
      {isLoading ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCardSkeleton />
            <KpiCardSkeleton />
            <KpiCardSkeleton />
            <KpiCardSkeleton />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ListSkeleton />
            <ListSkeleton />
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard title="Total Parcels" value={totalParcels.toString()} icon={BoxIcon} change="+5.2%" changeType="increase" />
            <KpiCard title="In Progress" value={inProgressParcels.toString()} icon={TruckIcon} change="-1.0%" changeType="decrease" />
            <KpiCard title="Total Revenue" value={`ETB ${totalRevenue.toLocaleString()}`} icon={DollarSignIcon} change="+12.8%" changeType="increase" />
            <KpiCard title="Active Shops" value={activeShops.toString()} icon={UsersIcon} change="+2" changeType="increase" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <RecentParcels parcels={mockParcels} />
             <NewShops shops={mockShops} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;