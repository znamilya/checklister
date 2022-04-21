import { Button } from "@mantine/core";
import { useNavigate } from "react-router";

type CancelButtonProps = {
    backUrl?: string;
};

const CancelButton = ({ backUrl = "/" }: CancelButtonProps) => {
    const navigate = useNavigate();

    return (
        <Button variant="subtle" onClick={() => navigate(backUrl)}>
            Cancel
        </Button>
    );
};

export default CancelButton;
