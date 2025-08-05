"use client";

import { ArrowLeft, HomeLine, SearchLg } from "@untitledui/icons";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import Link from "next/link";
import { PlayerStats } from "../utils/playerData";

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

interface PageHeaderBannerAvatarProps {
  playerProfile: PlayerProfile;
  onProfileUpdate: (profile: PlayerProfile) => void;
  isReadOnly?: boolean;
  playerStats?: PlayerStats;
  compareButton?: React.ReactNode;
}

export const PageHeaderBannerAvatar = ({ playerProfile, onProfileUpdate, isReadOnly = false, playerStats, compareButton }: PageHeaderBannerAvatarProps) => {
    
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

    return (
        <div className="relative flex flex-col bg-primary px-1 pt-1">
            <div 
                className="h-40 w-full rounded-xl bg-linear-to-t from-[#FBC5EC] to-[#A5C0EE] lg:h-60"
                style={{
                    backgroundImage: playerProfile.headerImage ? `url(${playerProfile.headerImage})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            <div className="m-auto -mt-12 w-full max-w-(--breakpoint-xl) px-3 lg:-mt-10 lg:px-8">
                <div className="flex flex-col gap-4 border-b border-secondary pb-4 lg:flex-row lg:gap-5 lg:pb-6">
                    <div className="flex justify-between">
                        <AvatarProfilePhoto
                            verified
                            size="md"
                            alt={`${playerProfile.firstName} ${playerProfile.lastName}`}
                            className="lg:hidden"
                            src={playerProfile.avatarImage || "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"}
                        />
                        <AvatarProfilePhoto
                            verified
                            size="lg"
                            alt={`${playerProfile.firstName} ${playerProfile.lastName}`}
                            className="max-lg:hidden"
                            src={playerProfile.avatarImage || "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"}
                        />
                        <Button color="link-gray" size="md" href="#" className="translate-y-2 self-end lg:hidden" iconLeading={({ className }) => <ArrowLeft className={className} />}>
                            Back
                        </Button>
                    </div>
                    <div className="flex w-full flex-col gap-x-4 gap-y-5 lg:pt-16">
                        <Breadcrumbs type="button" maxVisibleItems={3} className="max-lg:hidden">
                            <Breadcrumbs.Item href="#" icon={<HomeLine className="w-4 h-4" />} />
                            <Breadcrumbs.Item href="#">Players</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="#">Profile</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="#">Details</Breadcrumbs.Item>
                        </Breadcrumbs>
                        <div className="flex flex-1 flex-col flex-wrap gap-4 lg:flex-row">
                            <div className="flex min-w-60 flex-1 flex-col gap-0.5 lg:gap-1">
                                <h1 className="text-xl font-semibold text-primary lg:text-display-xs">{playerProfile.firstName} {playerProfile.lastName}</h1>
                                <p className="text-md text-balance text-tertiary">{playerProfile.email}</p>
                            </div>
                            <div className="flex gap-3">
                                {compareButton && (
                                    <div className="max-lg:hidden">
                                        {compareButton}
                                    </div>
                                )}
                                {!isReadOnly && (
                                    <Link href="/settings">
                                        <Button color="secondary" size="md" className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit Profile
                                        </Button>
                                    </Link>
                                )}
                                <Button size="md">Primary</Button>
                            </div>
                            <Input 
                                shortcut 
                                className="max-w-80 min-w-50 flex-1" 
                                size="sm" 
                                aria-label="Search" 
                                placeholder="Search" 
                                icon={<SearchLg className="w-4 h-4" />} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 