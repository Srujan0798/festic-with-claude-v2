import React from 'react';
import type { Event, User } from '../../types';
// Fix: Import the 'Role' enum.
import { Role } from '../../types';
import { MOCK_USERS } from '../../constants';
import { PlusSquareIcon } from '../IconComponents';

interface TeamPrincipleTeamPageProps {
  event: Event;
  user: User;
}

const teamMembers = [
    MOCK_USERS[2], // Charlie Davis
    { ...MOCK_USERS[3], id: 'user-diana-2', avatarUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=100' },
    { id: 'user-new-1', name: 'Frank Miller', email: 'frank@student.edu', role: Role.Student, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    { id: 'user-new-2', name: 'Grace Lee', email: 'grace@student.edu', role: Role.Student, avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' },
    { id: 'user-new-3', name: 'Heidi Klum', email: 'heidi@student.edu', role: Role.Student, avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100' },
];

const TeamPrincipleTeamPage: React.FC<TeamPrincipleTeamPageProps> = ({ event, user }) => {
    return (
        <div className="p-4 md:p-8 animate-fade-in">
            <header className="hidden md:flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary">Team Management</h1>
                    <p className="text-text-secondary mt-1">Oversee your team for <span className="font-semibold text-text-primary">{event.name}</span>.</p>
                </div>
                 <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:opacity-90">
                    <PlusSquareIcon className="w-5 h-5 mr-2" />
                    Add Member
                </button>
            </header>

            <div className="space-y-8">
                {/* Team Principle Section */}
                <div>
                    <h3 className="text-xl font-bold text-text-primary mb-4 border-b border-border pb-2">Your Role</h3>
                    <div className="bg-surface p-4 rounded-lg border border-border flex items-center space-x-4">
                        <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                            <p className="font-bold text-text-primary">{user.name}</p>
                            <p className="text-sm font-semibold text-primary">Team Principle</p>
                        </div>
                    </div>
                </div>

                {/* Team Members Section */}
                <div>
                    <h3 className="text-xl font-bold text-text-primary mb-4 border-b border-border pb-2">Team Members</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {teamMembers.map(member => (
                             <div key={member.id} className="bg-surface p-4 rounded-lg border border-border flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <img src={member.avatarUrl} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                                    <div>
                                        <p className="font-semibold text-text-primary">{member.name}</p>
                                        <p className="text-sm text-text-secondary">{member.email}</p>
                                    </div>
                                </div>
                                <button className="text-xs font-semibold text-danger hover:underline">Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
            `}</style>
        </div>
    );
};

export default TeamPrincipleTeamPage;