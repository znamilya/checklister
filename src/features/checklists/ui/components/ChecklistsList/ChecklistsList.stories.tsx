import ChecklistsList from "./ChecklistsList";

export default {
    title: "features/checklists/ChecklistsList",
    component: ChecklistsList,
};

export const Empty = () => {
    return <ChecklistsList checklists={[]} />;
};

export const HasSomeItems = () => {
    return (
        <ChecklistsList
            checklists={[
                { id: "1", title: "Checklist 1", items: [] },
                { id: "2", title: "Checklist 2", items: [] },
                { id: "3", title: "Checklist 3", items: [] },
            ]}
        />
    );
};
