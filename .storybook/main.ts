import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  // Only load *your* stories (keeps the default Storybook template stories out of the sidebar)
  stories: [
    "../src/stories/**/*.mdx",
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/react-vite",
};

export default config;
