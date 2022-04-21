import { Group, Title } from "@mantine/core";

import useChecklistsController from "../../../controllers/useChecklists";
import ChecklistsList from "../../01_basic/ChecklistsList";
import NewChecklistButton from "../../02_specific/buttons/NewChecklistButton";

/**
 * Display a list of available checklists.
 */
const ChecklistsListModule = () => {
    const { getChecklists } = useChecklistsController();
    const [checklists, checklistsErr] = getChecklists();

    if (checklistsErr) {
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
