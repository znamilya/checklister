import { Stack, Box } from "@chakra-ui/react";
import { Link } from "typesafe-routes/build/react-router";

import { Checklist } from "@/features/checklists";
import routes from "@/routes";

export type ChecklistsListProps = {
    checklists: Checklist[];
};

export const EMPTY_MESSAGE = "You haven't created any checklists yet.";

/**
 * Display a list of given checklists.
 */
const ChecklistsList = ({ checklists }: ChecklistsListProps) => {
    return (
        <Stack spacing={4}>
            {checklists.length > 0 ? (
                checklists.map((checklist) => (
                    <Box
                        as={Link}
                        to={routes.children.checklistDetails({ checklistId: checklist.id })}
                        key={checklist.id}
                        p={4}
                        border="1px"
                        borderColor="gray.200"
                        borderRadius="md"
                        background={"white"}
                    >
                        {checklist.title}
                    </Box>
                ))
            ) : (
                <p>{EMPTY_MESSAGE}</p>
            )}
        </Stack>
    );
};

export default ChecklistsList;
