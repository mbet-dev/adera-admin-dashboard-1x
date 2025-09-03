
import React from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  change: string;
  changeType: 'increase' | 'decrease';
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon: Icon, change, changeType }) => {
  const changeColor = changeType === 'increase' ? 'text-green-400' : 'text-red-400';
  const changeIcon = changeType === 'increase' ? '▲' : '▼';

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-start justify-between border border-gray-700 hover:border-teal-500 transition-colors duration-300">
      <div>
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
        <div className="flex items-center mt-2">
          <span className={`text-sm font-semibold ${changeColor}`}>
            {changeIcon} {change}
          </span>
          <span className="text-sm text-gray-500 ml-2">vs last month</span>
        </div>
      </div>
      <div className="bg-teal-500/10 p-3 rounded-lg">
        <Icon className="h-6 w-6 text-teal-400" />
      </div>
    </div>
  );
};

export default KpiCard;