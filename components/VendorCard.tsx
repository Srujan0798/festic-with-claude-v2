import React from 'react';
import type { Vendor } from '../types';

interface VendorCardProps {
    vendor: Vendor;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
    return (
        <div className="flex items-center space-x-4">
            <img src={vendor.imageUrl} alt={vendor.businessName} className="w-16 h-16 rounded-lg object-cover" />
            <div>
                <h4 className="font-semibold text-text-primary">{vendor.businessName}</h4>
                <p className="text-sm text-text-secondary">{vendor.category}</p>
            </div>
        </div>
    );
};

export default VendorCard;