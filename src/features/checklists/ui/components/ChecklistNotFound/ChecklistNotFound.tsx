import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

export const testIds = {
    description: "ChecklistNotFound-description",
};

const ChecklistNotFound = () => {
    return (
        <Alert status="error">
            <AlertIcon />
            <AlertDescription data-testid={testIds.description}>Checklist not found</AlertDescription>
        </Alert>
    );
};

export default ChecklistNotFound;
