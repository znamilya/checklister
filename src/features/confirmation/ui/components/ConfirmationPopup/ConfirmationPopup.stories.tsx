import { action } from "@storybook/addon-actions";
import { Button, useDisclosure } from "@chakra-ui/react";

import ConfirmationPopup, { ConfirmationPopupProps } from "./ConfirmationPopup";

export default {
    title: "features/confirmation/ConfirmationPopup",
    component: ConfirmationPopup,
    argTypes: {
        onConfirm: {
            action: "confirmed",
        },
    },
};

export const Default = (props: ConfirmationPopupProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen}>Open</Button>
            {isOpen && (
                <ConfirmationPopup
                    {...props}
                    onConfirm={() => {
                        action("onConfirm")();
                        onClose();
                    }}
                    onCancel={() => {
                        action("onCancel")();
                        onClose();
                    }}
                />
            )}
        </>
    );
};

Default.args = {
    title: "Are you sure?",
    message: "This action cannot be undone.",
};
