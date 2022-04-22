import makeLocalStorage from "@/libs/localStorage";
import { atom } from "recoil";

import { Checklist } from "../../types";

const LOCAL_STORAGE_KEY = "checklists";
const storage = makeLocalStorage<Checklist[]>(LOCAL_STORAGE_KEY);

const allChecklistsAtom = atom<Checklist[]>({
    key: "checklists",
    default: [
        {
            id: "1",
            title: "Send a PR to review",
            items: [
                { id: "1.1", title: "Create a PR" },
                { id: "1.2", title: "Check that there is no console.logs" },
                { id: "1.3", title: "Check that all tests are passed" },
            ],
        },
        {
            id: "2",
            title: "Travel inboard",
            items: [
                { id: "2.1", title: "Take card" },
                { id: "2.2", title: "Take Id card" },
                { id: "2.3", title: "Take the phone changer" },
            ],
        },
    ],
    effects: [
        ({ onSet, trigger, setSelf }) => {
            if (trigger === "get") {
                const [checklists, checklistsReadError] = storage.read();

                if (checklistsReadError) {
                    setSelf([]);
                } else {
                    setSelf(checklists || []);
                }
            }

            onSet((newValue) => {
                storage.write(newValue);
            });
        },
    ],
});

export default allChecklistsAtom;
