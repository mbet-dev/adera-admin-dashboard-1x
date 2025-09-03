import React, { useState, useMemo } from 'react';
import { mockShops } from '../data/mockData';
import { type Shop, ShopStatus } from '../types';
import { ArrowLeftIcon, DollarSignIcon, UsersIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from './Icons';
import ShopPerformanceChart from './ShopPerformanceChart';

interface ShopDetailsProps {
  shopId: string;
  onBack: () => void;
}

// Helper to get status classes and icons for both the main status and history
const getStatusVisuals = (status: ShopStatus) => {
    switch (status) {
        case ShopStatus.Active:
            return {
                badgeClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                icon: <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />,
                iconBgClass: 'bg-green-100 dark:bg-green-500/10',
            };
        case ShopStatus.Inactive:
            return {
                badgeClass: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
                icon: <XCircleIcon className="h-5 w-5 text-red-500 dark:text-red-400" />,
                iconBgClass: 'bg-red-100 dark:bg-red-500/10',
            };
        case ShopStatus.Pending:
            return {
                badgeClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
                icon: <ClockIcon className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />,
                iconBgClass: 'bg-yellow-100 dark:bg-yellow-500/10',
            };
        default:
            return {
                badgeClass: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
                icon: <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />,
                iconBgClass: 'bg-gray-200 dark:bg-gray-500/10',
            };
    }
};

const ShopDetails: React.FC<ShopDetailsProps> = ({ shopId, onBack }) => {
  const shop = mockShops.find(s => s.id === shopId);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const filteredPerformanceData = useMemo(() => {
    if (!shop?.performanceHistory) return [];
    if (!dateRange.start && !dateRange.end) {
        // Default to last 6 months if no range
        return shop.performanceHistory.slice(-6);
    }
    
    const startDate = dateRange.start ? new Date(dateRange.start) : null;
    if(startDate) startDate.setHours(0,0,0,0);
    
    const endDate = dateRange.end ? new Date(dateRange.end) : null;
    if(endDate) endDate.setHours(23,59,59,999);

    return shop.performanceHistory.filter(item => {
        const itemDate = new Date(item.date);
        if (startDate && itemDate < startDate) return false;
        if (endDate && itemDate > endDate) return false;
        return true;
    });
  }, [shop?.performanceHistory, dateRange]);


  if (!shop) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        <h2 className="text-2xl font-bold">Shop not found</h2>
        <button onClick={onBack} className="mt-4 text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 flex items-center justify-center mx-auto">
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
        <button onClick={onBack} className="text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 flex items-center mb-4 text-sm font-medium">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to All Shops
        </button>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">{shop.name}</h1>
            <span className={`mt-2 md:mt-0 px-4 py-1.5 inline-flex text-sm leading-5 font-semibold rounded-full ${badgeClass}`}>
                {shop.status}
            </span>
        </div>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Owner: {shop.owner}</p>
        <p className="mt-1 text-sm text-gray-500">
            Joined on {new Date(shop.joinedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4 border border-gray-200 dark:border-gray-700">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"><UsersIcon className="h-6 w-6 text-teal-500 dark:text-teal-400" /></div>
            <div>
                 <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{shop.totalOrders.toLocaleString()}</p>
            </div>
         </div>
         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4 border border-gray-200 dark:border-gray-700">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"><DollarSignIcon className="h-6 w-6 text-teal-500 dark:text-teal-400" /></div>
            <div>
                 <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
                 <p className="text-2xl font-bold text-gray-900 dark:text-white">ETB {shop.totalRevenue.toLocaleString()}</p>
            </div>
         </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Performance History</h3>
              <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                      <label htmlFor="startDate" className="text-sm text-gray-500 dark:text-gray-400 shrink-0">From</label>
                      <input type="date" id="startDate" value={dateRange.start} onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                          className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-1.5 px-3 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"/>
                  </div>
                  <div className="flex items-center gap-2">
                      <label htmlFor="endDate" className="text-sm text-gray-500 dark:text-gray-400 shrink-0">To</label>
                      <input type="date" id="endDate" value={dateRange.end} onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                          className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-1.5 px-3 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"/>
                  </div>
              </div>
          </div>
          {filteredPerformanceData.length > 0 ? (
            <ShopPerformanceChart data={filteredPerformanceData} />
          ) : (
             <div className="text-center py-16">
                <p className="text-gray-500 dark:text-gray-400">No performance data for the selected period.</p>
             </div>
          )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Status History</h3>
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {shop.statusHistory?.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((historyItem, index) => {
              const { icon, iconBgClass } = getStatusVisuals(historyItem.status);
              const isLast = index === shop.statusHistory.length - 1;

              return (
                 <li key={index}>
                    <div className="relative pb-8">
                        {!isLast && <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-300 dark:bg-gray-600" aria-hidden="true" />}
                        <div className="relative flex space-x-3 items-start">
                            <div>
                                <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800 ${iconBgClass}`}>
                                    {icon}
                                </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5">
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Status changed to <span className="font-medium text-gray-900 dark:text-white">{historyItem.status}</span>
                                </p>
                                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-500">
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