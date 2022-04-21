import { useNavigate } from "react-router";
import { Button } from "@mantine/core";
import { map, prop } from "ramda";

import { ChecklistId } from "../../../entities/Checklist";
import useChecklistsController from "../../../controllers/useChecklists";
import routes from "../../../routes";
import ChecklistNotFound from "../../01_basic/ChecklistNotFound";
import ChecklistCreateForm, { Values } from "../../03_forms/ChecklistCreateForm";

type ChecklistEditModuleProps = {
    checklistId: ChecklistId;
};

/**
 * A module for adding and editing a checklist.
 */
const ChecklistEditModule = ({ checklistId }: ChecklistEditModuleProps) => {
    const { getChecklist, updateChecklist, removeChecklist } = useChecklistsController();
    const [checklist, checklistError] = getChecklist(checklistId);
    const navigate = useNavigate();

    // HANDLERS
    const handleFormSubmit = ({ title, items }: Values) => {
        const itemTitles = map(prop("title"), items);

        updateChecklist(checklistId, title, itemTitles);
        navigate(routes.children.checklistDetails({ checklistId }).$);
    };

    const handleDelete = () => {
        removeChecklist(checklistId);
        navigate("/");
    };

    // RENDER
    if (checklistError) {
        return <ChecklistNotFound />;
    }

    return (
        <div>
            <ChecklistCreateForm
                initialValues={{
                    title: checklist.title,
                    items: checklist.items.map((item) => ({ title: item.title })),
                }}
                submitButtonText="Save"
                cancelBackUrl={routes.children.checklistDetails({ checklistId }).$}
                onSubmit={handleFormSubmit}
            />

            <Button color="red" uppercase type="button" onClick={handleDelete}>
                Delete
            </Button>
        </div>
    );
};

export default ChecklistEditModule;
