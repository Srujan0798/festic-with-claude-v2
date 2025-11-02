import React from 'react';
import type { Event } from '../../types';
import { AlertTriangleIcon, PlusSquareIcon } from '../IconComponents';

interface TeamPrincipleIncidentReportPageProps {
  event: Event;
}

const incidents = [
    { id: 'inc-1', title: 'Minor Injury at Dance Show', severity: 'Low', time: 'Day 1, 7:15 PM', status: 'Resolved' },
    { id: 'inc-2', title: 'Lost Wallet Reported', severity: 'Medium', time: 'Day 1, 8:00 PM', status: 'Pending' },
    { id: 'inc-3', title: 'Technical Issue at Main Stage', severity: 'High', time: 'Day 2, 6:30 PM', status: 'Resolved' },
];

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

const TeamPrincipleIncidentReportPage: React.FC<TeamPrincipleIncidentReportPageProps> = ({ event }) => {
    return (
        <div className="p-8 animate-fade-in">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary">Incident Reporting</h1>
                    <p className="text-text-secondary mt-1">Log and track incidents during {event.name}.</p>
                </div>
                <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-danger rounded-lg hover:opacity-90">
                    <PlusSquareIcon className="w-5 h-5 mr-2" />
                    Report New Incident
                </button>
            </header>

            <div className="bg-surface rounded-lg border border-border overflow-hidden">
                <table className="min-w-full divide-y divide-border">
                    <thead className="bg-background/80">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase tracking-wider">Incident</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase tracking-wider">Severity</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-surface divide-y divide-border">
                        {incidents.map(inc => (
                            <tr key={inc.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <p className="font-semibold text-text-primary">{inc.title}</p>
                                    <p className="text-sm text-text-secondary">{inc.time}</p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{getSeverityPill(inc.severity)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{getStatusPill(inc.status)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-primary hover:underline">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
            `}</style>
        </div>
    );
};

export default TeamPrincipleIncidentReportPage;
