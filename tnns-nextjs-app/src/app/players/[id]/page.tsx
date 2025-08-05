"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PageHeaderBannerAvatar } from "../../../components/PageHeaderBannerAvatar";
import { MetricsSimple } from "../../../components/MetricsSimple";
import { StatsDrawer } from "../../../components/StatsDrawer";
import { PlayerJourney, JourneyEvent } from "../../../components/PlayerJourney";
import { JourneyDrawer } from "../../../components/JourneyDrawer";
import { ComparisonDrawer } from "../../../components/ComparisonDrawer";
import { MatchSuggestions } from "../../../components/MatchSuggestions";
import { getPlayerData } from "../../../utils/playerData";

export default function PlayerProfilePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const playerId = params.id as string;
  
  const [isStatsDrawerOpen, setIsStatsDrawerOpen] = useState(false);
  const [isJourneyDrawerOpen, setIsJourneyDrawerOpen] = useState(false);
  const [isComparisonDrawerOpen, setIsComparisonDrawerOpen] = useState(false);

  // Check if compare parameter is present and open comparison drawer
  useEffect(() => {
    if (searchParams.get('compare') === 'true') {
      setIsComparisonDrawerOpen(true);
    }
  }, [searchParams]);

  // Monitor comparison drawer state changes
  useEffect(() => {
    console.log('Comparison drawer state changed to:', isComparisonDrawerOpen);
    console.log('Search params:', searchParams.toString());
  }, [isComparisonDrawerOpen, searchParams]);
  
  // Get player data based on ID
  const playerData = getPlayerData(playerId);
  
  // If player not found, show error or redirect
  if (!playerData) {
    return (
      <div className="py-8 px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Player Not Found</h1>
          <p className="mt-2 text-gray-600">The player you're looking for doesn't exist.</p>
          <Link href="/players" className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Back to Players
          </Link>
        </div>
      </div>
    );
  }
  
  const { profile: playerProfile, stats, journeyEvents, matchSuggestions, achievements } = playerData;

  // Debug logging
  console.log('Current comparison drawer state:', isComparisonDrawerOpen);

  return (
    <div className={`transition-all duration-300 ${isStatsDrawerOpen || isJourneyDrawerOpen || isComparisonDrawerOpen ? 'lg:mr-96' : ''}`} style={{minHeight: '100vh'}}>
      {/* Breadcrumb Navigation */}
      <div className="py-4 px-6 lg:px-8">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/players" className="text-gray-500 hover:text-gray-700 text-sm">
                Players
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <span className="text-gray-900 text-sm font-medium">
                {playerProfile.firstName} {playerProfile.lastName}
              </span>
            </li>

          </ol>
        </nav>
      </div>
      

      
      <PageHeaderBannerAvatar 
        playerProfile={playerProfile}
        onProfileUpdate={() => {}} // No-op for viewing other players
        isReadOnly={true} // Make it read-only for other players
        compareButton={
          <button 
            onClick={() => setIsComparisonDrawerOpen(true)}
            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Compare Stats
          </button>
        }
      />
      
      {/* Ranking Stats */}
      <div className="py-8 px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Player rankings</h2>
          <button 
            onClick={() => setIsStatsDrawerOpen(!isStatsDrawerOpen)}
            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
          >
            {isStatsDrawerOpen ? 'Close stats' : 'View all stats'}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricsSimple 
            title={stats.utrRating} 
            subtitle="UTR Rating" 
            trend={stats.utrChange.startsWith('+') ? "positive" : stats.utrChange.startsWith('-') ? "negative" : "neutral"} 
            type="modern" 
            footer={null} 
            change={stats.utrChange} 
          />
          <MetricsSimple 
            title={stats.ustaRating} 
            subtitle="USTA Rating" 
            trend={stats.ustaChange.startsWith('+') ? "positive" : stats.ustaChange.startsWith('-') ? "negative" : "neutral"} 
            type="modern" 
            footer={null} 
            change={stats.ustaChange} 
          />
          <MetricsSimple 
            title={stats.nslLevel} 
            subtitle="NSL Level" 
            trend={stats.nslChange === "↑" ? "positive" : stats.nslChange === "↓" ? "negative" : "neutral"} 
            type="modern" 
            footer={null} 
            change={stats.nslChange} 
          />
        </div>
      </div>

      {/* Player Journey */}
      <div className="py-4 px-6 lg:px-8">
        <PlayerJourney 
          events={journeyEvents}
          isDrawerOpen={isJourneyDrawerOpen}
          onDrawerToggle={setIsJourneyDrawerOpen}
          compact={true}
        />
      </div>

      {/* Player Information Card */}
      <div className="py-4 px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Player Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Personal Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{playerProfile.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{playerProfile.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{playerProfile.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bio:</span>
                  <span className="font-medium">{playerProfile.bio}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Achievements</h4>
              <ul className="space-y-1 text-sm">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-500 mr-2">🏆</span>
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons for Other Player */}
      <div className="py-4 px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Connect with {playerProfile.firstName} {playerProfile.lastName}</h3>
          <div className="flex flex-wrap gap-3">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Send Match Request
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              Follow Player
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
              Send Message
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
              View Full Profile
            </button>
          </div>
        </div>
      </div>

      {/* Match Suggestions */}
      <div className="py-4 px-6 lg:px-8">
        <MatchSuggestions suggestions={matchSuggestions} />
      </div>

      <StatsDrawer 
        isOpen={isStatsDrawerOpen} 
        onOpenChange={setIsStatsDrawerOpen} 
        playerProfile={playerProfile}
        playerStats={stats}
      />
      
      <JourneyDrawer 
        isOpen={isJourneyDrawerOpen} 
        onOpenChange={setIsJourneyDrawerOpen} 
        events={journeyEvents}
      />
      

      
      <ComparisonDrawer 
        isOpen={isComparisonDrawerOpen} 
        onOpenChange={setIsComparisonDrawerOpen} 
        playerProfile={playerProfile}
        playerStats={stats}
      />
    </div>
  );
} 