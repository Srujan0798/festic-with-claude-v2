import React, { useState } from 'react';
import HostNavRail from './HostNavRail';
import HostHomePage from './host/HostHomePage';
import HostEventManagementPage from './host/HostEventManagementPage';
import HostMediaPage from './host/HostMediaPage';
import HostSearchPage from './host/HostSearchPage';
import HostNotificationsPage from './host/HostNotificationsPage';
import HostMessagesPage from './host/HostMessagesPage';
import type { User, Event } from '../types';
import { MOCK_EVENTS } from '../constants';

interface HostDesktopDashboardProps {
  user: User;
  onLogout: () => void;
  onSwitchDashboard: () => void;
}

type HostView = 'home' | 'search' | 'media' | 'notifications' | 'messages' | 'manage-event';

const HostDesktopDashboard: React.FC<HostDesktopDashboardProps> = ({ user, onLogout, onSwitchDashboard }) => {
  const [activeView, setActiveView] = useState<HostView>('home');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const hostEvents = MOCK_EVENTS.filter(event => event.hostId === user.id);

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setActiveView('manage-event');
  };
  
  const handleBackToDashboard = () => {
    setSelectedEvent(null);
    setActiveView('home');
  }

  const renderContent = () => {
    switch (activeView) {
      case 'manage-event':
        return selectedEvent ? <HostEventManagementPage event={selectedEvent} onBack={handleBackToDashboard} user={user} /> : <HostHomePage events={hostEvents} onSelectEvent={handleEventSelect} user={user} />;
      case 'search':
        return <HostSearchPage />;
      case 'media':
        return <HostMediaPage hostEvents={hostEvents} />;
      case 'notifications':
        return <HostNotificationsPage />;
      case 'messages':
        return <HostMessagesPage />;
      case 'home':
      default:
        return <HostHomePage events={hostEvents} onSelectEvent={handleEventSelect} user={user} />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-background">
      <HostNavRail user={user} onLogout={onLogout} activeView={activeView} setActiveView={setActiveView} onSwitchDashboard={onSwitchDashboard} />
      <main className="flex-1 h-screen overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default HostDesktopDashboard;