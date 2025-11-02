import React, { useState, useEffect, useMemo, TouchEvent } from 'react';
import type { User, Event, Community } from '../types';

import HomeScreen from './UpcomingEventsSection'; 
import SearchScreen from './StudentDashboard'; 
// CommunityScreen is now defined locally below
import NotificationsScreen from './HostDashboard'; 
import BottomNavBar from './HeroSection'; 
import MobileHeader from './MobileHeader';
import StudentProfileDrawer from './student/StudentProfileDrawer';
import StudentSettingsPage from './student/StudentSettingsPage';
import { MOCK_MESSAGES, MOCK_EVENTS, MOCK_POSTS, MOCK_COMMUNITIES } from '../constants';
import { ChevronLeftIcon } from './IconComponents';
import EventCard from './EventCard';
import PostCard from './FeaturesSection';

// CommunityScreen (formerly VendorDashboard.tsx) is now a local component
// to avoid breaking student view while implementing the new VendorDashboard.
interface CommunityScreenProps {
    user: User;
    onEventClick: (event: Event) => void;
    onProfileClick?: () => void;
    onSettingsClick?: () => void;
}
const CommunityScreen: React.FC<CommunityScreenProps> = ({ user, onEventClick, onProfileClick, onSettingsClick }) => {
    const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

    useEffect(() => {
        if (selectedCommunity) {
            const firstEventInCommunity = MOCK_EVENTS.find(e => e.communityTag === selectedCommunity.tag);
            setSelectedEventId(firstEventInCommunity?.id || null);
        }
    }, [selectedCommunity]);

    const trendingPostsForCommunity = useMemo(() => {
        if (!selectedCommunity) return [];
        return MOCK_POSTS
            .filter(p => p.event.communityTag === selectedCommunity.tag)
            .sort((a, b) => b.likes - a.likes)
            .slice(0, 5);
    }, [selectedCommunity]);

    if (!selectedCommunity) {
        return (
             <div className="flex flex-col h-full">
                <MobileHeader user={user} title="Community" onProfileClick={onProfileClick} onSettingsClick={onSettingsClick} />
                <div className="flex-grow overflow-y-auto p-4 grid grid-cols-2 gap-4">
                    {MOCK_COMMUNITIES.map(community => (
                        <div key={community.id} onClick={() => setSelectedCommunity(community)} className="relative aspect-[4/5] rounded-lg overflow-hidden cursor-pointer group shadow-lg">
                             <img src={community.imageUrl} alt={community.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center p-4">
                                <h2 className="text-white text-lg font-bold text-center">{community.name}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const eventsForCommunity = MOCK_EVENTS.filter(e => e.communityTag === selectedCommunity.tag);
    const postsForEvent = MOCK_POSTS.filter(p => p.event.id === selectedEventId);

    return (
        <div className="flex flex-col h-full">
            <MobileHeader 
                user={user} 
                title={selectedCommunity.name} 
                showBackButton={true}
                onBack={() => setSelectedCommunity(null)}
                onProfileClick={onProfileClick} 
                onSettingsClick={onSettingsClick}
            />
            <div className="flex-grow overflow-y-auto">
                 <div className="p-4">
                    <h2 className="text-lg font-bold text-text-primary mb-3">Trending Events</h2>
                    {eventsForCommunity.length > 0 ? (
                        <div className="flex space-x-4 overflow-x-auto pb-4 -mb-4">
                            {eventsForCommunity.map(event => (
                                <div key={event.id} className="w-64 flex-shrink-0" onClick={() => setSelectedEventId(event.id)}>
                                    <EventCard event={event} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-text-secondary">No events in this community yet.</p>
                    )}
                </div>
                <div className="mt-4">
                    <h2 className="text-lg font-bold text-text-primary px-4 mb-2">{selectedEventId ? `What's happening at ${MOCK_EVENTS.find(e => e.id === selectedEventId)?.name}` : "What's Happening"}</h2>
                     <div>{postsForEvent.length > 0 ? postsForEvent.map(post => <PostCard key={post.id} post={post} onEventClick={() => onEventClick(post.event)} />) : <p className="px-4 text-text-secondary">No posts yet for this event.</p>}</div>
                </div>
                <div className="mt-6">
                    <h2 className="text-lg font-bold text-text-primary px-4 mb-2">Trending & Viral in {selectedCommunity.name}</h2>
                    <div>{trendingPostsForCommunity.length > 0 ? trendingPostsForCommunity.map(post => <PostCard key={post.id} post={post} onEventClick={() => onEventClick(post.event)} />) : <p className="px-4 text-text-secondary">No trending posts in this community yet.</p>}</div>
                </div>
            </div>
        </div>
    );
};


type Message = typeof MOCK_MESSAGES[0];

interface MessagesScreenProps {
    user: User;
    onSelectChat: (chat: Message) => void;
    onProfileClick: () => void;
    onSettingsClick: () => void;
}

const MessagesScreen: React.FC<MessagesScreenProps> = ({ user, onSelectChat, onProfileClick, onSettingsClick }) => {
    return (
        <div className="flex flex-col h-full">
            <MobileHeader user={user} title="Messages" onProfileClick={onProfileClick} onSettingsClick={onSettingsClick} />
            <div className="flex-grow overflow-y-auto">
                {MOCK_MESSAGES.map(msg => (
                    <div 
                        key={msg.id} 
                        onClick={() => onSelectChat(msg)}
                        className="flex items-center p-4 border-b border-border hover:bg-background/70 cursor-pointer"
                    >
                        <img src={msg.userImage} alt={msg.userName} className="w-12 h-12 rounded-full mr-4 object-cover" />
                        <div className="flex-grow">
                            <div className="flex justify-between items-center">
                                <h2 className="font-bold text-text-primary">{msg.userName}</h2>
                                <p className="text-xs text-text-secondary">{msg.time}</p>
                            </div>
                            <p className="text-sm text-text-secondary truncate">{msg.lastMessage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

interface DashboardProps {
    user: User;
    onEventClick: (event: Event) => void;
    onLogout: () => void;
}

type Tab = 'home' | 'search' | 'community' | 'notifications' | 'messages';
type StudentView = 'main' | 'settings';


const Dashboard: React.FC<DashboardProps> = ({ user, onEventClick, onLogout }) => {
    const [activeTab, setActiveTab] = useState<Tab>('home');
    const [activeStudentView, setActiveStudentView] = useState<StudentView>('main');
    const [selectedChat, setSelectedChat] = useState<Message | null>(null);
    const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

    const handleProfileClick = () => setIsProfileDrawerOpen(true);
    const handleSettingsClick = () => setActiveStudentView('settings');
    const handleBackToMain = () => setActiveStudentView('main');
    const handleSelectChat = (chat: Message) => setSelectedChat(chat);
    const handleBackFromChat = () => setSelectedChat(null);


    if (activeStudentView === 'settings') {
        return <StudentSettingsPage user={user} onBack={handleBackToMain} onLogout={onLogout} />;
    }

    if (selectedChat) {
        return (
             <div className="flex flex-col h-full bg-background animate-fade-in">
                <MobileHeader user={user} title={selectedChat.userName} showBackButton onBack={handleBackFromChat} />
                <div className="flex-grow p-4 overflow-y-auto">
                    <div className="flex flex-col h-full items-center justify-center">
                         <p className="text-text-secondary">Chat with {selectedChat.userName} starts here.</p>
                    </div>
                </div>
                 <div className="p-2 bg-surface border-t border-border flex-shrink-0">
                    <input type="text" placeholder={`Message ${selectedChat.userName}...`} className="w-full bg-white border-border border rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <style>{`
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    .animate-fade-in { animation: fadeIn 0.3s ease-in-out; }
                `}</style>
            </div>
        );
    }


    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return <HomeScreen user={user} onEventClick={onEventClick} onProfileClick={handleProfileClick} onSettingsClick={handleSettingsClick} />;
            case 'search':
                return <SearchScreen user={user} onEventClick={onEventClick} onProfileClick={handleProfileClick} onSettingsClick={handleSettingsClick}/>;
            case 'community':
                return <CommunityScreen user={user} onEventClick={onEventClick} onProfileClick={handleProfileClick} onSettingsClick={handleSettingsClick} />;
            case 'notifications':
                return <NotificationsScreen user={user} onProfileClick={handleProfileClick} onSettingsClick={handleSettingsClick} />;
            case 'messages':
                return <MessagesScreen user={user} onSelectChat={handleSelectChat} onProfileClick={handleProfileClick} onSettingsClick={handleSettingsClick} />;
            default:
                return <HomeScreen user={user} onEventClick={onEventClick} onProfileClick={handleProfileClick} onSettingsClick={handleSettingsClick} />;
        }
    };

    return (
        <div className="h-full w-full flex flex-col bg-background">
            <StudentProfileDrawer 
                user={user}
                isOpen={isProfileDrawerOpen}
                onClose={() => setIsProfileDrawerOpen(false)}
                onLogout={onLogout}
            />
            <main className="flex-grow overflow-hidden pb-16">
                {renderContent()}
            </main>
            <BottomNavBar activeTab={activeTab} onTabClick={setActiveTab} />
        </div>
    );
};

export default Dashboard;