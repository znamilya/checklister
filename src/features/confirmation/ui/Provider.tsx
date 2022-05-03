import { useRef, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

import { ConfirmationParams } from "../types";
import ConfirmationPopup from "./components/ConfirmationPopup";
import { ConfirmationContext } from "./context";

type ConfirmationProviderProps = {
    children: React.ReactNode;
};

const ConfirmationProvider = ({ children }: ConfirmationProviderProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [params, setParams] = useState<ConfirmationParams | null>(null);

    const open = (params: ConfirmationParams) => {
        setParams(params);
        onOpen();
    };

    const handleConfirm = () => {
        params?.onConfirm();
        onClose();
    };

    const handleCancel = () => {
        params?.onCancel?.();
        onClose();
    };

    const valueRef = useRef({
        open,
    });

    return (
        <ConfirmationContext.Provider value={valueRef.current}>
            {children}
            {isOpen && params && (
                <ConfirmationPopup
                    title={params.title}
                    message={params.message}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </ConfirmationContext.Provider>
    );
};

export default ConfirmationProvider;
