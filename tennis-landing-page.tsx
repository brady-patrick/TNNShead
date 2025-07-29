"use client";

import { useState } from "react";
import { ArrowRight, TrendingUp01, Zap, Users01, Trophy01, Calendar, Search01, Play } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithDot, BadgeWithIcon } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icons";
import { cx } from "@/utils/cx";

// Mock data for the tennis app
const playerData = {
  name: "Sarah Johnson",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b2da8f23?w=100&h=100&fit=crop&crop=face",
  rankings: {
    usta: { rank: 127, change: "+5" },
    utn: { rank: 89, change: "-2" },
    nst: { rank: 156, change: "+12" }
  }
};

const recentMatches = [
  {
    id: 1,
    opponent: "Maria Rodriguez",
    opponentAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    result: "W",
    score: "6-4, 6-2",
    tournament: "Spring Championships",
    date: "2024-01-15"
  },
  {
    id: 2,
    opponent: "Emily Chen",
    opponentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    result: "L",
    score: "4-6, 6-3, 6-7",
    tournament: "Winter Classic",
    date: "2024-01-08"
  },
  {
    id: 3,
    opponent: "Jessica Turner",
    opponentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    result: "W",
    score: "6-1, 6-4",
    tournament: "Regional Open",
    date: "2024-01-02"
  }
];

const upcomingEvents = [
  {
    id: 1,
    name: "National Championship Qualifier",
    date: "2024-02-15",
    location: "Los Angeles, CA",
    type: "Tournament"
  },
  {
    id: 2,
    name: "Spring Training Camp",
    date: "2024-02-20",
    location: "Phoenix, AZ", 
    type: "Training"
  },
  {
    id: 3,
    name: "Regional Team Match",
    date: "2024-02-25",
    location: "San Diego, CA",
    type: "Match"
  }
];

