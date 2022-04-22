import { useNavigate } from "react-router";
import { map, prop } from "ramda";

import useChecklistsController from "../../../controllers/useChecklists";
import ChecklistCreateForm, { Values } from "../../forms/ChecklistCreateForm";

/**
 * A module for creating new checklists.
 */
const ChecklistCreate = () => {
    const navigate = useNavigate();
    const { addChecklist } = useChecklistsController();

    // HANDLERS
    const handleFormSubmit = ({ title, items }: Values) => {
        const itemTitles = map(prop("title"), items);

        const [, checklistError] = addChecklist(title, itemTitles);

        if (checklistError) return;

        navigate("/");
    };

    // RENDER
    return <ChecklistCreateForm submitButtonText="Create" onSubmit={handleFormSubmit} />;
};

export default ChecklistCreate;
