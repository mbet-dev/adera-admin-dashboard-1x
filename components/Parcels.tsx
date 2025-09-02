
import React, { useState, useMemo } from 'react';
import { mockParcels } from '../data/mockData';
import { ParcelStatus } from '../types';
import { ParcelStatusBadge } from './ParcelStatusBadge';
import { SearchIcon } from './Icons';

const Parcels: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<ParcelStatus | 'all'>('all');

    const filteredParcels = useMemo(() => {
        return mockParcels
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
            })
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [searchTerm, statusFilter]);
    
    return (
        <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white tracking-tight">Parcel Management</h1>
            
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:w-1/3">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by ID, Sender, or Recipient..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
                <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as ParcelStatus | 'all')}
                    className="w-full md:w-auto bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    <option value="all">All Statuses</option>
                    {Object.values(ParcelStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Tracking ID</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Sender</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Recipient</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Last Update</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredParcels.map((parcel) => (
                                <tr key={parcel.id} className="hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-teal-400">{parcel.trackingId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{parcel.sender.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{parcel.recipient.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <ParcelStatusBadge status={parcel.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{new Date(parcel.updatedAt).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-teal-400 hover:text-teal-300">Track</button>
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

export default Parcels;
