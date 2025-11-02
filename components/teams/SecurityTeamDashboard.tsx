import React, { useState } from 'react';
import type { TeamMember } from '../../types';
import { ShieldIcon, BellIcon, MailIcon, SwitchIcon, LogoutIcon } from '../IconComponents';
import TeamDashboardLayout from './TeamDashboardLayout';
import { MOCK_SECURITY_INCIDENTS, MOCK_SECURITY_ROSTER } from '../../constants';

interface SecurityTeamDashboardProps {
    user: TeamMember;
    onLogout: () => void;
    onSwitchDashboard: () => void;
}

const SecurityTeamDashboard: React.FC<SecurityTeamDashboardProps> = ({ user, onLogout, onSwitchDashboard }) => {
    const [activeTab, setActiveTab] = useState('incidents');

    const getSeverityPill = (severity: string) => {
        const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
        switch (severity) {
            case 'High': return <span className={`${baseClasses} bg-danger/10 text-danger-dark`}>{severity}</span>;
            case 'Medium': return <span className={`${baseClasses} bg-accent/20 text-accent-dark`}>{severity}</span>;
            case 'Low': return <span className={`${baseClasses} bg-success/10 text-success-dark`}>{severity}</span>;
            default: return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{severity}</span>;
        }
    };
    
    const getStatusPill = (status: string) => {
        const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
        if (status === 'Resolved') {
            return <span className={`${baseClasses} bg-gray-200 text-gray-800`}>{status}</span>;
        }
        return <span className={`${baseClasses} bg-primary/10 text-primary`}>{status}</span>;
    };


    const renderIncidents = () => (
         <div className="bg-surface rounded-lg border border-border overflow-hidden">
            <table className="min-w-full divide-y divide-border">
                <thead className="bg-background/80">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase">Incident</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase">Severity</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-surface divide-y divide-border">
                    {MOCK_SECURITY_INCIDENTS.map(inc => (
                        <tr key={inc.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <p className="font-semibold text-text-primary">{inc.title}</p>
                                <p className="text-sm text-text-secondary">{inc.time}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{getSeverityPill(inc.severity)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{getStatusPill(inc.status)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    
    const renderRoster = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_SECURITY_ROSTER.map(item => (
                <div key={item.id} className="bg-surface p-4 rounded-lg border border-border">
                    <p className="font-bold text-text-primary">{item.officer}</p>
                    <p className="text-sm text-text-secondary">{item.shift}</p>
                    <p className="text-sm font-semibold text-primary mt-2">Zone: {item.zone}</p>
                </div>
            ))}
        </div>
    );
    
    const tabs = [
        { id: 'incidents', label: 'Incidents' },
        { id: 'roster', label: 'Roster' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'incidents': return renderIncidents();
            case 'roster': return renderRoster();
            default: return null;
        }
    };

    return (
        <TeamDashboardLayout
            user={user}
            onLogout={onLogout}
            onSwitchDashboard={onSwitchDashboard}
            title="Security"
            navIcon={ShieldIcon}
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

export default SecurityTeamDashboard;