import { useContext } from "react";

import { ConfirmationParams } from "./types";
import { ConfirmationContext } from "./ui/context";

export const useConfirmation = (params: ConfirmationParams) => {
    const { open } = useContext(ConfirmationContext);

    return () => open(params);
};
