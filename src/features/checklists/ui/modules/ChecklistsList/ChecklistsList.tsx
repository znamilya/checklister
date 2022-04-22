import { Group, Title } from "@mantine/core";

import useChecklistsController from "../../../controllers/useChecklists";
import ChecklistsList from "../../components/ChecklistsList";
import NewChecklistButton from "../../components/NewChecklistButton";

/**
 * Display a list of available checklists.
 */
const ChecklistsListModule = () => {
    const { getChecklists } = useChecklistsController();
    const [checklists, checklistsError] = getChecklists();

    if (checklistsError) {
        return <div>Can't get your checklists.</div>;
    }

    return (
        <>
            <Group mb="24px" align="center" position="apart">
                <Title order={1}>Checklists</Title>
                <NewChecklistButton />
            </Group>
            <section>{<ChecklistsList checklists={checklists} />}</section>
        </>
    );
};

export default ChecklistsListModule;
