import React, { useState } from 'react';
import type { User, Event, Application, Vendor } from '../types';
import { Role, ApplicationStatus } from '../types';
import { MOCK_EVENTS, MOCK_APPLICATIONS, MOCK_VENDORS, MOCK_USERS } from '../constants';
import EventCard from './EventCard';
import { BriefcaseIcon, CalendarDaysIcon, UserCircleIcon, SearchIcon, HomeIcon, SettingsIcon, PlusSquareIcon, LogoutIcon } from './IconComponents';

// MOCK DATA FOR VENDOR
const vendorUser = MOCK_USERS.find(u => u.role === Role.Vendor)!;
const vendorDetails = MOCK_VENDORS.find(v => v.id === 'vendor-2')!;
const vendorApplications = MOCK_APPLICATIONS.filter(app => app.vendorId === vendorDetails.id);

type VendorView = 'home' | 'events' | 'applications' | 'profile';

const VendorHomePage: React.FC<{ user: User }> = ({ user }) => {
    const stats = [
        { name: 'Profile Views', value: '1.2k', change: '+15%' },
        { name: 'Event Invites', value: '8', change: '+2' },
        { name: 'Applications Sent', value: vendorApplications.length, change: '' },
        { name: 'Approved Gigs', value: vendorApplications.filter(a => a.status === ApplicationStatus.Approved).length, change: '' },
    ];
    return (
         <div className="p-4 md:p-8 animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Welcome, {vendorDetails.businessName}!</h1>
            <p className="text-text-secondary mt-1">Here's a summary of your activity.</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
                {stats.map(stat => (
                    <div key={stat.name} className="bg-surface p-4 rounded-lg border border-border">
                        <p className="text-sm font-medium text-text-secondary">{stat.name}</p>
                        <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>
             <div className="mt-8 bg-surface p-6 rounded-lg border border-border">
                <h2 className="text-xl font-bold text-text-primary mb-4">Quick Actions</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 text-center py-3 px-4 bg-primary text-white font-semibold rounded-lg hover:opacity-90">Find New Events</button>
                    <button className="flex-1 text-center py-3 px-4 bg-background text-text-primary font-semibold rounded-lg border border-border hover:bg-border">Update Your Profile</button>
                </div>
            </div>
        </div>
    );
};

const VendorEventsPage: React.FC = () => {
    return (
        <div className="p-4 md:p-8 animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Discover Events</h1>
            <p className="text-text-secondary mt-1">Find your next gig. Apply to the best university fests.</p>
            <div className="relative mt-6 mb-8">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input type="text" placeholder="Search events by name, university, or tag..." className="w-full bg-surface border-2 border-border rounded-full py-3 pl-12 pr-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {MOCK_EVENTS.filter(e => e.visibility === 'public').map(event => (
                    <EventCard 
                        key={event.id}
                        event={event}
                        actionButton={<button className="w-full text-center py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:opacity-90">Apply Now</button>}
                    />
                ))}
            </div>
        </div>
    );
};

const VendorApplicationsPage: React.FC = () => {
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
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">My Applications</h1>
            <p className="text-text-secondary mt-1">Track the status of all your event applications.</p>
            <div className="mt-6 space-y-4">
                {vendorApplications.map(app => {
                    const event = MOCK_EVENTS.find(e => e.id === app.eventId);
                    if (!event) return null;
                    return (
                        <div key={app.id} className="bg-surface p-4 rounded-lg border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center">
                                <img src={event.imageUrl} alt={event.name} className="w-16 h-16 rounded-md object-cover mr-4" />
                                <div>
                                    <h3 className="font-bold text-text-primary">{event.name}</h3>
                                    <p className="text-sm text-text-secondary">{event.university}</p>
                                </div>
                            </div>
                            <div className="flex-shrink-0">{getStatusPill(app.status)}</div>
                        </div>
                    )
                })}
                 {vendorApplications.length === 0 && <p className="text-center py-10 text-text-secondary">You haven't applied to any events yet.</p>}
            </div>
        </div>
    );
};

