import React, { useState } from 'react';
import type { TeamMember } from '../../types';
import { WrenchIcon, BellIcon, MailIcon, SwitchIcon, LogoutIcon } from '../IconComponents';
import TeamDashboardLayout from './TeamDashboardLayout';
import { MOCK_TECH_EQUIPMENT, MOCK_TECH_ISSUES } from '../../constants';

interface TechnicalTeamDashboardProps {
    user: TeamMember;
    onLogout: () => void;
    onSwitchDashboard: () => void;
}

const TechnicalTeamDashboard: React.FC<TechnicalTeamDashboardProps> = ({ user, onLogout, onSwitchDashboard }) => {
    const [activeTab, setActiveTab] = useState('equipment');

     const getStatusPill = (status: string) => {
        switch (status) {
            case 'Working': return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-success/10 text-success-dark">{status}</span>;
            case 'In Use': return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">{status}</span>;
            case 'Faulty': return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-danger/10 text-danger-dark">{status}</span>;
            default: return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
        }
    }

    const getPriorityPill = (priority: string) => {
        const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
        switch (priority) {
            case 'High': return <span className={`${baseClasses} bg-danger/10 text-danger-dark`}>{priority}</span>;
            case 'Medium': return <span className={`${baseClasses} bg-accent/20 text-accent-dark`}>{priority}</span>;
            case 'Low': return <span className={`${baseClasses} bg-success/10 text-success-dark`}>{priority}</span>;
            default: return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{priority}</span>;
        }
    };

    const renderEquipment = () => (
         <div className="bg-surface rounded-lg border border-border overflow-hidden">
            <table className="min-w-full divide-y divide-border">
                <thead className="bg-background/80">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase">Equipment</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase">Location</th>
                    </tr>
                </thead>
                <tbody className="bg-surface divide-y divide-border">
                    {MOCK_TECH_EQUIPMENT.map(item => (
                        <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap font-semibold">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{getStatusPill(item.status)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    
    const renderIssues = () => (
        <div className="space-y-4">
            {MOCK_TECH_ISSUES.map(issue => (
                <div key={issue.id} className="bg-surface p-4 rounded-lg border border-border flex justify-between items-center">
                    <div>
                        <p className="font-bold text-text-primary">{issue.title}</p>
                        <p className="text-sm text-text-secondary">Reported by: {issue.reportedBy}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        {getPriorityPill(issue.priority)}
                         <span className={`px-2 py-1 text-xs font-semibold rounded-full ${issue.status === 'Open' ? 'bg-danger/10 text-danger-dark' : 'bg-primary/10 text-primary'}`}>{issue.status}</span>
                    </div>
                </div>
            ))}
        </div>
    );
    
    const tabs = [
        { id: 'equipment', label: 'Equipment' },
        { id: 'issues', label: 'Issues' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'equipment': return renderEquipment();
            case 'issues': return renderIssues();
            default: return null;
        }
    };


    return (
        <TeamDashboardLayout
            user={user}
            onLogout={onLogout}
            onSwitchDashboard={onSwitchDashboard}
            title="Technical"
            navIcon={WrenchIcon}
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

export default TechnicalTeamDashboard;