import React, { useState, useMemo, TouchEvent } from 'react';
import TeamPrincipleNavRail from './TeamPrincipleNavRail';
import TeamPrincipleBottomNav from './TeamPrincipleBottomNav';
import TeamPrincipleMorePage from './TeamPrincipleMorePage';
import TeamPrincipleTeamPage from './TeamPrincipleTeamPage';
import TeamPrincipleEventsPage from './TeamPrincipleEventsPage';
import TeamPrincipleMediaPage from './TeamPrincipleMediaPage';
import TeamPrincipleVendorPage from './TeamPrincipleVendorPage';
import TeamPrincipleVolunteersPage from './TeamPrincipleVolunteersPage';
import TeamPrincipleRegistrationsPage from './TeamPrincipleRegistrationsPage';
import TeamPrincipleAnnouncementsPage from './TeamPrincipleAnnouncementsPage';
import TeamPrincipleIncidentReportPage from './TeamPrincipleIncidentReportPage';
import EventDetail from '../EventDetail';
import TeamPrincipleMobileHeader from './TeamPrincipleMobileHeader';
import TeamPrincipleLogisticsPage from './TeamPrincipleLogisticsPage';
import TeamPrincipleSecurityPage from './TeamPrincipleSecurityPage';
import TeamPrincipleHospitalityPage from './TeamPrincipleHospitalityPage';
import TeamPrincipleTechnicalPage from './TeamPrincipleTechnicalPage';

import type { User, Event } from '../../types';
import { MOCK_EVENTS, MOCK_SUB_EVENTS } from '../../constants';

// Re-using host pages for notifications and messages as they are generic
import HostNotificationsPage from '../host/HostNotificationsPage';
import HostMessagesPage from '../host/HostMessagesPage';

interface TeamPrincipleDashboardProps {
  user: User;
  onLogout: () => void;
  onSwitchDashboard: () => void;
}

export type TeamPrincipleView = 'events' | 'team' | 'notifications' | 'messages' | 'more';
export type AllTeamPrincipleViews = 
  | TeamPrincipleView 
  | 'media' 
  | 'vendor' 
  | 'volunteer' 
  | 'registrations' 
  | 'announcements' 
  | 'incident-report'
  | 'logistics'
  | 'security'
  | 'hospitality'
  | 'technical';

const mobileNavOrder: TeamPrincipleView[] = ['events', 'team', 'notifications', 'messages', 'more'];

const getTitleForView = (view: AllTeamPrincipleViews) => {
    const titles: Record<AllTeamPrincipleViews, string> = {
        events: 'Events',
        team: 'Team',
        notifications: 'Notifications',
        messages: 'Messages',
        more: 'More',
        media: 'Media',
        vendor: 'Vendors',
        volunteer: 'Volunteers',
        registrations: 'Registrations',
        announcements: 'Announcements',
        'incident-report': 'Incident Reports',
        logistics: 'Logistics',
        security: 'Security',
        hospitality: 'Hospitality',
        technical: 'Technical',
    };
    return titles[view] || 'Dashboard';
}

