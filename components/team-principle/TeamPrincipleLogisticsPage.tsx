import React from 'react';
import type { Event } from '../../types';
import { TruckIcon } from '../IconComponents';

interface TeamPrincipleLogisticsPageProps {
  event: Event;
}

const TeamPrincipleLogisticsPage: React.FC<TeamPrincipleLogisticsPageProps> = ({ event }) => {
    return (
        <div className="p-8 flex flex-col items-center justify-center h-full text-center">
            <TruckIcon className="w-16 h-16 mx-auto text-primary mb-4" />
            <h1 className="text-3xl font-bold text-text-primary">Logistics Monitoring</h1>
            <p className="text-text-secondary mt-2">Monitor inventory, transport, and setup for {event.name}.</p>
            <p className="text-text-secondary mt-1">This page is under construction.</p>
        </div>
    );
};

export default TeamPrincipleLogisticsPage;
