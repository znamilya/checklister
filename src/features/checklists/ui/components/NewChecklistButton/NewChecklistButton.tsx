import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { Plus as IconPlus } from "tabler-icons-react";

import routes from "@/routes";

/**
 * A button which links to the add checklist page.
 */
const NewChecklistButton = () => {
    return (
        <Button
            as={Link}
            to={routes.children.addChecklist({}).$}
            colorScheme="blue"
            variant="outline"
            leftIcon={<IconPlus size={20} />}
        >
            New
        </Button>
    );
};

export default NewChecklistButton;
