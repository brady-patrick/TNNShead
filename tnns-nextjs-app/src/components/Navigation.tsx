'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeLine,
  Users01,
  LifeBuoy01,
  Calendar,
  Settings01,
  SearchLg,
  ChevronSelectorVertical,
  User01,
  LogOut01,
  MessageChatCircle,
  LayoutAlt01,
  BarChartSquare02,
  CheckDone01,
  CurrencyDollarCircle,
  Grid03,
  Package,
  NotificationBox,
  LineChartUp03,
  Star01,
  Rows01,
  UsersPlus,
  Archive,
  PieChart03,
} from '@untitledui/icons';
import { useRef } from 'react';
import { Button } from 'react-aria-components';
import { Popover, DialogTrigger } from 'react-aria-components';
import { useUser } from '@/contexts/UserContext';
import { SidebarNavigationSimple } from '@/components/application/app-navigation/sidebar-navigation/sidebar-simple';
import { BadgeWithDot } from '@/components/base/badges/badges';
import { FeaturedCardProgressBar } from '@/components/application/app-navigation/base-components/featured-cards.demo';
import type { NavItemType } from '@/components/application/app-navigation/config';

export default function Navigation() {
  const pathname = usePathname();
  const { playerProfile } = useUser();

  const navItems: NavItemType[] = [
    {
      label: 'Home',
      href: '/',
      icon: HomeLine,
      items: [
        { label: 'Overview', href: '/overview', icon: Grid03 },
        { label: 'Players', href: '/players', icon: Users01 },
        { label: 'Coaching', href: '/coaching', icon: LifeBuoy01 },
        { label: 'Events', href: '/events', icon: Calendar },
      ],
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: BarChartSquare02,
      items: [
        { label: 'Overview', href: '/dashboard/overview', icon: Grid03 },
        { label: 'Notifications', href: '/dashboard/notifications', icon: NotificationBox, badge: 10 },
        { label: 'Analytics', href: '/dashboard/analytics', icon: LineChartUp03 },
        { label: 'Saved reports', href: '/dashboard/saved-reports', icon: Star01 },
      ],
    },
    {
      label: 'Training',
      href: '/training',
      icon: Rows01,
      items: [
        { label: 'View all', href: '/training/all', icon: Rows01 },
        { label: 'Personal', href: '/training/personal', icon: User01 },
        { label: 'Team', href: '/training/team', icon: Users01 },
        { label: 'Shared with me', href: '/training/shared-with-me', icon: UsersPlus },
        { label: 'Archive', href: '/training/archive', icon: Archive },
      ],
    },
    {
      label: 'Tasks',
      href: '/tasks',
      icon: CheckDone01,
      badge: 10,
    },
    {
      label: 'Reporting',
      href: '/reporting',
      icon: PieChart03,
    },
    {
      label: 'Players',
      href: '/players',
      icon: Users01,
    },
  ];

  const footerItems: NavItemType[] = [
    {
      label: 'Settings',
      href: '/settings',
      icon: Settings01,
    },
    {
      label: 'Support',
      href: '/support',
      icon: MessageChatCircle,
      badge: (
        <BadgeWithDot color="success" type="modern" size="sm">
          Online
        </BadgeWithDot>
      ),
    },
    {
      label: 'Open in browser',
      href: 'https://www.tnns.com/',
      icon: LayoutAlt01,
    },
  ];

  return (
    <SidebarNavigationSimple
      activeUrl={pathname}
      items={navItems}
      footerItems={footerItems}
      featureCard={
        <FeaturedCardProgressBar
          title="Used space"
          description="Your team has used 80% of your available space. Need more?"
          confirmLabel="Upgrade plan"
          progress={80}
          className="hidden md:flex"
          onDismiss={() => {}}
          onConfirm={() => {}}
        />
      }
    />
  );
} 