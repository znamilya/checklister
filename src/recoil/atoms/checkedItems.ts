import { atom } from "recoil";

const checkedItemsAtom = atom<number[]>({
    key: "checkedItems",
    default: [],
});

export default checkedItemsAtom;
