
import React from 'react';

const KpiCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-start justify-between border border-gray-700 animate-pulse">
      <div>
        <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
        <div className="h-8 bg-gray-700 rounded w-32 mb-3"></div>
        <div className="h-4 bg-gray-700 rounded w-20"></div>
      </div>
      <div className="bg-gray-700 p-3 rounded-lg">
        <div className="h-6 w-6 bg-gray-600 rounded"></div>
      </div>
    </div>
  );
};

export default KpiCardSkeleton;
