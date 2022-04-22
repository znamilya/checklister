import { useCallback } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { Result } from "@/types";

import { ActiveChecklist, Checklist, ChecklistId } from "../types";
import activeChecklisIdAtom from "../recoil/atoms/activeChecklisId";
import checkedItemsAtom from "../recoil/atoms/checkedItems";
import { getActiveChecklistSelector } from "../recoil/selectors";
import allChecklistsAtom from "../recoil/atoms/allChecklists";

type ChecklistsController = {
    getChecklists(): Result<Checklist[]>;
    getChecklist(checklistId?: ChecklistId): Result<Checklist>;
    addChecklist(title: string, items: string[]): Result<Checklist>;
    updateChecklist(checklistId: ChecklistId, title: string, items: string[]): Result<Checklist>;
    removeChecklist(checklistId: ChecklistId): Result<Checklist>;
    getActiveChecklist(): Result<ActiveChecklist>;
    setActiveChecklist(checklistId: ChecklistId): void;
    checkItem(itemIndex: number, checked: boolean): void;
    reset(): void;
};

const useChecklistsController = (): ChecklistsController => {
    const [checklists, setChecklists] = useRecoilState(allChecklistsAtom);
    const setActiveCheclistId = useSetRecoilState(activeChecklisIdAtom);
    const resetActiveChecklist = useResetRecoilState(activeChecklisIdAtom);
    const setCheckedItems = useSetRecoilState(checkedItemsAtom);
    const resetCheckedItems = useResetRecoilState(checkedItemsAtom);
    const activeChecklist = useRecoilValue(getActiveChecklistSelector);

    const getChecklists = useCallback<ChecklistsController["getChecklists"]>(() => {
        return [checklists, false];
    }, [checklists]);

    const getChecklist = useCallback<ChecklistsController["getChecklist"]>(
        (checklistId) => {
            const checklist = checklists.find((checklist) => checklist.id === checklistId);

            return checklist ? [checklist, false] : [null, true];
        },
        [checklists],
    );

    const addChecklist = useCallback<ChecklistsController["addChecklist"]>(
        (title, items) => {
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
        },
        [setChecklists],
    );

    const updateChecklist = useCallback<ChecklistsController["updateChecklist"]>(
        (checklistId, title, items) => {
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
        },
        [setChecklists, checklists],
    );

    const removeChecklist = useCallback<ChecklistsController["removeChecklist"]>(
        (checklistId) => {
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
        },
        [setChecklists, checklists],
    );

    const getActiveChecklist = useCallback<ChecklistsController["getActiveChecklist"]>(
        () => activeChecklist,
        [activeChecklist],
    );

    const setActiveChecklist = useCallback<ChecklistsController["setActiveChecklist"]>(
        (checklistId) => {
            setActiveCheclistId(() => checklistId);
        },
        [setActiveCheclistId],
    );

    const checkItem = useCallback<ChecklistsController["checkItem"]>(
        (itemIndex, checked) => {
            if (checked) {
                setCheckedItems((oldCheckedItems) => [...oldCheckedItems, itemIndex]);
            } else {
                setCheckedItems((oldCheckedItems) => oldCheckedItems.filter((item) => item !== itemIndex));
            }
        },
        [setCheckedItems],
    );

    const reset = useCallback<ChecklistsController["reset"]>(() => {
        resetActiveChecklist();
        resetCheckedItems();
    }, [resetActiveChecklist, resetCheckedItems]);

    return {
        getChecklists,
        getChecklist,
        addChecklist,
        updateChecklist,
        removeChecklist,
        getActiveChecklist,
        setActiveChecklist,
        checkItem,
        reset,
    };
};

export default useChecklistsController;
