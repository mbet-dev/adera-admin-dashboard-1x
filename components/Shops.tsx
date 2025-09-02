import React, { useState, useMemo } from 'react';
import { mockShops } from '../data/mockData';
import { ShopStatus } from '../types';
import { SearchIcon } from './Icons';

const getStatusClass = (status: ShopStatus) => {
    switch (status) {
        case ShopStatus.Active:
            return 'bg-green-900 text-green-300';
        case ShopStatus.Inactive:
            return 'bg-red-900 text-red-300';
        case ShopStatus.Pending:
            return 'bg-yellow-900 text-yellow-300';
        default:
            return 'bg-gray-700 text-gray-300';
    }
};

interface ShopsProps {
  onViewShop: (shopId: string) => void;
}

const Shops: React.FC<ShopsProps> = ({ onViewShop }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<ShopStatus | 'all'>('all');

    const filteredShops = useMemo(() => {
        return mockShops.filter(shop => {
            if (statusFilter !== 'all' && shop.status !== statusFilter) {
                return false;
            }
            const lowerSearchTerm = searchTerm.toLowerCase();
            return shop.name.toLowerCase().includes(lowerSearchTerm) ||
                   shop.owner.toLowerCase().includes(lowerSearchTerm);
        }).sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime());
    }, [searchTerm, statusFilter]);

    return (
        <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white tracking-tight">Shop Management</h1>

            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:w-1/3">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Shop Name or Owner..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
                <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as ShopStatus | 'all')}
                    className="w-full md:w-auto bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    <option value="all">All Statuses</option>
                    {Object.values(ShopStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Shop Name</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Owner</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Total Orders</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Total Revenue</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredShops.map((shop) => (
                                <tr key={shop.id} className="hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{shop.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{shop.owner}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(shop.status)}`}>
                                            {shop.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-300">{shop.totalOrders}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">ETB {shop.totalRevenue.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => onViewShop(shop.id)} className="text-teal-400 hover:text-teal-300">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Shops;