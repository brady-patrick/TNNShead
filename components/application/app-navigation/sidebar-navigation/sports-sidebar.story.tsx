import type { Meta, StoryObj } from "@storybook/react";
import { SportsSidebarNavigation } from "./sports-sidebar";

const meta: Meta<typeof SportsSidebarNavigation> = {
    title: "Application/Navigation/Sports Sidebar",
    component: SportsSidebarNavigation,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
    args: {
        activeUrl: "/",
    },
    render: (args) => (
        <div className="h-screen">
            <SportsSidebarNavigation {...args} />
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Sports Management Dashboard</h1>
                <p className="text-gray-600">Welcome to your sports team management system.</p>
            </div>
        </div>
    ),
};

export const PlayersActive: Story = {
    args: {
        activeUrl: "/players/roster",
    },
    render: (args) => (
        <div className="h-screen">
            <SportsSidebarNavigation {...args} />
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Players Management</h1>
                <p className="text-gray-600">Manage your team roster, statistics, and player performance.</p>
            </div>
        </div>
    ),
};

export const CoachingActive: Story = {
    args: {
        activeUrl: "/coaching/training",
    },
    render: (args) => (
        <div className="h-screen">
            <SportsSidebarNavigation {...args} />
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Coaching Dashboard</h1>
                <p className="text-gray-600">Access training plans, drills, and coaching strategies.</p>
            </div>
        </div>
    ),
};

export const EventsActive: Story = {
    args: {
        activeUrl: "/events/games",
    },
    render: (args) => (
        <div className="h-screen">
            <SportsSidebarNavigation {...args} />
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Events Management</h1>
                <p className="text-gray-600">Schedule and manage games, practices, and tournaments.</p>
            </div>
        </div>
    ),
}; 