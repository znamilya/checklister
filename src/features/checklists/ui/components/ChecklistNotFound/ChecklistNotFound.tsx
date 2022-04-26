import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

const ChecklistNotFound = () => {
    return (
        <Alert status="error">
            <AlertIcon />
            <AlertDescription>Checklist not found</AlertDescription>
        </Alert>
    );
};

export default ChecklistNotFound;
