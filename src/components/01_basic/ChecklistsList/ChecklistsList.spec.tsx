import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { byText, byRole } from "testing-library-selector";

import ChecklistsList, { ChecklistsListProps, EMPTY_MESSAGE } from "./ChecklistsList";

const renderComponent = (props: ChecklistsListProps) => {
    const defaultProps = {
        checklists: [],
    };

    const utils = render(
        <BrowserRouter>
            <ChecklistsList {...defaultProps} {...props} />
        </BrowserRouter>,
    );

    return {
        ...utils,
        emptyMessage: byText(EMPTY_MESSAGE),
    };
};

describe("Render", () => {
    it("when there is no items", () => {
        const { emptyMessage } = renderComponent({
            checklists: [],
        });

        expect(emptyMessage.query()).toBeInTheDocument();
    });

    it("when there are some items", () => {
        const { emptyMessage } = renderComponent({
            checklists: [
                {
                    id: "1",
                    title: "Checklist 1",
                    items: [],
                },
                {
                    id: "2",
                    title: "Checklist 2",
                    items: [],
                },
            ],
        });

        const checklistsLinks = byRole("link").getAll();

        // Check that there are 2 checklists
        expect(checklistsLinks).toHaveLength(2);

        // Check that checklists are displayed in the correct order
        expect(checklistsLinks[0]).toHaveTextContent("Checklist 1");
        expect(checklistsLinks[0]).toHaveAttribute("href", "/1");
        expect(checklistsLinks[1]).toHaveTextContent("Checklist 2");
        expect(checklistsLinks[1]).toHaveAttribute("href", "/2");

        expect(emptyMessage.query()).not.toBeInTheDocument();
    });
});
