import React, { useState, useEffect, useRef, TouchEvent } from 'react';
import type { User } from '../../types';
import { UserCircleIcon, BookmarkIcon, CalendarDaysIcon, LogoutIcon } from '../IconComponents';

interface StudentProfileDrawerProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const StudentProfileDrawer: React.FC<StudentProfileDrawerProps> = ({ user, isOpen, onClose, onLogout }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchMoveX = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Trigger animation shortly after mount
      const timer = setTimeout(() => {
        setIsAnimatingIn(true);
      }, 10);
      document.body.classList.add('overflow-hidden');
      return () => {
        clearTimeout(timer);
        document.body.classList.remove('overflow-hidden');
      };
    } else {
      setIsAnimatingIn(false);
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    // Use a timeout that matches the transition duration
    setTimeout(() => {
      onClose(); // This will trigger unmount in parent
      setIsClosing(false); // Reset for next time
    }, 300);
  };

  const handleLogoutClick = () => {
    if (window.confirm('Are you sure you want to log out?')) {
        onLogout();
    }
  };

  if (!isOpen) {
    return null;
  }

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchMoveX.current = e.targetTouches[0].clientX;
    if (drawerRef.current) {
      drawerRef.current.style.transition = 'none';
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    touchMoveX.current = e.targetTouches[0].clientX;
    const diff = touchMoveX.current - touchStartX.current;
    if (diff < 0 && drawerRef.current) {
      drawerRef.current.style.transform = `translateX(${diff}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchMoveX.current === null || !drawerRef.current) return;

    const diff = touchMoveX.current - touchStartX.current;
    drawerRef.current.style.transition = 'transform 0.3s ease-in-out';
    const threshold = drawerRef.current.offsetWidth / 3;

    if (diff < -threshold) {
      handleClose();
    } else {
      drawerRef.current.style.transform = 'translateX(0px)';
    }

    touchStartX.current = null;
    touchMoveX.current = null;
  };

  return (
    <div className="fixed inset-0 z-50 h-full w-full">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${isAnimatingIn && !isClosing ? 'opacity-40' : 'opacity-0'}`}
        onClick={handleClose}
      ></div>

      {/* Drawer Content */}
      <div
        ref={drawerRef}
        className={`absolute top-0 left-0 h-full w-[85%] max-w-sm bg-surface shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isAnimatingIn && !isClosing ? 'translate-x-0' : '-translate-x-full'}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="p-6 border-b border-border">
          <img src={user.avatarUrl} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
          <h2 className="text-xl font-bold text-text-primary mt-4">{user.name}</h2>
          <p className="text-text-secondary">{user.email}</p>
        </div>
        <nav className="flex-grow p-4">
          <ul className="space-y-1">
              <li>
                  <a href="#" className="flex items-center p-3 text-text-primary font-semibold hover:bg-background rounded-md transition-colors">
                      <UserCircleIcon className="w-6 h-6 mr-4 text-text-secondary" />
                      <span>Profile</span>
                  </a>
              </li>
              <li>
                  <a href="#" className="flex items-center p-3 text-text-primary font-semibold hover:bg-background rounded-md transition-colors">
                      <BookmarkIcon className="w-6 h-6 mr-4 text-text-secondary" />
                      <span>Bookmarks</span>
                  </a>
              </li>
              <li>
                  <a href="#" className="flex items-center p-3 text-text-primary font-semibold hover:bg-background rounded-md transition-colors">
                      <CalendarDaysIcon className="w-6 h-6 mr-4 text-text-secondary" />
                      <span>Registered Events</span>
                  </a>
              </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center p-3 text-left text-danger font-semibold hover:bg-danger/5 rounded-md transition-colors"
          >
            <LogoutIcon className="w-6 h-6 mr-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileDrawer;