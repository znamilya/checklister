import { atom } from "recoil";

import { ChecklistId } from "@/features/checklists";

const activeChecklisIdAtom = atom<ChecklistId | null>({
    key: "activeChecklist",
    default: null,
});

export default activeChecklisIdAtom;
