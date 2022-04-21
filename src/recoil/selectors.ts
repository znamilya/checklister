import { selector } from "recoil";

import { ActiveChecklist } from "../entities/ActiveChecklist";
import { findById } from "../entities/Checklist";

import allChecklistsAtom from "./atoms/allChecklists";

import activeChecklisIdAtom from "./atoms/activeChecklisId";
import checkedItemsAtom from "./atoms/checkedItems";
import { calcPercentage } from "../utils/percent";

export const getActiveChecklistSelector = selector({
    key: "getActiveChecklistSelector",
    get: ({ get }) => {
        const activeChecklistId = get(activeChecklisIdAtom);
        const allChecklists = get(allChecklistsAtom);
        const checkedItems = get(checkedItemsAtom);

        if (!activeChecklistId) return null;

        // const targetChecklist = allChecklists.find((checklist) => checklist.id === activeChecklistId);
        const targetChecklist = findById(activeChecklistId, allChecklists);

        if (!targetChecklist) return null;

        const progress = calcPercentage(checkedItems.length, targetChecklist.items.length);

        const activeChecklist: ActiveChecklist = {
            id: targetChecklist.id,
            title: targetChecklist.title,
            progress,
            isCompleted: progress === 100,
            items: targetChecklist.items.map((item, index) => ({
                ...item,
                isChecked: checkedItems.includes(index),
            })),
        };

        return activeChecklist || null;
    },
});
