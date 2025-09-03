import React from 'react';

const ListItemSkeleton = () => (
    <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
        </div>
        <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded-full w-16"></div>
    </div>
);


const ListSkeleton: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6"></div>
        <div className="space-y-4">
            <ListItemSkeleton />
            <ListItemSkeleton />
            <ListItemSkeleton />
            <ListItemSkeleton />
            <ListItemSkeleton />
        </div>
    </div>
);

export default ListSkeleton;