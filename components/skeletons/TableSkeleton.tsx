
import React from 'react';

interface TableSkeletonProps {
    rows?: number;
    columns: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 10, columns }) => {
    return (
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700/50">
                        <tr>
                            {Array.from({ length: columns }).map((_, i) => (
                                <th key={i} scope="col" className="px-6 py-4">
                                    <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {Array.from({ length: rows }).map((_, i) => (
                            <tr key={i}>
                                {Array.from({ length: columns }).map((_, j) => (
                                     <td key={j} className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-4 bg-gray-700 rounded"></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableSkeleton;
