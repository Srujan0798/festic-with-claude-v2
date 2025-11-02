import React, { useState } from 'react';
import type { TeamMember } from '../../types';
import { TruckIcon, BellIcon, MailIcon, SwitchIcon, LogoutIcon } from '../IconComponents';
import TeamDashboardLayout from './TeamDashboardLayout';
import { MOCK_INVENTORY_ITEMS, MOCK_LOGISTICS_TASKS } from '../../constants';

interface LogisticsTeamDashboardProps {
    user: TeamMember;
    onLogout: () => void;
    onSwitchDashboard: () => void;
}

const LogisticsTeamDashboard: React.FC<LogisticsTeamDashboardProps> = ({ user, onLogout, onSwitchDashboard }) => {
    const [activeTab, setActiveTab] = useState('inventory');

    const getStatusPill = (status: string) => {
        switch (status) {
            case 'Available': return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-success/10 text-success-dark">{status}</span>;
            case 'In Use': return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">{status}</span>;
            case 'Maintenance': return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent-dark">{status}</span>;
            default: return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
        }
    }

    const renderInventory = () => (
        <div className="bg-surface rounded-lg border border-border overflow-hidden">
            <table className="min-w-full divide-y divide-border">
                <thead className="bg-background/80">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase">Item</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase">Location</th>
                    </tr>
                </thead>
                <tbody className="bg-surface divide-y divide-border">
                    {MOCK_INVENTORY_ITEMS.map(item => (
                        <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap font-semibold">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{getStatusPill(item.status)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderTasks = () => (
        <div className="space-y-4">
            {MOCK_LOGISTICS_TASKS.map(task => (
                <div key={task.id} className="bg-surface p-4 rounded-lg border border-border flex justify-between items-center">
                    <div>
                        <p className="font-bold text-text-primary">{task.title}</p>
                        <p className="text-sm text-text-secondary">Assignee: {task.assignee}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${task.status === 'Done' ? 'bg-success/10 text-success-dark' : task.status === 'In Progress' ? 'bg-accent/20 text-accent-dark' : 'bg-danger/10 text-danger-dark'}`}>{task.status}</span>
                </div>
            ))}
        </div>
    );
    
    const tabs = [
        { id: 'inventory', label: 'Inventory' },
        { id: 'tasks', label: 'Tasks' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'inventory': return renderInventory();
            case 'tasks': return renderTasks();
            default: return null;
        }
    };

    return (
        <TeamDashboardLayout
            user={user}
            onLogout={onLogout}
            onSwitchDashboard={onSwitchDashboard}
            title="Logistics"
            navIcon={TruckIcon}
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

export default LogisticsTeamDashboard;