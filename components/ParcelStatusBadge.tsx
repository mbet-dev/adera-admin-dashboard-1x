import React from 'react';
import { ParcelStatus } from '../types';

interface ParcelStatusBadgeProps {
    status: ParcelStatus;
}

export const ParcelStatusBadge: React.FC<ParcelStatusBadgeProps> = ({ status }) => {
    const getStatusClasses = () => {
        switch (status) {
            case ParcelStatus.Created:
                return 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
            case ParcelStatus.InTransit:
            case ParcelStatus.Dispatched:
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case ParcelStatus.AtSortingHub:
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
            case ParcelStatus.Delivered:
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case ParcelStatus.Failed:
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default:
                return 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses()}`}>
            {status}
        </span>
    );
};