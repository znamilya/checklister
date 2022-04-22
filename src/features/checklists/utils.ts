import { find, propEq, curry } from "ramda";

import { Checklist, ChecklistId } from "./types";

export const findById = curry((checklistId: ChecklistId, checklists: Checklist[]) =>
    find<Checklist>(propEq("id", checklistId))(checklists),
);
