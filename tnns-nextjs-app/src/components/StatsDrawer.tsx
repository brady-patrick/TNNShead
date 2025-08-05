"use client";

import { useState } from "react";
import { CloseButton } from "./base/buttons/close-button";
import { MetricsSimple } from "./MetricsSimple";
import { useUser } from "@/contexts/UserContext";
import { PlayerProfile, PlayerStats } from "../utils/playerData";

interface StatsDrawerProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    playerProfile?: PlayerProfile;
    playerStats?: PlayerStats;
}

const Divider = () => (
    <svg className="h-[2.5px] w-full">
        <line
            x1="1.2"
            y1="1.2"
            x2="100%"
            y2="1.2"
            className="stroke-border-primary"
            stroke="black"
            strokeWidth="2.4"
            strokeDasharray="0,6"
            strokeLinecap="round"
        />
    </svg>
);

export const StatsDrawer = ({ isOpen, onOpenChange, playerProfile: propPlayerProfile, playerStats }: StatsDrawerProps) => {
    const { playerProfile: contextPlayerProfile } = useUser();
    
    // Use prop data if provided, otherwise fall back to context
    const playerProfile = propPlayerProfile || contextPlayerProfile;
    
    // Calculate age from date of birth
    const calculateAge = (dateOfBirth: string): number => {
        if (!dateOfBirth) return 0;
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onOpenChange(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl border-l border-gray-200 z-50 lg:top-0">
            <div className="relative w-full h-full flex flex-col">
                <CloseButton 
                    className="absolute top-3 right-3 z-10" 
                    theme="light" 
                    onClick={() => onOpenChange(false)} 
                />
                
                <div className="px-2 pt-2">
                    <div 
                        className="h-32 w-full rounded-xl object-cover md:h-36 relative overflow-hidden"
                        style={{
                            backgroundImage: playerProfile.headerImage ? `url(${playerProfile.headerImage})` : undefined,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {!playerProfile.headerImage && (
                            <div className="h-full w-full bg-gradient-to-t from-[#FBC5EC] to-[#A5C0EE]"></div>
                        )}
                    </div>
                </div>

                <div className="relative -mt-12 flex flex-col gap-4 px-4 md:px-6">
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                        {playerProfile.avatarImage ? (
                            <img 
                                src={playerProfile.avatarImage} 
                                alt={`${playerProfile.firstName} ${playerProfile.lastName}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-gray-600 text-lg">
                                {playerProfile.firstName.charAt(0)}{playerProfile.lastName.charAt(0)}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col items-start gap-4">
                        <div className="max-w-50 min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                                <p className="truncate text-lg font-semibold text-gray-900">
                                    {playerProfile.firstName} {playerProfile.lastName}
                                </p>
                                <span className="text-blue-600">✓</span>
                            </div>
                            <div className="flex flex-col gap-1 text-md text-balance text-tertiary">
                                <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{playerProfile.location || "No location set"}</span>
                                </div>
                                {playerProfile.dateOfBirth && (
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>{calculateAge(playerProfile.dateOfBirth)} years old</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-col gap-4 p-4 md:p-6">
                        <Divider />

                        {/* Player Stats Section */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Player Stats</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <MetricsSimple 
                                    title={playerStats?.ustaRating || "4.5"} 
                                    subtitle="USTA Singles" 
                                    trend={playerStats?.ustaChange?.startsWith('+') ? "positive" : playerStats?.ustaChange?.startsWith('-') ? "negative" : "neutral"} 
                                    type="modern" 
                                    footer={null} 
                                    change={playerStats?.ustaChange || "0.0"} 
                                />
                                <MetricsSimple 
                                    title="4.0" 
                                    subtitle="USTA Doubles" 
                                    trend="neutral" 
                                    type="modern" 
                                    footer={null} 
                                    change="0.0" 
                                />
                                <MetricsSimple 
                                    title={playerStats?.utrRating || "8.5"} 
                                    subtitle="UTR Singles" 
                                    trend={playerStats?.utrChange?.startsWith('+') ? "positive" : playerStats?.utrChange?.startsWith('-') ? "negative" : "neutral"} 
                                    type="modern" 
                                    footer={null} 
                                    change={playerStats?.utrChange || "+0.2"} 
                                />
                                <MetricsSimple 
                                    title="8.2" 
                                    subtitle="UTR Doubles" 
                                    trend="positive" 
                                    type="modern" 
                                    footer={null} 
                                    change="+0.1" 
                                />
                                <MetricsSimple 
                                    title={playerStats?.nslLevel || "A"} 
                                    subtitle="NSL Level" 
                                    trend={playerStats?.nslChange === "↑" ? "positive" : playerStats?.nslChange === "↓" ? "negative" : "neutral"} 
                                    type="modern" 
                                    footer={null} 
                                    change={playerStats?.nslChange || "↑"} 
                                />
                                <MetricsSimple 
                                    title="78%" 
                                    subtitle="Win Rate" 
                                    trend="positive" 
                                    type="modern" 
                                    footer={null} 
                                    change="+3%" 
                                />
                            </div>
                        </div>

                        <Divider />

                        <form id="stats-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex items-end gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input 
                                        type="text" 
                                        defaultValue={playerProfile.firstName} 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                                    <input 
                                        type="text" 
                                        defaultValue={playerProfile.lastName} 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <Divider />

                            <div className="flex flex-1 flex-col gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        defaultValue={playerProfile.email} 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-blue-600">✓</span>
                                    <p className="text-xs font-semibold text-blue-600">Verified 2 Jan, 2025</p>
                                </div>
                            </div>

                            <Divider />

                            <div className="relative flex flex-1 items-center">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2 text-gray-500">tnns.com/@</span>
                                        <input 
                                            type="text" 
                                            defaultValue={`${playerProfile.firstName.toLowerCase()}${playerProfile.lastName.toLowerCase()}`} 
                                            className="w-full pl-20 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <span className="absolute right-3 top-2 text-green-600">✓</span>
                                    </div>
                                </div>
                            </div>

                            <Divider />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}; 