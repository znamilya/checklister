import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { Checklist, ChecklistId } from "../../entities/Checklist";
import allChecklistsAtom from "../../recoil/atoms/allChecklists";

type ChecklistsController = {
    getChecklists(): [Checklist[], boolean];
    getChecklist(checklistId?: ChecklistId): [Checklist | null, boolean];
    addChecklist(title: string, items: string[]): [Checklist | null, boolean];
    updateChecklist(checklistId: ChecklistId, title: string, items: string[]): [Checklist | null, boolean];
    removeChecklist(checklistId: ChecklistId): [Checklist | null, boolean];
};

const useChecklistsController = (): ChecklistsController => {
    const [checklists, setChecklists] = useRecoilState(allChecklistsAtom);

    const getChecklists = useCallback<ChecklistsController["getChecklists"]>(() => {
        return [checklists, false];
    }, [checklists]);

    const getChecklist = useCallback<ChecklistsController["getChecklist"]>((checklistId) => {
        const checklist = checklists.find((checklist) => checklist.id === checklistId);

        return checklist ? [checklist, false] : [null, true];
    }, []);

    const addChecklist = useCallback<ChecklistsController["addChecklist"]>((title, items) => {
        const newChecklist = {
            id: uuidv4(),
            title,
            items: items.map((item) => ({
                id: uuidv4(),
                title: item,
            })),
        };

        setChecklists((oldChecklists) => [...oldChecklists, newChecklist]);

        return [newChecklist, false];
    }, []);

    const updateChecklist = useCallback<ChecklistsController["updateChecklist"]>((checklistId, title, items) => {
        const checklistIndex = checklists.findIndex((checklist) => checklist.id === checklistId);

        if (checklistIndex < 0) {
            return [null, true];
        }

        const checklist = checklists[checklistIndex];

        const newChecklist = {
            ...checklist,
            title,
            items: items.map((item) => ({
                id: uuidv4(),
                title: item,
            })),
        };

        setChecklists((oldChecklists) => [
            ...oldChecklists.slice(0, checklistIndex),
            newChecklist,
            ...oldChecklists.slice(checklistIndex + 1),
        ]);

        return [newChecklist, false];
    }, []);

    const removeChecklist = useCallback<ChecklistsController["removeChecklist"]>((checklistId) => {
        const checklistIndex = checklists.findIndex((checklist) => checklist.id === checklistId);

        if (checklistIndex < 0) {
            return [null, true];
        }

        const checklist = checklists[checklistIndex];

        setChecklists((oldChecklists) => [
            ...oldChecklists.slice(0, checklistIndex),
            ...oldChecklists.slice(checklistIndex + 1),
        ]);

        return [checklist, false];
    }, []);

    return {
        getChecklists,
        getChecklist,
        addChecklist,
        updateChecklist,
        removeChecklist,
    };
};

export default useChecklistsController;
