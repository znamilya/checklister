import { Button } from "@mantine/core";
import { NavLink } from "typesafe-routes";
import { Plus as IconPlus } from "tabler-icons-react";

import routes from "../../../../routes";

/**
 * A button for creating a new checklist.
 */
const NewChecklistButton = () => {
    return (
        <Button
            component={NavLink}
            to={routes.children.addChecklist({})}
            variant="light"
            leftIcon={<IconPlus size={20} />}
        >
            New
        </Button>
    );
};

export default NewChecklistButton;
