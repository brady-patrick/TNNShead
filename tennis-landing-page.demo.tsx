import type { StoryObj } from "@storybook/react";
import TennisLandingPage from "./tennis-landing-page";

const meta = {
  title: "Landing Pages/Tennis App",
  component: TennisLandingPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies typeof TennisLandingPage;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Demo = () => {
  return <TennisLandingPage />;
};