import React from 'react';

interface PerformanceData {
  date: string;
  orders: number;
  revenue: number;
}

interface ShopPerformanceChartProps {
  data: PerformanceData[];
}

const ShopPerformanceChart: React.FC<ShopPerformanceChartProps> = ({ data }) => {
  const maxOrders = Math.max(...data.map(d => d.orders), 1);
  const maxRevenue = Math.max(...data.map(d => d.revenue), 1);

  const getMonthLabel = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short' });
  }

  return (
    <>
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-6">
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-teal-500"></span>Total Orders</span>
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-cyan-500"></span>Total Revenue (ETB)</span>
        </div>
        <div className="flex items-end h-64 gap-4">
            {data.map(d => (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="relative w-full h-full flex items-end justify-center gap-1">
                        {/* Orders Bar */}
                        <div 
                            className="w-1/2 bg-teal-500 rounded-t-md transition-all duration-300 ease-in-out group-hover:bg-teal-400 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-teal-500/40"
                            style={{ height: `${(d.orders / maxOrders) * 100}%` }}
                        />
                        {/* Revenue Bar */}
                         <div 
                            className="w-1/2 bg-cyan-500 rounded-t-md transition-all duration-300 ease-in-out group-hover:bg-cyan-400 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-cyan-500/40"
                            style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                        />
                         <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 dark:bg-black p-2 rounded-md shadow-lg text-xs z-10 w-max pointer-events-none">
                            <div className="font-bold text-white">{new Date(d.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                            <div className="text-teal-400">Orders: {d.orders}</div>
                            <div className="text-cyan-400">Revenue: ETB {d.revenue.toLocaleString()}</div>
                        </div>
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{getMonthLabel(d.date)}</span>
                </div>
            ))}
        </div>
    </>
  );
};

export default ShopPerformanceChart;