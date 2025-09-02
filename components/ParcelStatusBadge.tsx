
import React from 'react';
import { ParcelStatus } from '../types';

interface ParcelStatusBadgeProps {
    status: ParcelStatus;
}

export const ParcelStatusBadge: React.FC<ParcelStatusBadgeProps> = ({ status }) => {
    const getStatusClasses = () => {
        switch (status) {
            case ParcelStatus.Created:
                return 'bg-gray-700 text-gray-300';
            case ParcelStatus.InTransit:
            case ParcelStatus.Dispatched:
                return 'bg-blue-900 text-blue-300';
            case ParcelStatus.AtSortingHub:
                return 'bg-purple-900 text-purple-300';
            case ParcelStatus.Delivered:
                return 'bg-green-900 text-green-300';
            case ParcelStatus.Failed:
                return 'bg-red-900 text-red-300';
            default:
                return 'bg-gray-700 text-gray-300';
        }
    };

    return (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses()}`}>
            {status}
        </span>
    );
};