const TeamPrincipleDashboard: React.FC<TeamPrincipleDashboardProps> = ({ user, onLogout, onSwitchDashboard }) => {
  const [activeView, setActiveView] = useState<AllTeamPrincipleViews>('events');
  const [selectedSubEvent, setSelectedSubEvent] = useState<Event | null>(null);

  // Touch state for swipe gesture
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchMoveX, setTouchMoveX] = useState<number | null>(null);
  
  const event = MOCK_EVENTS.find(e => e.id === 'event-4'); 

  const activeMobileIndex = useMemo(() => {
      const index = mobileNavOrder.indexOf(activeView as TeamPrincipleView);
      // If the view isn't a main nav item, it must be part of "More", so default to the index of "more".
      return index > -1 ? index : mobileNavOrder.indexOf('more');
  }, [activeView]);


  const handleTouchStart = (e: TouchEvent) => {
      setTouchStartX(e.targetTouches[0].clientX);
      setTouchMoveX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
      if (touchStartX === null) return;
      setTouchMoveX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
      if (touchStartX === null || touchMoveX === null) return;

      const diff = touchStartX - touchMoveX;
      const threshold = 50; // Min swipe distance

      if (Math.abs(diff) > threshold) {
          const currentIndex = mobileNavOrder.indexOf(activeView as TeamPrincipleView);
          if (currentIndex > -1) {
            const newIndex = diff > 0 ? currentIndex + 1 : currentIndex - 1;
            if (newIndex >= 0 && newIndex < mobileNavOrder.length) {
                setActiveView(mobileNavOrder[newIndex]);
            }
          }
      }

      setTouchStartX(null);
      setTouchMoveX(null);
  };

  if (!event) {
    return <div className="flex items-center justify-center h-full">Error: Event not found for this role.</div>;
  }
  
  const handleEventClick = (event: Event) => {
    setSelectedSubEvent(event);
  };

  const handleBackFromDetail = () => {
    setSelectedSubEvent(null);
  }
  
  const getMobileNavActiveView = (): TeamPrincipleView => {
    if (mobileNavOrder.includes(activeView as TeamPrincipleView)) {
        return activeView as TeamPrincipleView;
    }
    return 'more';
  };

  const renderDesktopContent = () => {
    if (selectedSubEvent) {
        return <EventDetail event={selectedSubEvent} onBack={handleBackFromDetail} />;
    }
    
    switch (activeView) {
      case 'team': return <TeamPrincipleTeamPage event={event} user={user} />;
      case 'events': return <TeamPrincipleEventsPage event={event} onEventClick={handleEventClick} />;
      case 'media': return <TeamPrincipleMediaPage event={event} />;
      case 'vendor': return <TeamPrincipleVendorPage event={event} />;
      case 'volunteer': return <TeamPrincipleVolunteersPage event={event} />;
      case 'registrations': return <TeamPrincipleRegistrationsPage event={event} />;
      case 'announcements': return <TeamPrincipleAnnouncementsPage event={event} />;
      case 'notifications': return <HostNotificationsPage />;
      case 'messages': return <HostMessagesPage />;
      case 'incident-report': return <TeamPrincipleIncidentReportPage event={event} />;
      case 'logistics': return <TeamPrincipleLogisticsPage event={event} />;
      case 'security': return <TeamPrincipleSecurityPage event={event} />;
      case 'hospitality': return <TeamPrincipleHospitalityPage event={event} />;
      case 'technical': return <TeamPrincipleTechnicalPage event={event} />;
      case 'more': return <TeamPrincipleEventsPage event={event} onEventClick={handleEventClick} />; // Should not happen on desktop
      default: return <TeamPrincipleEventsPage event={event} onEventClick={handleEventClick} />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-background">
      <TeamPrincipleNavRail 
        user={user} 
        onLogout={onLogout} 
        activeView={activeView} 
        setActiveView={setActiveView} 
        event={event} 
        onSwitchDashboard={onSwitchDashboard}
        className="hidden lg:flex"
      />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* MOBILE HEADER */}
        <TeamPrincipleMobileHeader
          user={user}
          title={selectedSubEvent ? selectedSubEvent.name : getTitleForView(activeView)}
          showBackButton={!!selectedSubEvent}
          onBack={handleBackFromDetail}
          className="lg:hidden"
        />

        {/* CONTENT AREA */}
        <div className="flex-grow overflow-hidden">
          {/* DESKTOP CONTENT */}
          <div className="hidden lg:block h-full overflow-y-auto">
            {renderDesktopContent()}
          </div>

          {/* MOBILE CONTENT */}
          <div className="lg:hidden h-full">
            {selectedSubEvent ? (
              <div className="h-full overflow-y-auto">
                 <EventDetail event={selectedSubEvent} onBack={handleBackFromDetail} />
              </div>
            ) : (
              <div 
                className="h-full overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                  <div 
                      className="flex h-full transition-transform duration-300 ease-in-out"
                      style={{ transform: `translateX(-${activeMobileIndex * 100}%)` }}
                  >
                      <div className="w-full flex-shrink-0 h-full overflow-y-auto"><TeamPrincipleEventsPage event={event} onEventClick={handleEventClick} /></div>
                      <div className="w-full flex-shrink-0 h-full overflow-y-auto"><TeamPrincipleTeamPage event={event} user={user} /></div>
                      <div className="w-full flex-shrink-0 h-full overflow-y-auto"><HostNotificationsPage /></div>
                      <div className="w-full flex-shrink-0 h-full overflow-y-auto"><HostMessagesPage /></div>
                      <div className="w-full flex-shrink-0 h-full overflow-y-auto"><TeamPrincipleMorePage onNavigate={setActiveView} onLogout={onLogout} onSwitchDashboard={onSwitchDashboard} /></div>
                  </div>
              </div>
            )}
          </div>
        </div>
        
        {/* MOBILE BOTTOM NAV */}
        {!selectedSubEvent && (
          <TeamPrincipleBottomNav
            activeView={getMobileNavActiveView()}
            setActiveView={setActiveView}
            className="lg:hidden"
          />
        )}
      </div>
    </div>
  );
};

export default TeamPrincipleDashboard;