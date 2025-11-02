import React, { useState } from 'react';
import type { Event, User, Vendor, Application } from '../../types';
import { MOCK_VENDORS, MOCK_APPLICATIONS, MOCK_USERS } from '../../constants';
import { ApplicationStatus } from '../../types';
import VendorCard from '../VendorCard';
import MobileHeader from '../MobileHeader';
import { ChevronLeftIcon, UsersIcon } from '../IconComponents';

interface HostEventManagementPageProps {
  event: Event;
  user: User;
  onBack: () => void;
}

type Tab = 'vendors' | 'team' | 'performances' | 'guests';

// Mock teams for assignment
const eventTeams = ['Media & Publicity', 'Sponsorship & Marketing', 'Logistics'];
const mockAssignments: Record<string, string> = { 'app-1': 'Media & Publicity' };

const HostEventManagementPage: React.FC<HostEventManagementPageProps> = ({ event, user, onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>('vendors');
  const [assignments, setAssignments] = useState(mockAssignments);
  
  const applications = MOCK_APPLICATIONS.filter(app => app.eventId === event.id);

  const handleAssign = (appId: string, team: string) => {
    setAssignments(prev => ({...prev, [appId]: team}));
  };

  const getStatusPill = (status: ApplicationStatus) => {
    switch (status) {
        case ApplicationStatus.Approved:
            return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-success/10 text-success-dark">Approved</span>;
        case ApplicationStatus.Rejected:
            return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-danger/10 text-danger-dark">Rejected</span>;
        case ApplicationStatus.Pending:
        default:
            return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent-dark">Pending</span>;
    }
  }
  
  const renderTeamManagement = () => (
    // ... existing team management code ...
    <div className="text-center py-20 border-2 border-dashed border-border rounded-lg">
        <h2 className="text-xl font-semibold text-text-primary">Team Management</h2>
        <p className="text-text-secondary mt-2">This section is under construction.</p>
    </div>
  );

  const renderVendorManagement = () => {
    const assignedApps = applications.filter(app => assignments[app.id]);
    const unassignedApps = applications.filter(app => !assignments[app.id]);

    const VendorRow: React.FC<{app: Application}> = ({ app }) => {
        const vendor = MOCK_VENDORS.find(v => v.id === app.vendorId);
        if (!vendor) return null;
        return (
             <tr key={app.id}>
                <td className="px-6 py-4 whitespace-nowrap"><VendorCard vendor={vendor} /></td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusPill(app.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    {assignments[app.id] ? (
                        <span className="font-semibold text-text-primary">{assignments[app.id]}</span>
                    ) : (
                         <select onChange={(e) => handleAssign(app.id, e.target.value)} className="text-sm rounded-md border-border focus:ring-primary focus:border-primary">
                            <option>Assign to...</option>
                            {eventTeams.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {app.status === ApplicationStatus.Pending && (
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 text-xs text-white bg-success rounded-md hover:bg-success-dark">Approve</button>
                            <button className="px-3 py-1 text-xs text-white bg-danger rounded-md hover:bg-danger-dark">Reject</button>
                        </div>
                    )}
                </td>
            </tr>
        )
    };
    
    const VendorCardMobile: React.FC<{app: Application}> = ({ app }) => {
        const vendor = MOCK_VENDORS.find(v => v.id === app.vendorId);
        if (!vendor) return null;
        return (
            <div className="bg-surface p-4 rounded-lg border border-border space-y-3">
                <VendorCard vendor={vendor} />
                <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold">Status:</p>
                    {getStatusPill(app.status)}
                </div>
                 <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold">Assignment:</p>
                    {assignments[app.id] ? <span className="font-semibold text-text-primary text-sm">{assignments[app.id]}</span> : 'Unassigned'}
                </div>
                {app.status === ApplicationStatus.Pending && (
                    <div className="flex space-x-2 pt-2 border-t border-border">
                        <button className="flex-1 px-3 py-2 text-sm text-white bg-success rounded-md">Approve</button>
                        <button className="flex-1 px-3 py-2 text-sm text-white bg-danger rounded-md">Reject</button>
                    </div>
                )}
            </div>
        )
    };

    return (
     <div className="space-y-8">
        {/* Mobile View */}
        <div className="lg:hidden space-y-6">
            <div>
                <h3 className="text-xl font-bold text-text-primary mb-4">Assigned Vendors</h3>
                <div className="space-y-4">{assignedApps.map(app => <VendorCardMobile key={app.id} app={app} />)}</div>
            </div>
            <div>
                <h3 className="text-xl font-bold text-text-primary mb-4">Unassigned Vendors</h3>
                <div className="space-y-4">{unassignedApps.map(app => <VendorCardMobile key={app.id} app={app} />)}</div>
            </div>
        </div>
        {/* Desktop View */}
        <div className="hidden lg:block bg-surface rounded-lg border border-border overflow-hidden">
            <table className="min-w-full divide-y divide-border">
                <thead className="bg-background/80">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase">Vendor</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase">Assigned Team</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-surface divide-y divide-border">
                    {applications.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-text-secondary">No vendor applications yet.</td></tr>}
                    {applications.map(app => <VendorRow key={app.id} app={app} />)}
                </tbody>
            </table>
        </div>
     </div>
    );
  };

  const renderPlaceholder = (title: string) => (
    <div className="text-center py-20 border-2 border-dashed border-border rounded-lg">
       <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
       <p className="text-text-secondary mt-2">This section is under construction. Check back soon!</p>
   </div>
);

const renderContent = () => {
    switch (activeTab) {
        case 'vendors': return renderVendorManagement();
        case 'team': return renderTeamManagement();
        case 'performances': return renderPlaceholder("Performances List");
        case 'guests': return renderPlaceholder("Guest List Management");
        default: return null;
    }
};

const tabs : {id: Tab, label: string}[] = [
    {id: 'vendors', label: 'Vendors'},
    {id: 'team', label: 'Team'},
    {id: 'performances', label: 'Performances'},
    {id: 'guests', label: 'Guests'},
];


  return (
    <div className="animate-fade-in">
        <div className="lg:hidden">
            <MobileHeader user={user} title={event.name} showBackButton onBack={onBack}/>
        </div>
        <div className="p-4 md:p-8">
          <header className="mb-8 hidden lg:block">
            <button onClick={onBack} className="flex items-center text-sm text-text-secondary font-semibold mb-4 hover:text-primary">
              <ChevronLeftIcon className="w-5 h-5 mr-1" />
              Back to Events Dashboard
            </button>
            <h1 className="text-4xl font-extrabold text-text-primary tracking-tight">{event.name}</h1>
            <p className="text-lg mt-1 text-text-secondary">{event.university}</p>
          </header>

           <div className="border-b border-border mb-6">
                <div className="flex space-x-8 overflow-x-auto whitespace-nowrap">
                    {tabs.map(tab => (
                         <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-3 px-1 font-semibold transition-colors duration-200 ${activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary/80'}`}>
                            {tab.label}
                        </button>
                    ))}
                </div>
           </div>

            <div>
                {renderContent()}
            </div>
        </div>


      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
      `}</style>
    </div>
  );
};

export default HostEventManagementPage;