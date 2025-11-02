import React, { useState } from 'react';
import LoginModal from './components/LoginModal';
import Dashboard from './components/Dashboard';
import VendorDashboard from './components/VendorDashboard';
import EventDetail from './components/EventDetail';
import HostDesktopDashboard from './components/HostDesktopDashboard';
import HostRoleSelection from './components/HostRoleSelection';
import TeamPrincipleDashboard from './components/team-principle/TeamPrincipleDashboard';
import type { User, Event, TeamMember } from './types';
import { Role, TeamType } from './types';
import { MOCK_USERS, MOCK_TEAM_MEMBERS } from './constants';
import MediaTeamDashboard from './components/teams/MediaTeamDashboard';
import VendorTeamDashboard from './components/teams/VendorTeamDashboard';
import LogisticsTeamDashboard from './components/teams/LogisticsTeamDashboard';
import SecurityTeamDashboard from './components/teams/SecurityTeamDashboard';
import HospitalityTeamDashboard from './components/teams/HospitalityTeamDashboard';
import TechnicalTeamDashboard from './components/teams/TechnicalTeamDashboard';
import DashboardSwitcherModal from './components/common/DashboardSwitcherModal';


const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | TeamMember | null>(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showHostRoleSelection, setShowHostRoleSelection] = useState(false);
  const [isDashboardSwitcherOpen, setDashboardSwitcherOpen] = useState(false);

  const handleLoginRequest = (user: User) => {
    if (user.role === Role.Host) {
      setShowHostRoleSelection(true);
      setLoginModalOpen(false);
    } else {
      setCurrentUser(user);
      setLoginModalOpen(false);
    }
  };
  
  const handleDashboardSwitch = (role: string) => {
    handleHostRoleSelected(role);
    setDashboardSwitcherOpen(false);
  }

  const handleHostRoleSelected = (subRole: string) => {
    if (subRole === 'University') {
      const universityHostUser = MOCK_USERS.find(u => u.id === 'user-1' && u.role === Role.Host);
      if (universityHostUser) {
        setCurrentUser(universityHostUser);
      }
    } else if (subRole === 'Team Principle') {
      const teamPrincipleUser = MOCK_USERS.find(u => u.id === 'user-5');
      if (teamPrincipleUser) {
        setCurrentUser(teamPrincipleUser);
      }
    } else {
      const teamTypeMap: Record<string, TeamType> = {
            'Media Team': TeamType.Media,
            'Vendor Management': TeamType.VendorManagement,
            'Logistics Team': TeamType.Logistics,
            'Security Team': TeamType.Security,
            'Hospitality Team': TeamType.Hospitality,
            'Technical Team': TeamType.Technical,
        };
      const selectedTeamType = teamTypeMap[subRole];
      if(selectedTeamType) {
        const teamMember = MOCK_TEAM_MEMBERS.find(m => m.teamType === selectedTeamType);
        if(teamMember) {
          setCurrentUser(teamMember);
        } else {
          alert(`No mock user found for ${subRole}.`);
          return; // Prevent closing the modal if user not found
        }
      } else {
         alert(`${subRole} dashboard is coming soon!`);
         return;
      }
    }
    setShowHostRoleSelection(false);
  };

  const handleBackFromHostSelection = () => {
    setShowHostRoleSelection(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedEvent(null);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleBack = () => {
    setSelectedEvent(null);
  };

  const renderContent = () => {
    if (showHostRoleSelection) {
      return <HostRoleSelection onSelectRole={handleHostRoleSelected} onBack={handleBackFromHostSelection} />;
    }

    if (currentUser) {
      const potentialTeamMember = currentUser as TeamMember;
      if (potentialTeamMember.teamType) {
          switch (potentialTeamMember.teamType) {
              case TeamType.Media:
                  return <MediaTeamDashboard user={potentialTeamMember} onLogout={handleLogout} onSwitchDashboard={() => setDashboardSwitcherOpen(true)} />;
              case TeamType.VendorManagement:
                  return <VendorTeamDashboard user={potentialTeamMember} onLogout={handleLogout} onSwitchDashboard={() => setDashboardSwitcherOpen(true)} />;
              case TeamType.Logistics:
                  return <LogisticsTeamDashboard user={potentialTeamMember} onLogout={handleLogout} onSwitchDashboard={() => setDashboardSwitcherOpen(true)} />;
              case TeamType.Security:
                  return <SecurityTeamDashboard user={potentialTeamMember} onLogout={handleLogout} onSwitchDashboard={() => setDashboardSwitcherOpen(true)} />;
              case TeamType.Hospitality:
                  return <HospitalityTeamDashboard user={potentialTeamMember} onLogout={handleLogout} onSwitchDashboard={() => setDashboardSwitcherOpen(true)} />;
              case TeamType.Technical:
                  return <TechnicalTeamDashboard user={potentialTeamMember} onLogout={handleLogout} onSwitchDashboard={() => setDashboardSwitcherOpen(true)} />;
              default:
                  // Fallback for any unhandled team types
                  break; 
          }
      }
    }

    if (currentUser?.role === Role.Host) {
      if (currentUser.id === 'user-1') { // University Host is desktop-only
        return (
          <>
            <div className="lg:hidden flex flex-col items-center justify-center h-full text-center p-8">
              <h1 className="text-2xl font-bold text-text-primary">University Dashboard</h1>
              <p className="mt-2 text-text-secondary">Please switch to a desktop or larger screen to manage your events.</p>
              <button
                onClick={handleLogout}
                className="mt-8 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-all"
              >
                Logout
              </button>
            </div>
            <div className="hidden lg:block h-full">
              <HostDesktopDashboard user={currentUser} onLogout={handleLogout} onSwitchDashboard={() => setDashboardSwitcherOpen(true)} />
            </div>
          </>
        );
      } else { // Team Principle dashboard is responsive
        return <TeamPrincipleDashboard user={currentUser} onLogout={handleLogout} onSwitchDashboard={() => setDashboardSwitcherOpen(true)} />;
      }
    }
      
    if (selectedEvent) {
        return <EventDetail event={selectedEvent} onBack={handleBack} />;
    }

    if (currentUser) {
      if (currentUser.role === Role.Vendor) {
        return <VendorDashboard user={currentUser} onLogout={handleLogout} />;
      }
      // Students and other non-host/non-vendor roles see the generic dashboard
      return <Dashboard user={currentUser} onEventClick={handleEventSelect} onLogout={handleLogout} />;
    }
    
    // Default logged-out view
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <h1 className="text-4xl font-bold text-text-primary">Welcome to Festic<span className="text-primary">.</span></h1>
        <p className="mt-4 text-lg text-text-secondary">Your ultimate fest companion.</p>
        <button
            onClick={openLoginModal}
            className="mt-8 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-all"
        >
            Sign In / Register
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col font-sans bg-background">
      <main className="flex-grow h-full overflow-hidden">
        {renderContent()}
      </main>
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
        onLogin={handleLoginRequest} 
      />
       <DashboardSwitcherModal 
        isOpen={isDashboardSwitcherOpen}
        onClose={() => setDashboardSwitcherOpen(false)}
        onSelectRole={handleDashboardSwitch}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default App;