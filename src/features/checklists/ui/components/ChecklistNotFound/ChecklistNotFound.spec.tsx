import { render } from "@testing-library/react";
import { byTestId } from "testing-library-selector";

import ChecklistNotFound, { testIds } from "./ChecklistNotFound";

const renderComponent = () => {
    const utils = render(<ChecklistNotFound />);

    return {
        ...utils,
        description: byTestId(testIds.description),
    };
};

it("Render", () => {
    const { description } = renderComponent();

    expect(description.get()).toHaveTextContent("Checklist not found");
});