export default function TennisLandingPage() {
  const [activeTab, setActiveTab] = useState("rankings");

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="border-b border-secondary bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <FeaturedIcon 
                  icon={Trophy01} 
                  color="brand" 
                  theme="modern" 
                  size="sm"
                />
                <span className="text-xl font-bold text-primary">TennisTracker</span>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <button 
                  onClick={() => setActiveTab("rankings")}
                  className={cx(
                    "text-sm font-medium transition-colors hover:text-brand-secondary",
                    activeTab === "rankings" ? "text-brand-secondary" : "text-tertiary"
                  )}
                >
                  Rankings
                </button>
                <button 
                  onClick={() => setActiveTab("matches")}
                  className={cx(
                    "text-sm font-medium transition-colors hover:text-brand-secondary",
                    activeTab === "matches" ? "text-brand-secondary" : "text-tertiary"
                  )}
                >
                  Matches
                </button>
                <button 
                  onClick={() => setActiveTab("scouting")}
                  className={cx(
                    "text-sm font-medium transition-colors hover:text-brand-secondary",
                    activeTab === "scouting" ? "text-brand-secondary" : "text-tertiary"
                  )}
                >
                  Scouting
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Button color="tertiary" size="sm">
                Sign In
              </Button>
              <Button color="primary" size="sm">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-display-lg font-bold text-primary mb-6">
              Elevate Your Tennis Game with
              <span className="text-brand-secondary"> AI-Powered</span> Analytics
            </h1>
            <p className="text-xl text-tertiary mb-8 max-w-3xl mx-auto">
              Track your rankings, analyze your performance, and get personalized coaching insights 
              that help you dominate the court. Join thousands of players improving their game.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                color="primary" 
                size="lg"
                iconTrailing={ArrowRight}
              >
                Start Your Journey
              </Button>
              <Button 
                color="secondary" 
                size="lg"
                iconLeading={Play}
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Player Dashboard Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="mx-auto max-w-7xl">
          <div className="bg-primary rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <Avatar 
                src={playerData.avatar}
                alt={playerData.name}
                size="xl"
              />
              <div>
                <h3 className="text-2xl font-bold text-primary">{playerData.name}</h3>
                <BadgeWithDot color="success" size="md">
                  Active Player
                </BadgeWithDot>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* USTA Ranking */}
              <div className="bg-secondary rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-primary">USTA Ranking</h4>
                  <FeaturedIcon 
                    icon={TrendingUp01} 
                    color="success" 
                    theme="light" 
                    size="sm"
                  />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  #{playerData.rankings.usta.rank}
                </div>
                <BadgeWithIcon 
                  color="success" 
                  iconLeading={TrendingUp01}
                  size="sm"
                >
                  {playerData.rankings.usta.change}
                </BadgeWithIcon>
              </div>

              {/* UTN Ranking */}
              <div className="bg-secondary rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-primary">UTN Ranking</h4>
                  <FeaturedIcon 
                    icon={TrendingUp01} 
                    color="warning" 
                    theme="light" 
                    size="sm"
                  />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  #{playerData.rankings.utn.rank}
                </div>
                <BadgeWithIcon 
                  color="error" 
                  iconLeading={TrendingUp01}
                  size="sm"
                >
                  {playerData.rankings.utn.change}
                </BadgeWithIcon>
              </div>

              {/* NST Ranking */}
              <div className="bg-secondary rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-primary">NST Ranking</h4>
                  <FeaturedIcon 
                    icon={TrendingUp01} 
                    color="brand" 
                    theme="light" 
                    size="sm"
                  />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  #{playerData.rankings.nst.rank}
                </div>
                <BadgeWithIcon 
                  color="success" 
                  iconLeading={TrendingUp01}
                  size="sm"
                >
                  {playerData.rankings.nst.change}
                </BadgeWithIcon>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Coach Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FeaturedIcon 
                  icon={Zap} 
                  color="brand" 
                  theme="gradient" 
                  size="lg"
                />
                <Badge color="brand" size="lg">
                  AI Powered
                </Badge>
              </div>
              <h2 className="text-display-md font-bold text-primary mb-6">
                Your Personal Tennis Coach, Available 24/7
              </h2>
              <p className="text-lg text-tertiary mb-8">
                Get instant feedback on your game, personalized training recommendations, 
                and strategic insights that adapt to your playing style and goals.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-solid rounded-full"></div>
                  <span className="text-secondary">Real-time match analysis</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-solid rounded-full"></div>
                  <span className="text-secondary">Personalized training plans</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-solid rounded-full"></div>
                  <span className="text-secondary">Opponent strategy recommendations</span>
                </li>
              </ul>
              <Button 
                color="primary" 
                size="lg"
                iconTrailing={ArrowRight}
              >
                Try AI Coach Free
              </Button>
            </div>
            <div className="bg-gradient-to-br from-brand-secondary to-brand-solid rounded-2xl p-8 text-white">
              <div className="space-y-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-sm opacity-80 mb-2">Latest AI Insight</p>
                  <p className="font-medium">
                    "Your backhand cross-court accuracy has improved 23% this month. 
                    Focus on increasing topspin for more consistency."
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-sm opacity-80 mb-2">Training Recommendation</p>
                  <p className="font-medium">
                    "Practice serve placement drills. Target 15 minutes daily on wide serves to your opponent's forehand."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Matches Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-display-md font-bold text-primary mb-4">
              Track Every Match, Improve Every Game
            </h2>
            <p className="text-lg text-tertiary max-w-2xl mx-auto">
              Keep detailed records of your matches and see your progress over time with comprehensive analytics.
            </p>
          </div>

          <div className="bg-primary rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-primary">Recent Matches</h3>
              <Button color="tertiary" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentMatches.map((match) => (
                <div key={match.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar 
                      src={match.opponentAvatar}
                      alt={match.opponent}
                      size="md"
                    />
                    <div>
                      <p className="font-medium text-primary">{match.opponent}</p>
                      <p className="text-sm text-tertiary">{match.tournament}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Badge 
                        color={match.result === "W" ? "success" : "error"}
                        size="sm"
                      >
                        {match.result === "W" ? "Win" : "Loss"}
                      </Badge>
                      <span className="text-sm text-secondary">{match.score}</span>
                    </div>
                    <p className="text-xs text-tertiary mt-1">{match.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-display-md font-bold text-primary mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-tertiary">
              Stay updated with tournaments, training sessions, and matches in your area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-secondary rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <FeaturedIcon 
                    icon={Calendar} 
                    color="brand" 
                    theme="light" 
                    size="sm"
                  />
                  <Badge color="brand" size="sm">
                    {event.type}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {event.name}
                </h3>
                <p className="text-sm text-tertiary mb-2">{event.location}</p>
                <p className="text-sm text-secondary">{event.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Player Scouting Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-primary rounded-2xl p-8">
              <div className="text-center mb-6">
                <FeaturedIcon 
                  icon={Search01} 
                  color="brand" 
                  theme="modern" 
                  size="xl"
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Scout Your Competition
                </h3>
                <p className="text-tertiary">
                  Access comprehensive player profiles and match history
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <span className="text-sm text-secondary">Match History</span>
                  <Badge color="success" size="sm">Available</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <span className="text-sm text-secondary">Playing Style Analysis</span>
                  <Badge color="success" size="sm">Available</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <span className="text-sm text-secondary">Weakness Identification</span>
                  <Badge color="brand" size="sm">Premium</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FeaturedIcon 
                  icon={Users01} 
                  color="success" 
                  theme="gradient" 
                  size="lg"
                />
                <Badge color="success" size="lg">
                  Scouting Pro
                </Badge>
              </div>
              <h2 className="text-display-md font-bold text-primary mb-6">
                Know Your Opponents Before You Play
              </h2>
              <p className="text-lg text-tertiary mb-8">
                Get detailed insights into your upcoming opponents' playing styles, strengths, 
                weaknesses, and recent performance trends to gain a competitive edge.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-secondary mb-1">10K+</div>
                  <div className="text-sm text-tertiary">Player Profiles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-secondary mb-1">50K+</div>
                  <div className="text-sm text-tertiary">Match Records</div>
                </div>
              </div>
              <Button 
                color="primary" 
                size="lg"
                iconTrailing={ArrowRight}
              >
                Start Scouting
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-display-md font-bold text-primary mb-6">
            Ready to Take Your Tennis to the Next Level?
          </h2>
          <p className="text-xl text-tertiary mb-8">
            Join thousands of players who are already using TennisTracker to improve their game.
            Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              color="primary" 
              size="xl"
              iconTrailing={ArrowRight}
            >
              Start Free Trial
            </Button>
            <Button 
              color="secondary" 
              size="xl"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FeaturedIcon 
                  icon={Trophy01} 
                  color="brand" 
                  theme="modern" 
                  size="sm"
                />
                <span className="text-lg font-bold text-primary">TennisTracker</span>
              </div>
              <p className="text-sm text-tertiary">
                The ultimate tennis analytics platform for players of all levels.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-primary mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-tertiary">
                <li><a href="#" className="hover:text-secondary">Rankings</a></li>
                <li><a href="#" className="hover:text-secondary">AI Coach</a></li>
                <li><a href="#" className="hover:text-secondary">Match Tracking</a></li>
                <li><a href="#" className="hover:text-secondary">Scouting</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-primary mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-tertiary">
                <li><a href="#" className="hover:text-secondary">About</a></li>
                <li><a href="#" className="hover:text-secondary">Blog</a></li>
                <li><a href="#" className="hover:text-secondary">Careers</a></li>
                <li><a href="#" className="hover:text-secondary">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-primary mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-tertiary">
                <li><a href="#" className="hover:text-secondary">Help Center</a></li>
                <li><a href="#" className="hover:text-secondary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-secondary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-secondary">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-tertiary mt-8 pt-8 text-center">
            <p className="text-sm text-tertiary">
              © 2024 TennisTracker. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}