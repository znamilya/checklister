/* eslint-disable testing-library/await-async-query */
import { Checklist } from "../types";

import { findById } from "./utils";

describe("findById", () => {
    it("when there is no checklist with the provided id", () => {
        const checklists: Checklist[] = [
            { id: "1", title: "Checklist 1", items: [] },
            { id: "2", title: "Checklist 2", items: [] },
        ];

        expect(findById("3", checklists)).toBeUndefined();
    });

    it("when there is a checklist with the provided id", () => {
        const CHECKLIST = { id: "1", title: "Checklist 1", items: [] };
        const checklists: Checklist[] = [CHECKLIST, { id: "2", title: "Checklist 2", items: [] }];

        expect(findById("1", checklists)).toBe(CHECKLIST);
    });
});
