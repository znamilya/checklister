import { Button } from "@mantine/core";
import { useNavigate } from "react-router";

export type CancelButtonProps = {
    /**
     * The URL to navigate to when the button is clicked.
     */
    backUrl?: string;
};

/**
 * A button for canceling an action.
 */
const CancelButton = ({ backUrl = "/" }: CancelButtonProps) => {
    const navigate = useNavigate();

    return (
        <Button variant="subtle" onClick={() => navigate(backUrl)}>
            Cancel
        </Button>
    );
};

export default CancelButton;
