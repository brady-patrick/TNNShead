import type { Meta, StoryObj } from "@storybook/react";
import { SportsNavigationSimpleDemo, SportsNavigationPlayersActiveDemo, SportsNavigationCoachingActiveDemo, SportsNavigationEventsActiveDemo, SportsNavigationWithTrailingContentDemo, SportsNavigationCustomDemo } from "./sports-navigation.demo";

const meta: Meta<typeof SportsNavigationSimpleDemo> = {
    title: "Application/Navigation/Sports Navigation",
    component: SportsNavigationSimpleDemo,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
    render: () => <SportsNavigationSimpleDemo />,
};

export const PlayersActive: Story = {
    render: () => <SportsNavigationPlayersActiveDemo />,
};

export const CoachingActive: Story = {
    render: () => <SportsNavigationCoachingActiveDemo />,
};

export const EventsActive: Story = {
    render: () => <SportsNavigationEventsActiveDemo />,
};

export const WithTrailingContent: Story = {
    render: () => <SportsNavigationWithTrailingContentDemo />,
};

export const Custom: Story = {
    render: () => <SportsNavigationCustomDemo />,
}; 