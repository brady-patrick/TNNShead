"use client";

import { Zap } from "@untitledui/icons";
import { SportsNavigation, SportsNavigationBase } from "@/components/application/app-navigation/sports-navigation";
import { Button } from "@/components/base/buttons/button";

export const SportsNavigationSimpleDemo = () => (
    <SportsNavigation activeUrl="/" />
);

export const SportsNavigationPlayersActiveDemo = () => (
    <SportsNavigation activeUrl="/players/roster" />
);

export const SportsNavigationCoachingActiveDemo = () => (
    <SportsNavigation activeUrl="/coaching/training" />
);

export const SportsNavigationEventsActiveDemo = () => (
    <SportsNavigation activeUrl="/events/games" />
);

export const SportsNavigationWithTrailingContentDemo = () => (
    <SportsNavigationBase
        items={[
            { 
                label: "Home", 
                href: "/", 
                icon: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
                current: true 
            },
            { 
                label: "Players", 
                href: "/players", 
                icon: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>,
                items: [
                    { label: "Roster", href: "/players/roster" },
                    { label: "Statistics", href: "/players/stats" },
                    { label: "Performance", href: "/players/performance" },
                    { label: "Injuries", href: "/players/injuries" },
                ]
            },
            { 
                label: "Coaching", 
                href: "/coaching", 
                icon: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
                items: [
                    { label: "Staff", href: "/coaching/staff" },
                    { label: "Training Plans", href: "/coaching/training" },
                    { label: "Drills", href: "/coaching/drills" },
                    { label: "Strategy", href: "/coaching/strategy" },
                ]
            },
            { 
                label: "Events", 
                href: "/events", 
                icon: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
                items: [
                    { label: "Games", href: "/events/games" },
                    { label: "Practices", href: "/events/practices" },
                    { label: "Tournaments", href: "/events/tournaments" },
                    { label: "Schedule", href: "/events/schedule" },
                ]
            },
        ]}
        trailingContent={
            <Button iconLeading={Zap} color="secondary" size="sm">
                New Game
            </Button>
        }
    />
);

export const SportsNavigationCustomDemo = () => (
    <SportsNavigationBase
        items={[
            { 
                label: "Home", 
                href: "/", 
                icon: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            },
            { 
                label: "Players", 
                href: "/players", 
                icon: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>,
                current: true,
                items: [
                    { label: "Roster", href: "/players/roster", current: true },
                    { label: "Statistics", href: "/players/stats" },
                    { label: "Performance", href: "/players/performance" },
                    { label: "Injuries", href: "/players/injuries" },
                ]
            },
            { 
                label: "Coaching", 
                href: "/coaching", 
                icon: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
                items: [
                    { label: "Staff", href: "/coaching/staff" },
                    { label: "Training Plans", href: "/coaching/training" },
                    { label: "Drills", href: "/coaching/drills" },
                    { label: "Strategy", href: "/coaching/strategy" },
                ]
            },
            { 
                label: "Events", 
                href: "/events", 
                icon: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
                items: [
                    { label: "Games", href: "/events/games" },
                    { label: "Practices", href: "/events/practices" },
                    { label: "Tournaments", href: "/events/tournaments" },
                    { label: "Schedule", href: "/events/schedule" },
                ]
            },
        ]}
        trailingContent={
            <div className="flex gap-2">
                <Button color="secondary" size="sm">
                    Add Player
                </Button>
                <Button iconLeading={Zap} color="primary" size="sm">
                    New Game
                </Button>
            </div>
        }
    />
); 