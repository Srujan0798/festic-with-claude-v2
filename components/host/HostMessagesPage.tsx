import React, { useState } from 'react';
import { MOCK_MESSAGES } from '../../constants';
import { ChevronLeftIcon } from '../IconComponents';

const HostMessagesPage: React.FC = () => {
    const [selectedMessage, setSelectedMessage] = useState(MOCK_MESSAGES[0]);
    const [selectedMobileMessage, setSelectedMobileMessage] = useState<(typeof MOCK_MESSAGES[0]) | null>(null);

    const renderChatView = (msg: typeof MOCK_MESSAGES[0], isMobile: boolean) => (
         <>
            <div className={`p-4 border-b border-border flex items-center bg-surface flex-shrink-0 ${isMobile ? '' : ''}`}>
                {isMobile && (
                    <button onClick={() => setSelectedMobileMessage(null)} className="mr-3">
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                )}
                <img src={msg.userImage} alt={msg.userName} className="w-10 h-10 rounded-full mr-3 object-cover" />
                <div>
                    <h2 className="font-bold text-text-primary">{msg.userName}</h2>
                    {!isMobile && <p className="text-xs text-success flex items-center"><span className="w-2 h-2 bg-success rounded-full mr-1.5"></span>Online</p>}
                </div>
            </div>
            <div className="flex-grow p-6 overflow-y-auto bg-background">
                <div className="flex flex-col h-full">
                    <div className="flex-grow flex justify-center items-center">
                        <div className="text-center text-text-secondary">
                            <h3 className="text-lg font-semibold">Conversation with {msg.userName}</h3>
                            <p>This is the beginning of your conversation.</p>
                        </div>
                    </div>
                </div>
            </div>
             <div className="p-4 bg-surface border-t border-border flex-shrink-0">
                <input type="text" placeholder={`Message ${msg.userName}...`} className="w-full bg-white border-border border rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
        </>
    );

    const renderConversationList = (onSelect: (msg: typeof MOCK_MESSAGES[0]) => void) => (
         <div className="flex-grow overflow-y-auto">
            {MOCK_MESSAGES.map(msg => (
                <div
                    key={msg.id}
                    onClick={() => onSelect(msg)}
                    className={`flex items-center p-4 cursor-pointer border-l-4 transition-colors duration-200 
                        ${(selectedMessage?.id === msg.id && !selectedMobileMessage) ? 'bg-primary/5 border-primary' : 'border-transparent hover:bg-background'}
                        lg:border-l-4
                    `}
                >
                    <img src={msg.userImage} alt={msg.userName} className="w-12 h-12 rounded-full mr-4 object-cover" />
                    <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-text-primary truncate">{msg.userName}</h3>
                            <p className="text-xs text-text-secondary flex-shrink-0 ml-2">{msg.time}</p>
                        </div>
                        <p className="text-sm text-text-secondary truncate">{msg.lastMessage}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="h-full">
            {/* Desktop View */}
            <div className="hidden lg:flex h-full">
                <div className="w-1/3 max-w-sm h-full bg-surface border-r border-border flex flex-col">
                    <div className="p-4 border-b border-border flex-shrink-0">
                        <h2 className="text-xl font-bold text-text-primary">All Conversations</h2>
                        <input type="text" placeholder="Search messages..." className="w-full mt-4 bg-background border-border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                    </div>
                    {renderConversationList(setSelectedMessage)}
                </div>
                <div className="flex-1 h-full flex flex-col bg-background">
                    {selectedMessage ? renderChatView(selectedMessage, false) : (
                         <div className="flex justify-center items-center h-full">
                            <p className="text-text-secondary">Select a conversation to start messaging</p>
                        </div>
                    )}
                </div>
            </div>

             {/* Mobile View */}
            <div className="lg:hidden h-full flex flex-col">
                {selectedMobileMessage ? (
                    renderChatView(selectedMobileMessage, true)
                ) : (
                    <>
                        <div className="p-4 border-b border-border flex-shrink-0 bg-surface">
                            <input type="text" placeholder="Search messages..." className="w-full bg-background border-border rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                        </div>
                        {renderConversationList(setSelectedMobileMessage)}
                    </>
                )}
            </div>
        </div>
    );
};

export default HostMessagesPage;
