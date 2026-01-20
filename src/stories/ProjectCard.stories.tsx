import type { Meta, StoryObj } from "@storybook/react";
import ProjectCard from "../components/ProjectCard";

const meta: Meta<typeof ProjectCard> = {
  title: "Components/ProjectCard",
  component: ProjectCard,
};
export default meta;

type Story = StoryObj<typeof ProjectCard>;

export const Example: Story = {
  args: {
    project: {
      id: "budget-app",
      title: "Budgeting App",
      description: "A budgeting app built with React + TypeScript + Redux Toolkit.",
      tags: ["React", "Redux", "TypeScript"],
      liveUrl: "https://budget-ct1ax11rb-daniels-projects-2b93c5dc.vercel.app/",
      repoUrl: "https://github.com/DanielCassar07/BudgetApp",
      year: 2025,
    },
  },
};