const VendorProfilePage: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
    return (
        <div className="p-4 md:p-8 animate-fade-in">
             <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Business Profile</h1>
            <p className="text-text-secondary mt-1">Keep your information up-to-date for event hosts.</p>
            <div className="mt-6 bg-surface p-6 rounded-lg border border-border max-w-2xl">
                <div className="space-y-4">
                    <img src={vendorDetails.imageUrl} className="w-24 h-24 rounded-lg object-cover" />
                    <input defaultValue={vendorDetails.businessName} className="w-full bg-background border-border rounded-md p-2" />
                    <input defaultValue={vendorDetails.category} className="w-full bg-background border-border rounded-md p-2" />
                    <textarea defaultValue={vendorDetails.description} rows={4} className="w-full bg-background border-border rounded-md p-2" />
                </div>
                 <button className="mt-6 px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:opacity-90">Save Changes</button>
            </div>
             <div className="mt-8 max-w-2xl">
                 <button onClick={onLogout} className="w-full flex items-center p-4 text-left bg-surface rounded-lg border border-border text-danger hover:bg-danger/5">
                    <LogoutIcon className="w-6 h-6 mr-4" />
                    <span className="text-lg font-semibold">Logout</span>
                </button>
            </div>
        </div>
    )
};


const navItems: { id: VendorView; label: string; icon: React.FC<{className?: string}> }[] = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'events', label: 'Events', icon: SearchIcon },
    { id: 'applications', label: 'Applications', icon: BriefcaseIcon },
    { id: 'profile', label: 'Profile', icon: UserCircleIcon },
];

const VendorNavRail: React.FC<{ activeView: VendorView; setActiveView: (v: VendorView) => void; user: User; onLogout: () => void }> = ({ activeView, setActiveView, user, onLogout }) => (
    <nav className="w-64 h-full bg-surface border-r border-border flex-col flex-shrink-0 hidden lg:flex">
        <div className="p-6">
            <a href="#" className="text-3xl font-bold text-text-primary">Festic<span className="text-primary">.</span></a>
            <p className="text-sm text-text-secondary mt-1">Vendor Panel</p>
        </div>
        <div className="px-4 flex-grow">
            <ul className="space-y-2">
                {navItems.map(item => (
                    <li key={item.id}><button onClick={() => setActiveView(item.id)} className={`w-full flex items-center px-4 py-2.5 text-sm font-semibold rounded-md ${activeView === item.id ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-background'}`}><item.icon className="w-5 h-5 mr-3" /><span>{item.label}</span></button></li>
                ))}
            </ul>
        </div>
        <div className="p-4 border-t border-border"><div className="flex items-center"><img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover" /><div className="ml-3 flex-grow"><p className="text-sm font-semibold text-text-primary truncate">{user.name}</p><p className="text-xs text-text-secondary truncate">{user.email}</p></div><button onClick={onLogout} className="ml-2 text-text-secondary hover:text-danger"><LogoutIcon className="w-5 h-5"/></button></div></div>
    </nav>
);

const VendorBottomNav: React.FC<{ activeView: VendorView; setActiveView: (v: VendorView) => void }> = ({ activeView, setActiveView }) => (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-border flex justify-around items-center z-50 lg:hidden">
        {navItems.map(item => {
            const isActive = activeView === item.id;
            return <button key={item.id} onClick={() => setActiveView(item.id)} className={`flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-primary' : 'text-text-secondary'}`}><item.icon className="w-6 h-6" /></button>;
        })}
    </nav>
);

const VendorDashboard: React.FC<{ user: User, onLogout: () => void }> = ({ user, onLogout }) => {
    const [activeView, setActiveView] = useState<VendorView>('home');

    const renderContent = () => {
        switch (activeView) {
            case 'home': return <VendorHomePage user={user} />;
            case 'events': return <VendorEventsPage />;
            case 'applications': return <VendorApplicationsPage />;
            case 'profile': return <VendorProfilePage user={user} onLogout={onLogout} />;
            default: return <VendorHomePage user={user} />;
        }
    };

    return (
        <div className="flex h-screen w-screen bg-background">
            <VendorNavRail user={user} onLogout={onLogout} activeView={activeView} setActiveView={setActiveView} />
            <main className="flex-1 h-full overflow-y-auto pb-16 lg:pb-0">
                {renderContent()}
            </main>
            <VendorBottomNav activeView={activeView} setActiveView={setActiveView} />
            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fadeIn 0.3s ease-in-out; }
            `}</style>
        </div>
    );
};

export default VendorDashboard;
