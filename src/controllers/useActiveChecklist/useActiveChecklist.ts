import { useCallback } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { ActiveChecklist } from "../../entities/ActiveChecklist";
import { Checklist, ChecklistId } from "../../entities/Checklist";

import activeChecklisIdAtom from "../../recoil/atoms/activeChecklisId";
import checkedItemsAtom from "../../recoil/atoms/checkedItems";
import { getActiveChecklistSelector } from "../../recoil/selectors";

type ActiveChecklistController = {
    getActiveChecklist(): [ActiveChecklist | null, boolean];
    setActiveChecklist(checklistId: ChecklistId): void;
    checkItem(itemIndex: number, checked: boolean): void;
    reset(): void;
};

const useActiveChecklistController = (): ActiveChecklistController => {
    const setActiveCheclistId = useSetRecoilState(activeChecklisIdAtom);
    const setCheckedItems = useSetRecoilState(checkedItemsAtom);
    const activeChecklist = useRecoilValue(getActiveChecklistSelector);

    const getActiveChecklist = useCallback<ActiveChecklistController["getActiveChecklist"]>(() => {
        return activeChecklist ? [activeChecklist, false] : [null, true];
    }, [activeChecklist]);

    const setActiveChecklist = useCallback<ActiveChecklistController["setActiveChecklist"]>(
        (checklistId) => {
            setActiveCheclistId((_) => checklistId);
        },
        [setActiveCheclistId],
    );

    const checkItem = useCallback<ActiveChecklistController["checkItem"]>(
        (itemIndex, checked) => {
            if (checked) {
                setCheckedItems((oldCheckedItems) => [...oldCheckedItems, itemIndex]);
            } else {
                setCheckedItems((oldCheckedItems) => oldCheckedItems.filter((item) => item !== itemIndex));
            }
        },
        [setCheckedItems],
    );

    const reset = useCallback<ActiveChecklistController["reset"]>(() => {
        setCheckedItems(() => []);
        setActiveCheclistId(() => null);
    }, [setCheckedItems, setActiveCheclistId]);

    return {
        getActiveChecklist,
        setActiveChecklist,
        checkItem,
        reset,
    };
};

export default useActiveChecklistController;
