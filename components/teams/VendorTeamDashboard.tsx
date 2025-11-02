import React, { useState } from 'react';
import type { TeamMember } from '../../types';
import { ApplicationStatus } from '../../types';
import { MOCK_APPLICATIONS, MOCK_VENDORS, MOCK_EVENTS } from '../../constants';
import VendorCard from '../VendorCard';
import { BriefcaseIcon, BellIcon, MailIcon, LogoutIcon } from '../IconComponents';
import TeamDashboardLayout from './TeamDashboardLayout';

const VendorTeamDashboard: React.FC<{ user: TeamMember, onLogout: () => void, onSwitchDashboard: () => void }> = ({ user, onLogout, onSwitchDashboard }) => {
  const [activeTab, setActiveTab] = useState<string>('applications');
  const eventId = user.assignedEventId;
  const event = MOCK_EVENTS.find(e => e.id === eventId);
  const applications = MOCK_APPLICATIONS.filter(app => app.eventId === eventId);
  
  const [applicationStatusFilter, setApplicationStatusFilter] = useState<ApplicationStatus>(ApplicationStatus.Pending);

  const getStatusPill = (status: ApplicationStatus) => {
    switch (status) {
        case ApplicationStatus.Approved: return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-success/10 text-success-dark">Approved</span>;
        case ApplicationStatus.Rejected: return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-danger/10 text-danger-dark">Rejected</span>;
        case ApplicationStatus.Pending:
        default: return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent-dark">Pending</span>;
    }
  }

  const renderApplications = () => {
      const filteredApps = applications.filter(app => app.status === applicationStatusFilter);
      return (
          <div>
            <div className="border-b border-border mb-6">
                <div className="flex space-x-8">
                    {(Object.values(ApplicationStatus)).map(status => (
                        <button key={status} onClick={() => setApplicationStatusFilter(status)} className={`py-3 px-1 font-semibold transition-colors duration-200 ${applicationStatusFilter === status ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary/80'}`}>
                            {status} ({applications.filter(a => a.status === status).length})
                        </button>
                    ))}
                </div>
            </div>
             <div className="space-y-4">
                {filteredApps.map(app => {
                    const vendor = MOCK_VENDORS.find(v => v.id === app.vendorId);
                    if (!vendor) return null;
                    return (
                        <div key={app.id} className="bg-surface p-4 rounded-lg border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <VendorCard vendor={vendor} />
                            <div className="flex-shrink-0 flex items-center gap-4">
                                {getStatusPill(app.status)}
                                {app.status === ApplicationStatus.Pending && (
                                    <div className="flex space-x-2">
                                        <button className="px-3 py-1 text-xs text-white bg-success rounded-md hover:bg-success-dark">Approve</button>
                                        <button className="px-3 py-1 text-xs text-white bg-danger rounded-md hover:bg-danger-dark">Reject</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
                {filteredApps.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-border rounded-lg">
                        <h2 className="text-xl font-semibold text-text-primary">No applications in this category.</h2>
                    </div>
                )}
            </div>
        </div>
      );
  }

  const renderStalls = () => (
     <div className="text-center py-20 border-2 border-dashed border-border rounded-lg">
        <h2 className="text-xl font-semibold text-text-primary">Stall Assignment</h2>
        <p className="text-text-secondary mt-2">This feature is under construction.</p>
    </div>
  );

  const renderContent = () => {
      switch (activeTab) {
          case 'applications': return renderApplications();
          case 'stalls': return renderStalls();
          default: return null;
      }
  }
  
  const tabs = [
    { id: 'applications', label: 'Applications' },
    { id: 'stalls', label: 'Stall Assignment' },
  ];

  return (
    <TeamDashboardLayout
        user={user}
        onLogout={onLogout}
        onSwitchDashboard={onSwitchDashboard}
        title="Vendor Management"
        navIcon={BriefcaseIcon}
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

export default VendorTeamDashboard;