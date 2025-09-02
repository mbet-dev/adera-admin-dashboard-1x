import React from 'react';
import { mockShops } from '../data/mockData';
import { type Shop, ShopStatus } from '../types';
import { ArrowLeftIcon, DollarSignIcon, UsersIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from './Icons';

interface ShopDetailsProps {
  shopId: string;
  onBack: () => void;
}

// Helper to get status classes and icons for both the main status and history
const getStatusVisuals = (status: ShopStatus) => {
    switch (status) {
        case ShopStatus.Active:
            return {
                badgeClass: 'bg-green-900 text-green-300',
                icon: <CheckCircleIcon className="h-5 w-5 text-green-400" />,
                iconBgClass: 'bg-green-500/10',
            };
        case ShopStatus.Inactive:
            return {
                badgeClass: 'bg-red-900 text-red-300',
                icon: <XCircleIcon className="h-5 w-5 text-red-400" />,
                iconBgClass: 'bg-red-500/10',
            };
        case ShopStatus.Pending:
            return {
                badgeClass: 'bg-yellow-900 text-yellow-300',
                icon: <ClockIcon className="h-5 w-5 text-yellow-400" />,
                iconBgClass: 'bg-yellow-500/10',
            };
        default:
            return {
                badgeClass: 'bg-gray-700 text-gray-300',
                icon: <ClockIcon className="h-5 w-5 text-gray-400" />,
                iconBgClass: 'bg-gray-500/10',
            };
    }
};

const ShopDetails: React.FC<ShopDetailsProps> = ({ shopId, onBack }) => {
  const shop = mockShops.find(s => s.id === shopId);

  if (!shop) {
    return (
      <div className="text-center text-gray-400">
        <h2 className="text-2xl font-bold">Shop not found</h2>
        <button onClick={onBack} className="mt-4 text-teal-400 hover:text-teal-300 flex items-center justify-center mx-auto">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Shops
        </button>
      </div>
    );
  }
  
  const { badgeClass } = getStatusVisuals(shop.status);

  return (
    <div className="space-y-8">
      <div>
        <button onClick={onBack} className="text-teal-400 hover:text-teal-300 flex items-center mb-4 text-sm font-medium">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to All Shops
        </button>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-4xl font-bold text-white tracking-tight">{shop.name}</h1>
            <span className={`mt-2 md:mt-0 px-4 py-1.5 inline-flex text-sm leading-5 font-semibold rounded-full ${badgeClass}`}>
                {shop.status}
            </span>
        </div>
        <p className="mt-2 text-lg text-gray-400">Owner: {shop.owner}</p>
        <p className="mt-1 text-sm text-gray-500">
            Joined on {new Date(shop.joinedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4 border border-gray-700">
            <div className="bg-gray-700 p-3 rounded-lg"><UsersIcon className="h-6 w-6 text-teal-400" /></div>
            <div>
                 <p className="text-sm font-medium text-gray-400">Total Orders</p>
                 <p className="text-2xl font-bold text-white">{shop.totalOrders.toLocaleString()}</p>
            </div>
         </div>
         <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4 border border-gray-700">
            <div className="bg-gray-700 p-3 rounded-lg"><DollarSignIcon className="h-6 w-6 text-teal-400" /></div>
            <div>
                 <p className="text-sm font-medium text-gray-400">Total Revenue</p>
                 <p className="text-2xl font-bold text-white">ETB {shop.totalRevenue.toLocaleString()}</p>
            </div>
         </div>
      </div>

      <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Status History</h3>
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {shop.statusHistory?.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((historyItem, index) => {
              const { icon, iconBgClass } = getStatusVisuals(historyItem.status);
              const isLast = index === shop.statusHistory.length - 1;

              return (
                 <li key={index}>
                    <div className="relative pb-8">
                        {!isLast && <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-600" aria-hidden="true" />}
                        <div className="relative flex space-x-3 items-start">
                            <div>
                                <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-gray-800 ${iconBgClass}`}>
                                    {icon}
                                </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5">
                                <p className="text-sm text-gray-300">
                                    Status changed to <span className="font-medium text-white">{historyItem.status}</span>
                                </p>
                                <p className="mt-0.5 text-xs text-gray-500">
                                    {new Date(historyItem.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;