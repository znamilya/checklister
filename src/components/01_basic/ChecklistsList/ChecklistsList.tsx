import { Stack, Paper } from "@mantine/core";
import { NavLink } from "typesafe-routes/build/react-router";

import { Checklist } from "../../../entities/Checklist";
import routes from "../../../routes";

type ChecklistsListProps = {
    checklists: Checklist[];
};

/**
 * Display a list of given checklists.
 */
const ChecklistsList = ({ checklists }: ChecklistsListProps) => {
    return (
        <Stack>
            {checklists.length > 0 ? (
                checklists.map((checklist) => (
                    <Paper
                        component={NavLink}
                        to={routes.children.checklistDetails({ checklistId: checklist.id })}
                        p="md"
                        withBorder
                        key={checklist.id}
                    >
                        {checklist.title}
                    </Paper>
                ))
            ) : (
                <p>You haven't created any checklist yet.</p>
            )}
        </Stack>
    );
};

export default ChecklistsList;
