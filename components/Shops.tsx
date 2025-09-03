import React, { useState, useMemo, useEffect } from 'react';
import { mockShops } from '../data/mockData';
import { ShopStatus } from '../types';
import { SearchIcon, ArrowUpIcon, ArrowDownIcon } from './Icons';
import { TableSkeleton } from './skeletons';

const getStatusClass = (status: ShopStatus) => {
    switch (status) {
        case ShopStatus.Active:
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case ShopStatus.Inactive:
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        case ShopStatus.Pending:
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
};

interface ShopsProps {
  onViewShop: (shopId: string) => void;
}

type SortKey = 'name' | 'owner' | 'status' | 'totalOrders' | 'totalRevenue';
type SortDirection = 'asc' | 'desc';


const Shops: React.FC<ShopsProps> = ({ onViewShop }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<ShopStatus | 'all'>('all');
    const [isLoading, setIsLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: 'name', direction: 'asc' });

    const filteredShops = useMemo(() => {
        let sortableItems = mockShops.filter(shop => {
            if (statusFilter !== 'all' && shop.status !== statusFilter) {
                return false;
            }
            const lowerSearchTerm = searchTerm.toLowerCase();
            return shop.name.toLowerCase().includes(lowerSearchTerm) ||
                   shop.owner.toLowerCase().includes(lowerSearchTerm);
        });

        sortableItems.sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        
        return sortableItems;

    }, [searchTerm, statusFilter, sortConfig]);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Simulate network delay for filter/search
        return () => clearTimeout(timer);
    }, [searchTerm, statusFilter]);

    const handleSort = (key: SortKey) => {
        let direction: SortDirection = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setIsLoading(true);
        setSortConfig({ key, direction });
        setTimeout(() => setIsLoading(false), 300);
    };

    const SortableHeader: React.FC<{ children: React.ReactNode; sortKey: SortKey; }> = ({ children, sortKey }) => {
        const isActive = sortConfig.key === sortKey;
        return (
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <button onClick={() => handleSort(sortKey)} className={`flex items-center gap-2 group transition-colors ${isActive ? 'text-gray-900 dark:text-white' : 'hover:text-gray-900 dark:hover:text-white'}`}>
                    {children}
                    <span className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}>
                        {sortConfig.direction === 'asc' ? <ArrowUpIcon className="h-3 w-3" /> : <ArrowDownIcon className="h-3 w-3" />}
                    </span>
                </button>
            </th>
        );
    };

    return (
        <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Shop Management</h1>

            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:w-1/3">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Shop Name or Owner..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 pl-11 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
                <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as ShopStatus | 'all')}
                    className="w-full md:w-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    <option value="all">All Statuses</option>
                    {Object.values(ShopStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>

            {isLoading ? <TableSkeleton columns={6} /> : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <SortableHeader sortKey="name">Shop Name</SortableHeader>
                                    <SortableHeader sortKey="owner">Owner</SortableHeader>
                                    <SortableHeader sortKey="status">Status</SortableHeader>
                                    <SortableHeader sortKey="totalOrders">Total Orders</SortableHeader>
                                    <SortableHeader sortKey="totalRevenue">Total Revenue</SortableHeader>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredShops.map((shop) => (
                                    <tr key={shop.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{shop.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{shop.owner}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(shop.status)}`}>
                                                {shop.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600 dark:text-gray-300">{shop.totalOrders}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">ETB {shop.totalRevenue.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => onViewShop(shop.id)} className="text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300">View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shops;