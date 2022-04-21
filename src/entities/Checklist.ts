import { find, propEq, curry } from "ramda";

export type ChecklistId = string;

export type ChecklistItem = {
    id: string;
    title: string;
};

export type Checklist = {
    id: ChecklistId;
    title: string;
    items: ChecklistItem[];
};

export const findById = curry((checklistId: ChecklistId, checklists: Checklist[]) =>
    find<Checklist>(propEq("id", checklistId))(checklists),
);
