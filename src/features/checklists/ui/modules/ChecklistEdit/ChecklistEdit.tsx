import { useMemo } from "react";
import { useNavigate } from "react-router";
import { map, prop } from "ramda";

import routes from "@/routes";

import { ChecklistId } from "../../../types";
import useChecklistsController from "../../../controllers/useChecklists";
import ChecklistNotFound from "../../components/ChecklistNotFound";
import ChecklistCreateForm, { Values } from "../../forms/ChecklistCreateForm";

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
    const initialValues = useMemo(
        () =>
            checklist
                ? {
                      title: checklist.title,
                      items: checklist.items.map((item) => ({ title: item.title })),
                  }
                : {},
        [checklist],
    );

    // HANDLERS
    const handleFormSubmit = ({ title, items }: Values) => {
        const itemTitles = map(prop("title"), items);

        const [, checklistError] = updateChecklist(checklistId, title, itemTitles);

        if (checklistError) return;

        navigate(routes.children.checklistDetails({ checklistId }).$);
    };

    const handleDelete = () => {
        const [, checklistError] = removeChecklist(checklistId);

        if (checklistError) return;

        navigate("/");
    };

    // RENDER
    if (checklistError) {
        return <ChecklistNotFound />;
    }

    return (
        <ChecklistCreateForm
            initialValues={initialValues}
            submitButtonText="Save"
            cancelBackUrl={routes.children.checklistDetails({ checklistId }).$}
            onSubmit={handleFormSubmit}
            onDelete={handleDelete}
        />
    );
};

export default ChecklistEditModule;
