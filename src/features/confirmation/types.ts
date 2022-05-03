export type ConfirmationParams = {
    title?: string;
    message: string;
    onConfirm: (...args: any[]) => void;
    onCancel?: () => void;
};
