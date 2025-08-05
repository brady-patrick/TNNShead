'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PlayerProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  location: string;
  bio: string;
  avatarImage?: string;
  headerImage?: string;
}

interface PlayerStats {
  utrRating: string;
  ustaRating: string;
  nslLevel: string;
  utrChange: string;
  ustaChange: string;
  nslChange: string;
}

interface UserContextType {
  playerProfile: PlayerProfile;
  playerStats: PlayerStats;
  updatePlayerProfile: (profile: PlayerProfile) => void;
  updatePlayerStats: (stats: PlayerStats) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  console.log('useUser hook called, context:', context);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile>({
    firstName: "Olivia",
    lastName: "Rhye",
    email: "olivia@untitledui.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1995-03-15",
    location: "Los Angeles, CA",
    bio: "Professional tennis player with 10+ years of experience. USTA Level 4.5 Champion 2023. Passionate about coaching and helping others improve their game.",
    avatarImage: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
    headerImage: undefined
  });

  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    utrRating: "8.5",
    ustaRating: "4.5",
    nslLevel: "A",
    utrChange: "+0.2",
    ustaChange: "0.0",
    nslChange: "↑"
  });

  const updatePlayerProfile = (profile: PlayerProfile) => {
    setPlayerProfile(profile);
  };

  const updatePlayerStats = (stats: PlayerStats) => {
    setPlayerStats(stats);
  };

  return (
    <UserContext.Provider value={{ playerProfile, playerStats, updatePlayerProfile, updatePlayerStats }}>
      {children}
    </UserContext.Provider>
  );
}; 