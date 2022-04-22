import { Stack, Paper } from "@mantine/core";
import { NavLink } from "typesafe-routes/build/react-router";

import { Checklist } from "@/features/checklists";
import routes from "@/routes";

export type ChecklistsListProps = {
    checklists: Checklist[];
};

export const EMPTY_MESSAGE = "You haven't created any checklist yet.";

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
                <p>{EMPTY_MESSAGE}</p>
            )}
        </Stack>
    );
};

export default ChecklistsList;
