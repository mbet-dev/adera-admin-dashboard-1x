import React, { useState, useMemo } from 'react';
import { mockTransactions } from '../data/mockData';
import { type Transaction, type TransactionCategory } from '../types';
import { DollarSignIcon, FinancialsIcon, GoogleSheetsIcon, LineChartIcon, PdfIcon, ProfitLossIcon } from './Icons';
import KpiCard from './KpiCard';

const ExportButtons: React.FC = () => (
    <div className="flex items-center gap-2">
        <button onClick={() => alert('Exporting to Google Sheets...')} className="flex items-center gap-2 text-sm bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            <GoogleSheetsIcon className="h-5 w-5 text-green-400" />
            <span className="hidden sm:inline">Export to Sheets</span>
        </button>
        <button onClick={() => alert('Downloading PDF...')} className="flex items-center gap-2 text-sm bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            <PdfIcon className="h-5 w-5 text-red-400" />
            <span className="hidden sm:inline">Download PDF</span>
        </button>
    </div>
);

const RevenueChart: React.FC<{ 
    transactions: Transaction[],
    selectedMonth: string | null;
    onMonthSelect: (month: string | null) => void;
}> = ({ transactions, selectedMonth, onMonthSelect }) => {
    const [timeRange, setTimeRange] = useState('6M');
    const [chartView, setChartView] = useState<'bar' | 'line'>('bar');
    
    const chartData = useMemo(() => {
        const months = Number(timeRange.replace('M', ''));
        const now = new Date();
        const data: { [key: string]: { 'Adera-PTP': number; 'Adera-Shop': number, Total: number } } = {};

        for (let i = months - 1; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthKey = date.toLocaleString('default', { month: 'short' });
            data[monthKey] = { 'Adera-PTP': 0, 'Adera-Shop': 0, Total: 0 };
        }

        transactions.forEach(t => {
            const tDate = new Date(t.date);
            if ((now.getTime() - tDate.getTime()) < months * 30 * 24 * 60 * 60 * 1000 && t.amount > 0) {
                 const monthKey = tDate.toLocaleString('default', { month: 'short' });
                 if(data[monthKey]) {
                    if (t.category === 'Adera-PTP') data[monthKey]['Adera-PTP'] += t.amount;
                    if (t.category === 'Adera-Shop') data[monthKey]['Adera-Shop'] += t.amount;
                    data[monthKey].Total += t.amount;
                 }
            }
        });

        return Object.entries(data).map(([label, values]) => ({ label, ...values }));
    }, [transactions, timeRange]);

    const maxValue = Math.max(...chartData.map(d => d.Total), 1); // Avoid division by zero
    
    const lineChartPaths = useMemo(() => {
        if (chartData.length <= 1) return { ptp: '', shop: ''};
        const ptpPath = chartData.map((d, i) => {
            const x = (i / (chartData.length -1)) * 100;
            const y = 100 - (d['Adera-PTP'] / maxValue) * 100;
            return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
        }).join(' ');

        const shopPath = chartData.map((d, i) => {
            const x = (i / (chartData.length -1)) * 100;
            const y = 100 - (d['Adera-Shop'] / maxValue) * 100;
            return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
        }).join(' ');

        return { ptp: ptpPath, shop: shopPath };
    }, [chartData, maxValue]);

    return (
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 h-full flex flex-col">
            <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">Revenue Overview</h3>
                <div className="flex items-center gap-2">
                    <div className="flex gap-1 bg-gray-700 p-1 rounded-lg">
                        {['1M', '6M', '12M'].map(range => (
                            <button key={range} onClick={() => setTimeRange(range)} className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${timeRange === range ? 'bg-teal-500 text-white' : 'text-gray-400 hover:bg-gray-600'}`}>
                                {range}
                            </button>
                        ))}
                    </div>
                     <div className="flex gap-1 bg-gray-700 p-1 rounded-lg">
                        <button onClick={() => setChartView('bar')} className={`p-1.5 rounded-md transition-colors ${chartView === 'bar' ? 'bg-teal-500 text-white' : 'text-gray-400 hover:bg-gray-600'}`}>
                            <FinancialsIcon className="h-4 w-4" />
                        </button>
                         <button onClick={() => setChartView('line')} className={`p-1.5 rounded-md transition-colors ${chartView === 'line' ? 'bg-teal-500 text-white' : 'text-gray-400 hover:bg-gray-600'}`}>
                            <LineChartIcon className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-grow">
              {chartView === 'bar' ? (
                <div className="flex items-end h-full gap-2 sm:gap-4">
                    {chartData.map(d => (
                        <div key={d.label} className={`flex-1 flex flex-col items-center gap-2 group cursor-pointer transition-opacity duration-300 ${selectedMonth && selectedMonth !== d.label ? 'opacity-30' : 'opacity-100'}`} onClick={() => onMonthSelect(selectedMonth === d.label ? null : d.label)}>
                            <div className={`relative w-full h-full flex items-end transition-all duration-300 ${selectedMonth === d.label ? 'ring-2 ring-teal-400 rounded-t-lg' : ''}`}>
                                <div className="absolute bottom-0 w-full bg-gray-700 rounded-t-lg" style={{ height: `${(d.Total / maxValue) * 100}%` }}>
                                    <div className="absolute bottom-0 w-full bg-cyan-500 rounded-t-lg" style={{ height: `${d.Total > 0 ? (d['Adera-Shop'] / d.Total) * 100 : 0}%` }}/>
                                    <div className="absolute bottom-0 w-full bg-teal-500 rounded-t-lg" style={{ height: `${d.Total > 0 ? (d['Adera-PTP'] / d.Total) * 100 : 0}%` }}/>
                                </div>
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 p-2 rounded-md shadow-lg text-xs z-10 w-max pointer-events-none">
                                    <div className="font-bold text-white">{d.label}</div>
                                    <div><span className="font-bold text-gray-300">Total:</span> ETB {d.Total.toFixed(2)}</div>
                                    <div className="text-teal-400">PTP: ETB {d['Adera-PTP'].toFixed(2)}</div>
                                    <div className="text-cyan-400">Shop: ETB {d['Adera-Shop'].toFixed(2)}</div>
                                </div>
                            </div>
                            <span className="text-xs font-medium text-gray-400">{d.label}</span>
                        </div>
                    ))}
                </div>
              ) : (
                 <div className="w-full h-full relative">
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
                        {chartData.map(d => (<span key={d.label} className="text-xs text-gray-400">{d.label}</span>))}
                    </div>
                     <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="overflow-visible">
                        <path d={lineChartPaths.shop} fill="none" stroke="#22d3ee" strokeWidth="1" />
                        <path d={lineChartPaths.ptp} fill="none" stroke="#2dd4bf" strokeWidth="1" />
                     </svg>
                     <div className="absolute inset-0 flex justify-between">
                        {chartData.map((d, i) => {
                            const x = (i / (chartData.length - 1)) * 100;
                            return (
                                <div key={d.label} className={`relative h-full group cursor-pointer transition-opacity duration-300 ${selectedMonth && selectedMonth !== d.label ? 'opacity-30' : 'opacity-100'}`} style={{ left: `${x}%`, transform: 'translateX(-50%)', width: `${100/chartData.length}%` }} onClick={() => onMonthSelect(selectedMonth === d.label ? null : d.label)}>
                                     <div className={`absolute w-3 h-3 bg-gray-900 border-2 rounded-full -translate-x-1/2 -translate-y-1/2 ${selectedMonth === d.label ? 'border-teal-300 scale-125' : 'border-cyan-500'}`} style={{ top: `${100 - (d['Adera-Shop'] / maxValue) * 100}%`, left: '50%' }} />
                                     <div className={`absolute w-3 h-3 bg-gray-900 border-2 rounded-full -translate-x-1/2 -translate-y-1/2 ${selectedMonth === d.label ? 'border-teal-300 scale-125' : 'border-teal-500'}`} style={{ top: `${100 - (d['Adera-PTP'] / maxValue) * 100}%`, left: '50%' }} />
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 p-2 rounded-md shadow-lg text-xs z-10 w-max pointer-events-none">
                                        <div className="font-bold text-white">{d.label}</div>
                                        <div><span className="font-bold text-gray-300">Total:</span> ETB {d.Total.toFixed(2)}</div>
                                        <div className="text-teal-400">PTP: ETB {d['Adera-PTP'].toFixed(2)}</div>
                                        <div className="text-cyan-400">Shop: ETB {d['Adera-Shop'].toFixed(2)}</div>
                                    </div>
                                </div>
                            )
                        })}
                     </div>
                 </div>
              )}
            </div>
        </div>
    );
};

const IncomeBreakdown: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
    const breakdown = useMemo(() => {
        const result = { 'Adera-PTP': 0, 'Adera-Shop': 0 };
        transactions.forEach(t => {
            if (t.category === 'Adera-PTP' || t.category === 'Adera-Shop') {
                result[t.category] += t.amount > 0 ? t.amount : 0;
            }
        });
        return result;
    }, [transactions]);
    const total = breakdown['Adera-PTP'] + breakdown['Adera-Shop'];
    const ptpPercent = total > 0 ? (breakdown['Adera-PTP'] / total) * 100 : 0;
    const shopPercent = total > 0 ? (breakdown['Adera-Shop'] / total) * 100 : 0;

    const circumference = 2 * Math.PI * 54;

    return (
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 h-full">
            <h3 className="text-xl font-semibold text-white mb-4">Income Breakdown</h3>
            <div className="flex flex-col items-center justify-center gap-6">
                <div className="relative">
                    <svg className="transform -rotate-90" width="160" height="160" viewBox="0 0 120 120">
                       <circle cx="60" cy="60" r="54" fill="none" stroke="#374151" strokeWidth="12" />
                       <circle cx="60" cy="60" r="54" fill="none" stroke="#2dd4bf" strokeWidth="12" strokeDasharray={`${circumference * (ptpPercent / 100)} ${circumference}`} />
                       <circle cx="60" cy="60" r="54" fill="none" stroke="#22d3ee" strokeWidth="12" strokeDasharray={`${circumference * (shopPercent / 100)} ${circumference}`}  strokeDashoffset={-circumference * (ptpPercent / 100)} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-white">{ptpPercent.toFixed(0)}%</span>
                        <span className="text-xs text-gray-400">Adera-PTP</span>
                    </div>
                </div>
                <div className="w-full space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-teal-500"></span>Adera-PTP</span>
                        <span className="font-semibold text-white">ETB {breakdown['Adera-PTP'].toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-cyan-500"></span>Adera-Shop</span>
                        <span className="font-semibold text-white">ETB {breakdown['Adera-Shop'].toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProfitAndLossStatement: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
    const pnlData = useMemo(() => {
        const monthlyData: { [key: string]: { revenue: number, expenses: number } } = {};
        
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthKey = date.toLocaleString('default', { month: 'short' });
            monthlyData[monthKey] = { revenue: 0, expenses: 0 };
        }

        transactions.forEach(t => {
            const monthKey = new Date(t.date).toLocaleString('default', { month: 'short' });
            if (monthlyData[monthKey]) {
                if (t.amount > 0) {
                    monthlyData[monthKey].revenue += t.amount;
                } else {
                    monthlyData[monthKey].expenses += Math.abs(t.amount);
                }
            }
        });
        
        const chartData = Object.entries(monthlyData).map(([label, values]) => ({
            label,
            netProfit: values.revenue - values.expenses,
        }));

        const maxAbsValue = Math.max(...chartData.map(d => Math.abs(d.netProfit)), 1);

        return { chartData, maxAbsValue };
    }, [transactions]);
    
    const { totalRevenue, totalExpenses, netProfit } = useMemo(() => {
        return transactions.reduce((acc, t) => {
            if (t.amount > 0) acc.totalRevenue += t.amount;
            else acc.totalExpenses += Math.abs(t.amount);
            acc.netProfit += t.amount;
            return acc;
        }, { totalRevenue: 0, totalExpenses: 0, netProfit: 0});
    }, [transactions]);

    return (
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Profit & Loss Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
                <div>
                    <p className="text-sm text-gray-400">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-400">ETB {totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-400">ETB {totalExpenses.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Net Profit</p>
                    <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-white' : 'text-red-400'}`}>ETB {netProfit.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                </div>
            </div>
            <div className="h-64 w-full">
                <div className="flex items-end h-full gap-2 sm:gap-4 border-t border-gray-600 pt-4">
                    {pnlData.chartData.map(d => {
                        const isPositive = d.netProfit >= 0;
                        const barHeight = (Math.abs(d.netProfit) / pnlData.maxAbsValue) * 100;
                        return (
                            <div key={d.label} className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="relative w-full h-full flex items-end justify-center">
                                    <div className={`${isPositive ? 'bg-green-500' : 'bg-red-500'} w-full rounded-t-md group-hover:opacity-80 transition-opacity`} style={{ height: `${barHeight}%` }} />
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 p-2 rounded-md shadow-lg text-xs z-10 w-max pointer-events-none">
                                        <div className="font-bold text-white">{d.label}</div>
                                        <div className={`${isPositive ? 'text-green-400' : 'text-red-400'}`}>Net: ETB {d.netProfit.toFixed(2)}</div>
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-gray-400">{d.label}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

const RecentTransactions: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
    const getCategoryClass = (category: TransactionCategory) => {
        switch(category) {
            case 'Adera-PTP': return 'bg-teal-900 text-teal-300';
            case 'Adera-Shop': return 'bg-cyan-900 text-cyan-300';
            case 'Platform Fee': return 'bg-blue-900 text-blue-300';
            case 'Expense': return 'bg-red-900 text-red-300';
            default: return 'bg-gray-700 text-gray-300';
        }
    };
    
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700/50">
                    <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Category</th>
                        <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">Amount</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {transactions.length > 0 ? transactions.slice(0, 15).map(t => (
                        <tr key={t.id} className="hover:bg-gray-700/50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{t.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{new Date(t.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryClass(t.category)}`}>
                                    {t.category}
                                </span>
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-mono ${t.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {t.amount >= 0 ? '+' : ''}{t.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={4} className="text-center py-8 text-gray-400">No transactions match the current filters.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

const Financials: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const stats = useMemo(() => {
        return mockTransactions.reduce((acc, t) => {
            acc.totalRevenue += t.amount > 0 ? t.amount : 0;
            acc.netProfit += t.amount;
            if (t.category === 'Adera-PTP' && t.amount > 0) acc.ptpRevenue += t.amount;
            if (t.category === 'Adera-Shop' && t.amount > 0) acc.shopRevenue += t.amount;
            return acc;
        }, { totalRevenue: 0, netProfit: 0, ptpRevenue: 0, shopRevenue: 0 });
    }, []);

    const handleMonthSelect = (month: string | null) => {
        setSelectedMonth(month);
        if (month) {
            setStartDate('');
            setEndDate('');
        }
    };

    const handleDateChange = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
        if (start || end) {
            setSelectedMonth(null);
        }
    }

    const clearFilters = () => {
        setSelectedMonth(null);
        setStartDate('');
        setEndDate('');
    };

    const { filteredTransactions, title, isFilterActive } = useMemo(() => {
        let transactions = [...mockTransactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        let title = 'Recent Transactions';
        let isFilterActive = false;

        if (selectedMonth) {
            const monthMap: { [key: string]: number } = {
                'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
                'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
            };
            const monthIndex = monthMap[selectedMonth];
            if (monthIndex !== undefined) {
                const currentYear = new Date().getFullYear();
                transactions = transactions.filter(t => {
                    const tDate = new Date(t.date);
                    // This logic might need refinement for multi-year data
                    return tDate.getMonth() === monthIndex && tDate.getFullYear() === currentYear;
                });
                title = `Transactions for ${selectedMonth} ${currentYear}`;
                isFilterActive = true;
            }
        } else if (startDate || endDate) {
             const start = startDate ? new Date(startDate) : null;
             if(start) start.setHours(0,0,0,0);
             const end = endDate ? new Date(endDate) : null;
             if(end) end.setHours(23, 59, 59, 999);

            transactions = transactions.filter(t => {
                const tDate = new Date(t.date);
                if (start && tDate < start) return false;
                if (end && tDate > end) return false;
                return true;
            });
            title = `Transactions from ${startDate || 'start'} to ${endDate || 'today'}`;
            isFilterActive = true;
        }

        return { filteredTransactions: transactions, title, isFilterActive };
    }, [selectedMonth, startDate, endDate]);


    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-start">
                <h1 className="text-4xl font-bold text-white tracking-tight">Financial Statistics</h1>
                <ExportButtons />
            </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Total Revenue" value={`ETB ${stats.totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}`} icon={DollarSignIcon} change="+8.1%" changeType="increase" />
                <KpiCard title="Net Profit" value={`ETB ${stats.netProfit.toLocaleString(undefined, {minimumFractionDigits: 2})}`} icon={ProfitLossIcon} change="+2.5%" changeType="increase" />
                <KpiCard title="Adera-PTP Revenue" value={`ETB ${stats.ptpRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}`} icon={DollarSignIcon} change="+11.3%" changeType="increase" />
                <KpiCard title="Adera-Shop Revenue" value={`ETB ${stats.shopRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}`} icon={DollarSignIcon} change="+6.2%" changeType="increase" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 min-h-[400px]">
                    <RevenueChart 
                        transactions={mockTransactions}
                        selectedMonth={selectedMonth}
                        onMonthSelect={handleMonthSelect}
                    />
                </div>
                <div className="min-h-[400px]">
                    <IncomeBreakdown transactions={filteredTransactions} />
                </div>
            </div>
            
            <ProfitAndLossStatement transactions={filteredTransactions} />

            <div className="space-y-6">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <h3 className="text-xl font-semibold text-white">Filter Transactions</h3>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                                <label htmlFor="startDate" className="text-sm text-gray-400 shrink-0">Start Date</label>
                                <input type="date" id="startDate" value={startDate} onChange={(e) => handleDateChange(e.target.value, endDate)} 
                                    className="bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"/>
                            </div>
                            <div className="flex items-center gap-2">
                                <label htmlFor="endDate" className="text-sm text-gray-400 shrink-0">End Date</label>
                                <input type="date" id="endDate" value={endDate} onChange={(e) => handleDateChange(startDate, e.target.value)}
                                    className="bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
                    <div className="p-6 flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-white">{title}</h3>
                        {isFilterActive && (
                            <button onClick={clearFilters} className="text-sm text-teal-400 hover:text-teal-300 font-semibold">Clear Filter</button>
                        )}
                    </div>
                    <RecentTransactions transactions={filteredTransactions} />
                </div>
            </div>
        </div>
    );
};

export default Financials;