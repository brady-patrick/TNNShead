"use client";

import { useState } from "react";
import { PageHeaderBannerAvatar } from "../components/PageHeaderBannerAvatar";
import { MetricsSimple } from "../components/MetricsSimple";
import { StatsDrawer } from "../components/StatsDrawer";
import { PlayerJourney, JourneyEvent } from "../components/PlayerJourney";
import { JourneyDrawer } from "../components/JourneyDrawer";
import { TrainingPlaylist } from "../components/TrainingPlaylist";
import { NextEventPreparation } from "../components/NextEventPreparation";
import { MatchSuggestions } from "../components/MatchSuggestions";
import { useUser } from "@/contexts/UserContext";

export default function Home() {
  const [isStatsDrawerOpen, setIsStatsDrawerOpen] = useState(false);
  const [isJourneyDrawerOpen, setIsJourneyDrawerOpen] = useState(false);
  
  // Use shared user context instead of local state
  const { playerProfile, playerStats, updatePlayerProfile } = useUser();

  // Sample journey events data for Olivia
  const journeyEvents: JourneyEvent[] = [
    {
      id: '1',
      type: 'match',
      title: 'Match vs. Samuel Ortiz',
      description: 'Competitive match against local club player',
      date: '2024-01-15',
      result: 'W',
      opponent: 'Samuel Ortiz',
      score: '6-4, 7-5',
      icon: '🎾',
      color: 'bg-blue-100 text-blue-600',
      player1: {
        name: 'Olivia Rhye',
        scores: ['6', '7']
      },
      player2: {
        name: 'Samuel Ortiz',
        scores: ['4', '5']
      },
      tournament: 'USTA Level 6 Open - Lakewood Junior Open',
      utrRating: '8.5'
    },
    {
      id: '2',
      type: 'match',
      title: 'Match vs. Alex Rodriguez',
      description: 'League match with strong opponent',
      date: '2024-01-12',
      result: 'L',
      opponent: 'Alex Rodriguez',
      score: '4-6, 6-7',
      icon: '🎾',
      color: 'bg-blue-100 text-blue-600',
      player1: {
        name: 'Olivia Rhye',
        scores: ['4', '6']
      },
      player2: {
        name: 'Alex Rodriguez',
        scores: ['6', '7']
      },
      tournament: 'USTA Level 6 Open - Lakewood Junior Open',
      utrRating: '8.5'
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Won State Open Championship!',
      description: 'Achieved 1st place in the USTA California State Open (Women\'s Open).',
      date: '2024-01-08',
      icon: '🏆',
      color: 'bg-yellow-100 text-yellow-600',
      utrRating: '8.5'
    },
    {
      id: '4',
      type: 'match',
      title: 'Match vs. David Kim',
      description: 'Tournament semifinal match',
      date: '2024-01-05',
      result: 'W',
      opponent: 'David Kim',
      score: '6-3, 6-2',
      icon: '🎾',
      color: 'bg-blue-100 text-blue-600',
      player1: {
        name: 'Olivia Rhye',
        scores: ['6', '6']
      },
      player2: {
        name: 'David Kim',
        scores: ['3', '2']
      },
      tournament: 'USTA California State Open',
      utrRating: '8.5'
    },
    {
      id: '5',
      type: 'coaching',
      title: 'Serve Technique Session',
      description: 'Worked on improving serve placement and power',
      date: '2024-01-03',
      icon: '👨‍🏫',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: '6',
      type: 'training',
      title: 'Cardio & Footwork',
      description: 'Intensive footwork and endurance training',
      date: '2024-01-01',
      icon: '💪',
      color: 'bg-red-100 text-red-600'
    }
  ];

  // Sample training playlist data
  const trainingItems = [
    {
      id: '1',
      title: 'Serve Accuracy Drill',
      type: 'drill' as const,
      duration: '15 min',
      difficulty: 'intermediate' as const,
      category: 'Serving',
      description: 'Focus on placement and consistency with target practice'
    },
    {
      id: '2',
      title: 'Footwork & Agility',
      type: 'workout' as const,
      duration: '20 min',
      difficulty: 'advanced' as const,
      category: 'Fitness',
      description: 'Ladder drills and cone exercises to improve court movement'
    },
    {
      id: '3',
      title: 'Backhand Technique',
      type: 'video' as const,
      duration: '8 min',
      difficulty: 'beginner' as const,
      category: 'Technique',
      description: 'Step-by-step guide to perfecting your backhand stroke'
    }
  ];

  // Sample next event data
  const nextEvent = {
    id: '1',
    title: 'USTA League Match',
    date: '2024-01-20',
    time: '2:00 PM',
    location: 'Lakewood Tennis Center',
    type: 'match' as const,
    opponent: 'Sarah Johnson',
    preparationTips: [
      'Practice serve placement for 30 minutes',
      'Review opponent\'s playing style from previous matches',
      'Focus on footwork and court positioning',
      'Stay hydrated and get good rest the night before'
    ]
  };

  // Sample match suggestions data
  const matchSuggestions = [
    {
      id: '1',
      playerName: 'Avery Chen',
      utrRating: '7.4',
      ustaRating: '4.5',
      location: 'Downtown Tennis Club',
      availability: 'Weekends',
      matchScore: 92,
      lastActive: '2 hours ago',
      mutualConnections: 3
    },
    {
      id: '2',
      playerName: 'Marcus Rodriguez',
      utrRating: '7.1',
      ustaRating: '4.0',
      location: 'Westside Courts',
      availability: 'Evenings',
      matchScore: 87,
      lastActive: '1 day ago',
      mutualConnections: 1
    },
    {
      id: '3',
      playerName: 'Emma Thompson',
      utrRating: '7.6',
      ustaRating: '4.5',
      location: 'Central Park Tennis',
      availability: 'Mornings',
      matchScore: 78,
      lastActive: '3 hours ago'
    }
  ];

  const features = [
    {
      title: 'Players',
      description: 'Manage player profiles and statistics',
      icon: '👥',
      color: 'indigo'
    },
    {
      title: 'Coaching',
      description: 'Track coaching sessions and progress',
      icon: '🎾',
      color: 'green'
    },
    {
      title: 'Events',
      description: 'Organize and manage tennis events',
      icon: '📅',
      color: 'purple'
    }
  ];

  return (
    <div className={`transition-all duration-300 ${isStatsDrawerOpen || isJourneyDrawerOpen ? 'lg:mr-96' : ''}`}>
      <PageHeaderBannerAvatar 
        playerProfile={playerProfile}
        onProfileUpdate={updatePlayerProfile}
        playerStats={playerStats}
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
            title={playerStats.utrRating} 
            subtitle="UTR Rating" 
            trend={playerStats.utrChange?.startsWith('+') ? "positive" : playerStats.utrChange?.startsWith('-') ? "negative" : "neutral"} 
            type="modern" 
            footer={null} 
            change={playerStats.utrChange} 
          />
          <MetricsSimple 
            title={playerStats.ustaRating} 
            subtitle="USTA Rating" 
            trend={playerStats.ustaChange?.startsWith('+') ? "positive" : playerStats.ustaChange?.startsWith('-') ? "negative" : "neutral"} 
            type="modern" 
            footer={null} 
            change={playerStats.ustaChange} 
          />
          <MetricsSimple 
            title={playerStats.nslLevel} 
            subtitle="NSL Level" 
            trend={playerStats.nslChange === "↑" ? "positive" : playerStats.nslChange === "↓" ? "negative" : "neutral"} 
            type="modern" 
            footer={null} 
            change={playerStats.nslChange} 
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

      {/* Training & Preparation Modules */}
      <div className="py-4 px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NextEventPreparation event={nextEvent} />
          <TrainingPlaylist items={trainingItems} />
        </div>
      </div>

      {/* AI Coaching CTA */}
      <div className="py-4 px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md overflow-hidden">
          <div className="px-4 py-4">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Get AI-Powered Tennis Coaching
              </h3>
              <p className="text-purple-100 text-sm mb-4 max-w-lg mx-auto">
                Upload a video for instant AI analysis and personalized feedback.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button className="bg-white text-purple-600 hover:bg-gray-50 px-4 py-2 rounded-md font-semibold text-sm transition-colors duration-200 flex items-center justify-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload video
                </button>
                <button className="border border-white/30 text-white hover:bg-white/10 px-4 py-2 rounded-md font-semibold text-sm transition-colors duration-200">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Match Suggestions */}
      <div className="py-4 px-6 lg:px-8">
        <MatchSuggestions suggestions={matchSuggestions} />
      </div>
      
      <div className="py-12 px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to <span className="text-indigo-600">TNNS</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Your comprehensive tennis management system for players, coaching, and events.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
                              <a
                  href="/players"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Get started
                </a>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                              <a
                  href="/events"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  View events
                </a>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 bg-${feature.color}-500 rounded-md flex items-center justify-center`}>
                        <span className="text-white text-lg">{feature.icon}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                      <p className="text-sm text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">System overview</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-2xl font-bold bg-indigo-100 text-indigo-800">24</span>
                <p className="text-sm text-gray-500 mt-1">Active players</p>
              </div>
              <div className="text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-2xl font-bold bg-green-100 text-green-800">12</span>
                <p className="text-sm text-gray-500 mt-1">This week sessions</p>
              </div>
              <div className="text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-2xl font-bold bg-yellow-100 text-yellow-800">8</span>
                <p className="text-sm text-gray-500 mt-1">Upcoming events</p>
              </div>
              <div className="text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-2xl font-bold bg-gray-100 text-gray-800">156</span>
                <p className="text-sm text-gray-500 mt-1">Total hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StatsDrawer 
        isOpen={isStatsDrawerOpen} 
        onOpenChange={setIsStatsDrawerOpen} 
      />
      
      <JourneyDrawer 
        isOpen={isJourneyDrawerOpen} 
        onOpenChange={setIsJourneyDrawerOpen} 
        events={journeyEvents}
      />
    </div>
  );
}
