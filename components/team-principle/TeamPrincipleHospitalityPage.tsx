import React from 'react';
import type { Event } from '../../types';
import { HomeIcon } from '../IconComponents';

interface TeamPrincipleHospitalityPageProps {
  event: Event;
}

const TeamPrincipleHospitalityPage: React.FC<TeamPrincipleHospitalityPageProps> = ({ event }) => {
    return (
        <div className="p-8 flex flex-col items-center justify-center h-full text-center">
            <HomeIcon className="w-16 h-16 mx-auto text-primary mb-4" />
            <h1 className="text-3xl font-bold text-text-primary">Hospitality Monitoring</h1>
            <p className="text-text-secondary mt-2">Oversee guest management and catering for {event.name}.</p>
            <p className="text-text-secondary mt-1">This page is under construction.</p>
        </div>
    );
};

export default TeamPrincipleHospitalityPage;
