import { atom } from "recoil";

import { ChecklistId } from "../../entities/Checklist";

const activeChecklisIdAtom = atom<ChecklistId | null>({
    key: "activeChecklist",
    default: null,
});

export default activeChecklisIdAtom;
