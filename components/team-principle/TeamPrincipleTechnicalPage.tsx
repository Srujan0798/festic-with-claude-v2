import React from 'react';
import type { Event } from '../../types';
import { WrenchIcon } from '../IconComponents';

interface TeamPrincipleTechnicalPageProps {
  event: Event;
}

const TeamPrincipleTechnicalPage: React.FC<TeamPrincipleTechnicalPageProps> = ({ event }) => {
    return (
        <div className="p-8 flex flex-col items-center justify-center h-full text-center">
            <WrenchIcon className="w-16 h-16 mx-auto text-primary mb-4" />
            <h1 className="text-3xl font-bold text-text-primary">Technical Monitoring</h1>
            <p className="text-text-secondary mt-2">Track equipment status and technical issues for {event.name}.</p>
            <p className="text-text-secondary mt-1">This page is under construction.</p>
        </div>
    );
};

export default TeamPrincipleTechnicalPage;
