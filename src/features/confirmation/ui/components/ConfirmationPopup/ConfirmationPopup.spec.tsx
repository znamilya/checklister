import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { byRole, byTestId } from "testing-library-selector";
import { ChakraProvider } from "@chakra-ui/react";
import { faker } from "@faker-js/faker";

import ConfirmationPopup, { ConfirmationPopupProps, testIds } from "./ConfirmationPopup";

const user = userEvent.setup({
    pointerEventsCheck: 0,
});

const renderComponent = (props: Partial<ConfirmationPopupProps> = {}) => {
    const defaultProps: ConfirmationPopupProps = {
        message: "message",
        confirmButtonText: "Confirm",
        onConfirm: () => {},
        onCancel: () => {},
    };

    const finalProps = { ...defaultProps, ...props };

    const utils = render(
        <ChakraProvider>
            <ConfirmationPopup {...finalProps} />
        </ChakraProvider>,
    );

    return {
        ...utils,
        title: byTestId(testIds.title),
        message: byTestId(testIds.message),
        submitButton: byRole("button", { name: finalProps.confirmButtonText }),
        cancelButton: byRole("button", { name: "Cancel" }),
    };
};

describe("Render", () => {
    it("When no extra params provided", () => {
        const MESSAGE = faker.lorem.sentence(faker.datatype.number({ min: 1, max: 10 }));

        const { title, message, cancelButton } = renderComponent({
            message: MESSAGE,
        });

        // Title is optional and should not be rendered by default
        expect(title.query()).not.toBeInTheDocument();
        expect(message.query()).toHaveTextContent(MESSAGE);
        // Check that cancel button is focused
        expect(cancelButton.get()).toHaveFocus();
    });

    it("When a title is provided", () => {
        const TITLE = faker.lorem.sentence(faker.datatype.number({ min: 1, max: 10 }));
        const MESSAGE = faker.lorem.sentence(faker.datatype.number({ min: 1, max: 10 }));

        const { title } = renderComponent({
            title: TITLE,
            message: MESSAGE,
        });

        expect(title.query()).toHaveTextContent(TITLE);
    });

    it("When confirmButtonText is provided", () => {
        const MESSAGE = faker.lorem.sentence(faker.datatype.number({ min: 1, max: 10 }));
        const CONFIRM_BUTTON_TEXT = faker.lorem.sentence(faker.datatype.number({ min: 1, max: 10 }));

        const { submitButton } = renderComponent({
            message: MESSAGE,
            confirmButtonText: CONFIRM_BUTTON_TEXT,
        });

        expect(submitButton.get()).toHaveTextContent(CONFIRM_BUTTON_TEXT);
    });
});

it("Cancel", async () => {
    const ON_CANCEL = jest.fn();
    const { cancelButton } = renderComponent({
        onCancel: ON_CANCEL,
    });

    await user.click(cancelButton.get());

    expect(ON_CANCEL).toHaveBeenCalled();
});

it("Confirm", async () => {
    const ON_CONFIRM = jest.fn();
    const { submitButton } = renderComponent({
        onConfirm: ON_CONFIRM,
    });

    await user.click(submitButton.get());

    expect(ON_CONFIRM).toHaveBeenCalled();
});
