import { selector } from "recoil";

import { calcPercentage } from "@/utils/percent";

import { Result } from "@/types";

import { ActiveChecklist } from "../types";
import { findById } from "../utils";

import allChecklistsAtom from "./atoms/allChecklists";
import activeChecklisIdAtom from "./atoms/activeChecklisId";
import checkedItemsAtom from "./atoms/checkedItems";

export const getActiveChecklistSelector = selector<Result<ActiveChecklist>>({
    key: "getActiveChecklistSelector",
    get: ({ get }) => {
        const activeChecklistId = get(activeChecklisIdAtom);
        const allChecklists = get(allChecklistsAtom);
        const checkedItems = get(checkedItemsAtom);

        if (!activeChecklistId) return [null, true];

        const targetChecklist = findById(activeChecklistId, allChecklists);

        if (!targetChecklist) return [null, true];

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

        return [activeChecklist, false];
    },
});
