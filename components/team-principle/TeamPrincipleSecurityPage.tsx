import React from 'react';
import type { Event } from '../../types';
import { ShieldIcon } from '../IconComponents';

interface TeamPrincipleSecurityPageProps {
  event: Event;
}

const TeamPrincipleSecurityPage: React.FC<TeamPrincipleSecurityPageProps> = ({ event }) => {
    return (
        <div className="p-8 flex flex-col items-center justify-center h-full text-center">
            <ShieldIcon className="w-16 h-16 mx-auto text-primary mb-4" />
            <h1 className="text-3xl font-bold text-text-primary">Security Monitoring</h1>
            <p className="text-text-secondary mt-2">View incident reports and duty rosters for {event.name}.</p>
            <p className="text-text-secondary mt-1">This page is under construction.</p>
        </div>
    );
};

export default TeamPrincipleSecurityPage;
