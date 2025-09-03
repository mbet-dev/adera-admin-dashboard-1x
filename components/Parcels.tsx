import React, { useState, useMemo, useEffect } from 'react';
import { mockParcels } from '../data/mockData';
import { ParcelStatus, type Parcel } from '../types';
import { ParcelStatusBadge } from './ParcelStatusBadge';
import { SearchIcon, ArrowUpIcon, ArrowDownIcon } from './Icons';
import { TableSkeleton } from './skeletons';

type SortKey = 'trackingId' | 'sender.name' | 'recipient.name' | 'status' | 'updatedAt';
type SortDirection = 'asc' | 'desc';

const Parcels: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<ParcelStatus | 'all'>('all');
    const [isLoading, setIsLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: 'updatedAt', direction: 'desc' });

    const filteredParcels = useMemo(() => {
        let sortableItems = mockParcels
            .filter(parcel => {
                if (statusFilter !== 'all' && parcel.status !== statusFilter) {
                    return false;
                }
                const lowerSearchTerm = searchTerm.toLowerCase();
                return (
                    parcel.trackingId.toLowerCase().includes(lowerSearchTerm) ||
                    parcel.sender.name.toLowerCase().includes(lowerSearchTerm) ||
                    parcel.recipient.name.toLowerCase().includes(lowerSearchTerm)
                );
            });
        
        const getNestedValue = (obj: Parcel, path: SortKey) => {
            if (path === 'sender.name') return obj.sender.name;
            if (path === 'recipient.name') return obj.recipient.name;
            return obj[path as keyof Omit<Parcel, 'sender' | 'recipient'>];
        };

        sortableItems.sort((a, b) => {
            const aValue = getNestedValue(a, sortConfig.key);
            const bValue = getNestedValue(b, sortConfig.key);

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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Parcel Management</h1>
            
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:w-1/3">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by ID, Sender, or Recipient..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 pl-11 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
                <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as ParcelStatus | 'all')}
                    className="w-full md:w-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    <option value="all">All Statuses</option>
                    {Object.values(ParcelStatus).map(status => (
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
                                    <SortableHeader sortKey="trackingId">Tracking ID</SortableHeader>
                                    <SortableHeader sortKey="sender.name">Sender</SortableHeader>
                                    <SortableHeader sortKey="recipient.name">Recipient</SortableHeader>
                                    <SortableHeader sortKey="status">Status</SortableHeader>
                                    <SortableHeader sortKey="updatedAt">Last Update</SortableHeader>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredParcels.map((parcel) => (
                                    <tr key={parcel.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-teal-600 dark:text-teal-400">{parcel.trackingId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{parcel.sender.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{parcel.recipient.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <ParcelStatusBadge status={parcel.status} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(parcel.updatedAt).toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300">Track</button>
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

export default Parcels;