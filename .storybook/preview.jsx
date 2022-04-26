import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import * as jest from "jest-mock";

window.jest = jest;

// import "!style-loader!css-loader!../src/index.css";
import theme from "../src/styles/chakraTheme";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

export const decorators = [
    (Story) => (
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <Story />
            </ChakraProvider>
        </BrowserRouter>
    ),
];
