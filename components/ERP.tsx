import React, { useState, useMemo } from 'react';
import { mockEmployees, mockShifts } from '../data/mockData';
import KpiCard from './KpiCard';
import { TruckIcon, UsersIcon, MapIcon, CalendarIcon, ClipboardListIcon, SearchIcon, DashboardIcon, ArrowUpIcon, ArrowDownIcon } from './Icons';
import { type Employee, EmployeeRole, EmployeeStatus, type Shift } from '../types';

const ERPDashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Active Drivers" value={mockEmployees.filter(e => e.role === 'Driver' && e.status === 'Active').length.toString()} icon={TruckIcon} change="+2" changeType="increase" />
                <KpiCard title="Hub Workers" value={mockEmployees.filter(e => e.role === 'Hub Worker' && e.status === 'Active').length.toString()} icon={UsersIcon} change="+5" changeType="increase" />
                <KpiCard title="On-Time Delivery Rate" value="97.2%" icon={ClipboardListIcon} change="+0.5%" changeType="increase" />
                <KpiCard title="Hub Capacity" value="85%" icon={MapIcon} change="-1.2%" changeType="decrease" />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Driver Locations (Live)</h3>
                <div className="h-96 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">Map visualization would be here.</p>
                </div>
            </div>
        </div>
    )
};

type SortKey = 'name' | 'role' | 'status';
type SortDirection = 'asc' | 'desc';

const EmployeeRoster: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<EmployeeRole | 'all'>('all');
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: 'name', direction: 'asc' });
    
    const filteredEmployees = useMemo(() => {
        let sortableItems = mockEmployees.filter(emp => {
            if (roleFilter !== 'all' && emp.role !== roleFilter) return false;
            const lowerSearch = searchTerm.toLowerCase();
            return emp.name.toLowerCase().includes(lowerSearch) || emp.email.toLowerCase().includes(lowerSearch);
        });

        sortableItems.sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            
            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return sortableItems;

    }, [searchTerm, roleFilter, sortConfig]);

    const handleSort = (key: SortKey) => {
        let direction: SortDirection = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getStatusClass = (status: EmployeeStatus) => {
        switch(status) {
            case EmployeeStatus.Active: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case EmployeeStatus.OnLeave: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case EmployeeStatus.Inactive: return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        }
    }

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
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:w-1/3">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 pl-11 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
                <select 
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value as EmployeeRole | 'all')}
                    className="w-full md:w-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    <option value="all">All Roles</option>
                    {Object.values(EmployeeRole).map(role => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                         <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    <SortableHeader sortKey="name">Employee</SortableHeader>
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    <SortableHeader sortKey="role">Role</SortableHeader>
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                     <SortableHeader sortKey="status">Status</SortableHeader>
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Performance</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                           {filteredEmployees.map(emp => (
                               <tr key={emp.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                   <td className="px-6 py-4 whitespace-nowrap">
                                       <div className="flex items-center">
                                           <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-full" src={emp.avatarUrl} alt={emp.name} />
                                           </div>
                                           <div className="ml-4">
                                               <div className="text-sm font-medium text-gray-900 dark:text-white">{emp.name}</div>
                                               <div className="text-sm text-gray-500 dark:text-gray-400">{emp.id}</div>
                                           </div>
                                       </div>
                                   </td>
                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{emp.role}</td>
                                   <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(emp.status)}`}>
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{emp.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                        {emp.performance.onTimeDeliveryRate ? `OTD: ${emp.performance.onTimeDeliveryRate}%` : ''}
                                        {emp.performance.parcelsProcessed ? `PPH: ${emp.performance.parcelsProcessed}` : ''}
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

const ShiftScheduler: React.FC = () => {
    const today = new Date();
    const weekDays = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return date;
    });

    const getEmployeeById = (id: string): Employee | undefined => mockEmployees.find(e => e.id === id);
    
    const getRoleColor = (role: EmployeeRole) => {
        switch (role) {
            case EmployeeRole.Driver: return 'bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300';
            case EmployeeRole.HubWorker: return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300';
            case EmployeeRole.Manager: return 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300';
            default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
        }
    }

    return (
         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Weekly Shift Schedule</h3>
            <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                {weekDays.map(day => (
                    <div key={day.toISOString()} className="bg-gray-50 dark:bg-gray-800 p-2">
                        <div className="text-center font-semibold text-gray-800 dark:text-white text-sm">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        <div className="text-center text-xs text-gray-500 dark:text-gray-400">{day.toLocaleDateString('en-US', { day: '2-digit' })}</div>
                    </div>
                ))}
                {weekDays.map(day => {
                    const dayString = day.toISOString().split('T')[0];
                    const dayShifts = mockShifts.filter(s => s.date === dayString);
                    return (
                        <div key={dayString} className="bg-white dark:bg-gray-800 p-2 space-y-2 min-h-[200px]">
                            {dayShifts.map(shift => {
                                const emp = getEmployeeById(shift.employeeId);
                                if (!emp) return null;
                                return (
                                    <div key={shift.id} className={`p-1.5 rounded-md text-xs ${getRoleColor(emp.role)}`}>
                                        <p className="font-bold">{emp.name}</p>
                                        <p>{shift.startTime} - {shift.endTime}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
         </div>
    );
};

const LogisticsOverview: React.FC = () => {
    const hubs = [
        { id: 'HUB-BOLE', name: 'Bole Sorting Hub', capacity: 90, status: 'Operational', inbound: 120, outbound: 150 },
        { id: 'HUB-CMC', name: 'CMC Distribution Center', capacity: 75, status: 'Operational', inbound: 85, outbound: 80 },
        { id: 'HUB-PIASSA', name: 'Piassa Hub', capacity: 98, status: 'At Capacity', inbound: 200, outbound: 195 },
    ];
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
             <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Logistics Network Status</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Hub Name</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Current Capacity</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Parcels (In/Out)</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {hubs.map(hub => (
                            <tr key={hub.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{hub.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                                            <div className="bg-teal-500 h-2.5 rounded-full" style={{width: `${hub.capacity}%`}}></div>
                                        </div>
                                        <span className="text-sm ml-2 text-gray-600 dark:text-gray-300">{hub.capacity}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                    <span className="text-green-600 dark:text-green-400 font-mono">{hub.inbound}</span> / <span className="text-red-600 dark:text-red-400 font-mono">{hub.outbound}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{hub.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const ERP: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'employees' | 'scheduling' | 'logistics'>('dashboard');

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
        { id: 'employees', label: 'Employees', icon: UsersIcon },
        { id: 'scheduling', label: 'Scheduling', icon: CalendarIcon },
        { id: 'logistics', label: 'Logistics', icon: MapIcon },
    ] as const;

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <ERPDashboard />;
            case 'employees': return <EmployeeRoster />;
            case 'scheduling': return <ShiftScheduler />;
            case 'logistics': return <LogisticsOverview />;
            default: return null;
        }
    }
    
    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Enterprise Resource Planning</h1>

            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${
                                activeTab === tab.id
                                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300 dark:hover:border-gray-500'
                            } flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                        >
                            <tab.icon className="h-5 w-5" />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            
            <div>
                {renderContent()}
            </div>
        </div>
    );
};

export default ERP;