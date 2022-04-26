const path = require("path");
const { mergeConfig } = require("vite");

module.exports = {
    stories: ["../src/**/*.stories.@(ts|tsx)"],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
    core: { builder: "@storybook/builder-vite" },
    framework: "@storybook/react",
    refs: {
        "@chakra-ui/react": {
            disable: true,
        },
    },
    async viteFinal(config, { configType }) {
        // return the customized config
        return mergeConfig(config, {
            // customize the Vite config here
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    "@": path.resolve(__dirname, "../src/"),
                },
            },
        });
    },
};
