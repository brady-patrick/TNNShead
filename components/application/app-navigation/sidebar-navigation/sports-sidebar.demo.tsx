"use client";

import { SportsSidebarNavigation } from "./sports-sidebar";
import { Button } from "@/components/base/buttons/button";
import { Zap } from "@untitledui/icons";

export const SportsSidebarSimpleDemo = () => (
    <div className="h-screen">
        <SportsSidebarNavigation activeUrl="/" />
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Sports Management Dashboard</h1>
            <p className="text-gray-600">Welcome to your sports team management system.</p>
        </div>
    </div>
);

export const SportsSidebarPlayersActiveDemo = () => (
    <div className="h-screen">
        <SportsSidebarNavigation activeUrl="/players/roster" />
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Players Management</h1>
            <p className="text-gray-600">Manage your team roster, statistics, and player performance.</p>
        </div>
    </div>
);

export const SportsSidebarCoachingActiveDemo = () => (
    <div className="h-screen">
        <SportsSidebarNavigation activeUrl="/coaching/training" />
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Coaching Dashboard</h1>
            <p className="text-gray-600">Access training plans, drills, and coaching strategies.</p>
        </div>
    </div>
);

export const SportsSidebarEventsActiveDemo = () => (
    <div className="h-screen">
        <SportsSidebarNavigation activeUrl="/events/games" />
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Events Management</h1>
            <p className="text-gray-600">Schedule and manage games, practices, and tournaments.</p>
        </div>
    </div>
);

export const SportsSidebarWithFeatureCardDemo = () => (
    <div className="h-screen">
        <SportsSidebarNavigation 
            activeUrl="/" 
            featureCard={
                <div className="rounded-lg bg-brand-primary p-4 text-brand-primary">
                    <h3 className="font-semibold text-sm mb-2">Quick Actions</h3>
                    <div className="space-y-2">
                        <Button size="sm" color="secondary" className="w-full justify-start">
                            Add Player
                        </Button>
                        <Button size="sm" color="secondary" className="w-full justify-start">
                            Schedule Game
                        </Button>
                        <Button size="sm" color="secondary" className="w-full justify-start">
                            Create Training Plan
                        </Button>
                    </div>
                </div>
            }
        />
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Sports Management Dashboard</h1>
            <p className="text-gray-600">Welcome to your sports team management system with quick actions.</p>
        </div>
    </div>
);

export const SportsSidebarCustomDemo = () => (
    <div className="h-screen">
        <SportsSidebarNavigation 
            activeUrl="/players/roster"
            items={[
                {
                    label: "Dashboard",
                    href: "/",
                    icon: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
                },
                {
                    label: "Team Roster",
                    href: "/players/roster",
                    icon: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>,
                    items: [
                        { label: "Active Players", href: "/players/roster", icon: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg> },
                        { label: "Injured Players", href: "/players/injuries", icon: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg> },
                        { label: "Player Stats", href: "/players/stats", icon: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
                    ],
                },
                {
                    label: "Coaching",
                    href: "/coaching",
                    icon: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
                    items: [
                        { label: "Training Plans", href: "/coaching/training", icon: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
                        { label: "Practice Drills", href: "/coaching/drills", icon: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
                        { label: "Coaching Staff", href: "/coaching/staff", icon: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg> },
                    ],
                },
                {
                    label: "Schedule",
                    href: "/events",
                    icon: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
                    items: [
                        { label: "Upcoming Games", href: "/events/games", icon: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
                        { label: "Practice Schedule", href: "/events/practices", icon: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
                        { label: "Tournaments", href: "/events/tournaments", icon: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
                    ],
                },
            ]}
            featureCard={
                <div className="rounded-lg bg-brand-primary p-4 text-brand-primary">
                    <h3 className="font-semibold text-sm mb-2">Quick Stats</h3>
                    <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                            <span>Active Players:</span>
                            <span className="font-semibold">24</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Next Game:</span>
                            <span className="font-semibold">Tomorrow</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Practice:</span>
                            <span className="font-semibold">Today 3PM</span>
                        </div>
                    </div>
                </div>
            }
        />
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Team Roster</h1>
            <p className="text-gray-600">Custom sports sidebar with detailed navigation and quick stats.</p>
        </div>
    </div>
); 