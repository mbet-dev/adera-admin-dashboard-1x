import React from 'react';

interface PerformanceData {
  month: string;
  orders: number;
  revenue: number;
}

interface ShopPerformanceChartProps {
  data: PerformanceData[];
}

const ShopPerformanceChart: React.FC<ShopPerformanceChartProps> = ({ data }) => {
  const maxOrders = Math.max(...data.map(d => d.orders), 1);
  const maxRevenue = Math.max(...data.map(d => d.revenue), 1);

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-2">Monthly Performance</h3>
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-teal-500"></span>Total Orders</span>
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-cyan-500"></span>Total Revenue (ETB)</span>
        </div>
        <div className="flex items-end h-64 gap-4">
            {data.map(d => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="relative w-full h-full flex items-end justify-center gap-1">
                        {/* Orders Bar */}
                        <div 
                            className="w-1/2 bg-teal-500 rounded-t-md group-hover:opacity-80 transition-opacity"
                            style={{ height: `${(d.orders / maxOrders) * 100}%` }}
                        />
                        {/* Revenue Bar */}
                         <div 
                            className="w-1/2 bg-cyan-500 rounded-t-md group-hover:opacity-80 transition-opacity"
                            style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                        />
                         <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 p-2 rounded-md shadow-lg text-xs z-10 w-max pointer-events-none">
                            <div className="font-bold text-white">{d.month}</div>
                            <div className="text-teal-400">Orders: {d.orders}</div>
                            <div className="text-cyan-400">Revenue: ETB {d.revenue.toLocaleString()}</div>
                        </div>
                    </div>
                    <span className="text-xs font-medium text-gray-400">{d.month}</span>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ShopPerformanceChart;
