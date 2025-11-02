import React, { useState } from 'react';
import type { Event } from '../../types';
import { MOCK_VENDORS, MOCK_APPLICATIONS, MOCK_USERS } from '../../constants';
import { ApplicationStatus } from '../../types';
import VendorCard from '../VendorCard';
import { SearchIcon } from '../IconComponents';

interface TeamPrincipleVendorPageProps {
  event: Event;
}

// Mock data: Assume these vendors are assigned to this team principle's team
const assignedVendorApps = MOCK_APPLICATIONS.filter(app => ['app-1', 'app-2'].includes(app.id));
const vendorCoordinators = MOCK_USERS.filter(u => ['user-3', 'user-4'].includes(u.id));

const TeamPrincipleVendorPage: React.FC<TeamPrincipleVendorPageProps> = ({ event }) => {

    const getStatusPill = (status: ApplicationStatus) => {
        switch (status) {
            case ApplicationStatus.Approved: return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-success/10 text-success-dark">Approved</span>;
            case ApplicationStatus.Rejected: return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-danger/10 text-danger-dark">Rejected</span>;
            case ApplicationStatus.Pending:
            default: return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent-dark">Pending</span>;
        }
    }

    return (
        <div className="p-4 md:p-8 animate-fade-in">
            <header className="mb-8 hidden md:block">
                <h1 className="text-3xl font-bold text-text-primary">Vendor Management</h1>
                <p className="text-text-secondary mt-1">Coordinate assigned vendors for {event.name}.</p>
            </header>

            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-text-primary mb-4 border-b border-border pb-2">Assigned Vendors</h3>
                    <div className="space-y-4">
                        {assignedVendorApps.map(app => {
                            const vendor = MOCK_VENDORS.find(v => v.id === app.vendorId);
                            if (!vendor) return null;
                            return (
                                <div key={app.id} className="bg-surface p-4 rounded-lg border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <VendorCard vendor={vendor} />
                                    {getStatusPill(app.status)}
                                    <button className="text-sm font-semibold text-primary hover:underline">Manage</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
                 <div>
                    <h3 className="text-xl font-bold text-text-primary mb-4 border-b border-border pb-2">Your Vendor Coordinators</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {vendorCoordinators.map(user => (
                            <div key={user.id} className="bg-surface p-4 rounded-lg border border-border flex items-center space-x-4">
                                <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                                <div>
                                    <p className="font-semibold text-text-primary">{user.name}</p>
                                    <p className="text-sm text-text-secondary">{user.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
            `}</style>
        </div>
    );
};

export default TeamPrincipleVendorPage;