import { Heading, Stack } from "@chakra-ui/react";

type PageHeadingProps = {
    /**
     * The title of the page.
     */
    children: React.ReactNode;
    /**
     * The control to be displayed on the right side of the page heading.
     */
    control?: React.ReactNode;
};

const PageHeading = ({ children, control }: PageHeadingProps) => {
    return (
        <Stack align="center" justify="space-between" mb={8} isInline>
            <Heading as="h1" size="lg">
                {children}
            </Heading>
            {control}
        </Stack>
    );
};

export default PageHeading;
