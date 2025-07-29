"use client";

import type { ReactNode } from "react";
import { SearchLg, Home01, Users01, BookOpen01, Calendar, LifeBuoy01, Settings01 } from "@untitledui/icons";
import { Input } from "@/components/base/input/input";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { cx } from "@/utils/cx";
import { MobileNavigationHeader } from "../base-components/mobile-header";
import { NavAccountCard } from "../base-components/nav-account-card";
import { NavItemBase } from "../base-components/nav-item";
import { NavList } from "../base-components/nav-list";
import type { NavItemType } from "../config";

interface SportsSidebarNavigationProps {
    /** URL of the currently active item. */
    activeUrl?: string;
    /** List of items to display. */
    items?: NavItemType[];
    /** List of footer items to display. */
    footerItems?: NavItemType[];
    /** Feature card to display. */
    featureCard?: ReactNode;
    /** Whether to show the account card. */
    showAccountCard?: boolean;
    /** Whether to hide the right side border. */
    hideBorder?: boolean;
    /** Additional CSS classes to apply to the sidebar. */
    className?: string;
}

export const SportsSidebarNavigation = ({
    activeUrl,
    items = [],
    footerItems = [],
    featureCard,
    showAccountCard = true,
    hideBorder = false,
    className,
}: SportsSidebarNavigationProps) => {
    const MAIN_SIDEBAR_WIDTH = 296;

    const defaultItems: NavItemType[] = [
        {
            label: "Home",
            href: "/",
            icon: Home01,
        },
        {
            label: "Players",
            href: "/players",
            icon: Users01,
            items: [
                { label: "Roster", href: "/players/roster", icon: Users01 },
                { label: "Statistics", href: "/players/stats", icon: Users01 },
                { label: "Performance", href: "/players/performance", icon: Users01 },
                { label: "Injuries", href: "/players/injuries", icon: Users01 },
            ],
        },
        {
            label: "Coaching",
            href: "/coaching",
            icon: BookOpen01,
            items: [
                { label: "Staff", href: "/coaching/staff", icon: BookOpen01 },
                { label: "Training Plans", href: "/coaching/training", icon: BookOpen01 },
                { label: "Drills", href: "/coaching/drills", icon: BookOpen01 },
                { label: "Strategy", href: "/coaching/strategy", icon: BookOpen01 },
            ],
        },
        {
            label: "Events",
            href: "/events",
            icon: Calendar,
            items: [
                { label: "Games", href: "/events/games", icon: Calendar },
                { label: "Practices", href: "/events/practices", icon: Calendar },
                { label: "Tournaments", href: "/events/tournaments", icon: Calendar },
                { label: "Schedule", href: "/events/schedule", icon: Calendar },
            ],
        },
    ];

    const defaultFooterItems: NavItemType[] = [
        {
            label: "Support",
            href: "#",
            icon: LifeBuoy01,
        },
        {
            label: "Settings",
            href: "#",
            icon: Settings01,
        },
    ];

    const navigationItems = items.length > 0 ? items : defaultItems;
    const navigationFooterItems = footerItems.length > 0 ? footerItems : defaultFooterItems;

    const content = (
        <aside
            style={
                {
                    "--width": `${MAIN_SIDEBAR_WIDTH}px`,
                } as React.CSSProperties
            }
            className={cx(
                "flex h-full w-full max-w-full flex-col justify-between overflow-auto bg-primary pt-4 lg:w-(--width) lg:pt-6",
                !hideBorder && "border-secondary md:border-r",
                className,
            )}
        >
            <div className="flex flex-col gap-5 px-4 lg:px-5">
                <UntitledLogo className="h-8" />
                <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} />
            </div>

            <NavList activeUrl={activeUrl} items={navigationItems} />

            <div className="mt-auto flex flex-col gap-4 px-2 py-4 lg:px-4 lg:py-6">
                {navigationFooterItems.length > 0 && (
                    <ul className="flex flex-col">
                        {navigationFooterItems.map((item) => (
                            <li key={item.label} className="py-0.5">
                                <NavItemBase badge={item.badge} icon={item.icon} href={item.href} type="link" current={item.href === activeUrl}>
                                    {item.label}
                                </NavItemBase>
                            </li>
                        ))}
                    </ul>
                )}

                {featureCard}

                {showAccountCard && <NavAccountCard />}
            </div>
        </aside>
    );

    return (
        <>
            {/* Mobile header navigation */}
            <MobileNavigationHeader>{content}</MobileNavigationHeader>

            {/* Desktop sidebar navigation */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex">{content}</div>

            {/* Placeholder to take up physical space because the real sidebar has `fixed` position. */}
            <div
                style={{
                    paddingLeft: MAIN_SIDEBAR_WIDTH,
                }}
                className="invisible hidden lg:sticky lg:top-0 lg:bottom-0 lg:left-0 lg:block"
            />
        </>
    );
}; 