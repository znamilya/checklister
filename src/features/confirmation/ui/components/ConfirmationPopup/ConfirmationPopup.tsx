import { useRef } from "react";
import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
    ButtonGroup,
} from "@chakra-ui/react";

export const testIds = {
    title: "confirmation-popup__title",
    message: "confirmation-popup__message",
};

export type ConfirmationPopupProps = {
    title?: string;
    message: string;
    confirmButtonText?: string;
    onConfirm: () => void;
    onCancel: () => void;
};

const ConfirmationPopup = ({
    title,
    message,
    confirmButtonText = "Confirm",
    onConfirm,
    onCancel,
}: ConfirmationPopupProps) => {
    const cancelRef = useRef<HTMLButtonElement>(null);

    return (
        <AlertDialog isOpen leastDestructiveRef={cancelRef} onClose={onCancel}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    {title && (
                        <AlertDialogHeader fontSize="lg" fontWeight="bold" data-testid={testIds.title}>
                            {title}
                        </AlertDialogHeader>
                    )}

                    <AlertDialogBody data-testid={testIds.message}>{message}</AlertDialogBody>

                    <AlertDialogFooter>
                        <ButtonGroup>
                            <Button ref={cancelRef} onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onConfirm}>
                                {confirmButtonText}
                            </Button>
                        </ButtonGroup>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default ConfirmationPopup;
