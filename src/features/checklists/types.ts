export type ChecklistId = string;

export type ChecklistItem = {
    id: string;
    title: string;
};

export type Checklist = {
    id: ChecklistId;
    title: string;
    items: ChecklistItem[];
};

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
