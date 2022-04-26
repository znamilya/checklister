import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
        global: {
            html: {
                height: "100%",
            },
            body: {
                height: "100%",
                backgroundColor: "gray.50",
            },
            "#root": {
                height: "100%",
            },
        },
    },
});

export default theme;
