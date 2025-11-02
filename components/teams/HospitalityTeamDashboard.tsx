import React, { useState } from 'react';
import type { TeamMember } from '../../types';
import { HomeIcon, BellIcon, MailIcon, SwitchIcon, LogoutIcon } from '../IconComponents';
import TeamDashboardLayout from './TeamDashboardLayout';
import { MOCK_HOSPITALITY_GUESTS, MOCK_CATERING_SCHEDULE } from '../../constants';

interface HospitalityTeamDashboardProps {
    user: TeamMember;
    onLogout: () => void;
    onSwitchDashboard: () => void;
}

const HospitalityTeamDashboard: React.FC<HospitalityTeamDashboardProps> = ({ user, onLogout, onSwitchDashboard }) => {
    const [activeTab, setActiveTab] = useState('guests');

    const renderGuests = () => (
        <div className="bg-surface rounded-lg border border-border overflow-hidden">
            <table className="min-w-full divide-y divide-border">
                <thead className="bg-background/80">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase">Guest</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase">Arrival</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase">Transport</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase">Accommodation</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-surface divide-y divide-border">
                    {MOCK_HOSPITALITY_GUESTS.map(guest => (
                        <tr key={guest.id}>
                            <td className="px-6 py-4 whitespace-nowrap font-semibold">{guest.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{guest.arrival}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{guest.transport}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{guest.accommodation}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${guest.status === 'Checked In' ? 'bg-success/10 text-success-dark' : 'bg-accent/20 text-accent-dark'}`}>{guest.status}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderCatering = () => (
        <div className="space-y-4">
            {MOCK_CATERING_SCHEDULE.map(item => (
                <div key={item.id} className="bg-surface p-4 rounded-lg border border-border flex justify-between items-center">
                    <div>
                        <p className="font-bold text-text-primary">{item.meal}</p>
                        <p className="text-sm text-text-secondary">{item.time} @ {item.vendor}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'Delivered' ? 'bg-success/10 text-success-dark' : 'bg-primary/10 text-primary'}`}>{item.status}</span>
                </div>
            ))}
        </div>
    );
    
    const tabs = [
        { id: 'guests', label: 'Guests' },
        { id: 'catering', label: 'Catering' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'guests': return renderGuests();
            case 'catering': return renderCatering();
            default: return null;
        }
    };

    return (
        <TeamDashboardLayout
            user={user}
            onLogout={onLogout}
            onSwitchDashboard={onSwitchDashboard}
            title="Hospitality"
            navIcon={HomeIcon}
        >
            <div className="border-b border-border mb-6">
                <div className="flex space-x-8">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-3 px-1 font-semibold transition-colors duration-200 ${activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary/80'}`}>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            {renderContent()}
        </TeamDashboardLayout>
    );
};

export default HospitalityTeamDashboard;