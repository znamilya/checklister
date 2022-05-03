import { createContext } from "react";

import { ConfirmationParams } from "../types";

type ConfirmationContextType = {
    /**
     * Open a confirmation popup.
     */
    open(params: ConfirmationParams): void;
};

export const ConfirmationContext = createContext<ConfirmationContextType>({
    open: () => {},
});
