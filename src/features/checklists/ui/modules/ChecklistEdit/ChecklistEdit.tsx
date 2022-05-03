import { useMemo } from "react";
import { useNavigate } from "react-router";
import { map, prop } from "ramda";

import routes from "@/routes";
import { useConfirmation } from "@/features/confirmation";

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
    const removeChecklistWithConfirmation = useConfirmation({
        title: "Delete checklist",
        message: "Are you sure you want to delete this checklist?",
        onConfirm: () => handleDeleteConfirm(),
    });
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

    const handleDeleteConfirm = () => {
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
            onDelete={removeChecklistWithConfirmation}
        />
    );
};

export default ChecklistEditModule;
