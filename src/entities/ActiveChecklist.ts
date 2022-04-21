export type ActiveChecklistItem = {
    id: string;
    title: string;
    isChecked: boolean;
};

export type ActiveChecklist = {
    id: string;
    title: string;
    progress: number;
    isCompleted: boolean;
    items: ActiveChecklistItem[];
};
