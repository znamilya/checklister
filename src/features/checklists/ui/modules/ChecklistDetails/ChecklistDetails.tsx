import { useEffect } from "react";
import { IconButton, Button, ButtonGroup, Checkbox, Stack } from "@chakra-ui/react";
import { NavLink } from "typesafe-routes";
import { FiSettings as IconSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

import routes from "@/routes";
import PageHeading from "@/ui/components/PageHeading";
import CancelButton from "@/ui/components/CancelButton";

import { ChecklistId } from "../../../types";
import useChecklistsController from "../../../controllers/useChecklists";
import ChecklistNotFound from "../../components/ChecklistNotFound";

/**
 * A module for working with a checklist.
 */
type ChecklistDetailsModuleProps = {
    checklistId: ChecklistId;
};

const ChecklistDetailsModule = ({ checklistId }: ChecklistDetailsModuleProps) => {
    const { setActiveChecklist, getActiveChecklist, checkItem, reset } = useChecklistsController();
    const [activeChecklist, activeChecklistErr] = getActiveChecklist();

    useEffect(() => {
        setActiveChecklist(checklistId);

        return () => {
            reset();
        };
    }, [checklistId, setActiveChecklist, reset]);

    if (activeChecklistErr) {
        return <ChecklistNotFound />;
    }

    return (
        <>
            <PageHeading
                control={
                    <IconButton
                        aria-label="Edit checklist"
                        as={Link}
                        to={routes.children.editChecklist({ checklistId }).$}
                        colorScheme="blue"
                        variant="outline"
                    >
                        <IconSettings size={20} />
                    </IconButton>
                }
            >
                {activeChecklist.title}
            </PageHeading>

            <Stack spacing={4}>
                {activeChecklist.items.map((item, index) => (
                    <Checkbox
                        py="xs"
                        size="lg"
                        checked={item.isChecked}
                        onChange={(event) => checkItem(index, event.currentTarget.checked)}
                        key={item.id}
                    >
                        {item.title}
                    </Checkbox>
                ))}
            </Stack>

            <ButtonGroup mt={8}>
                {activeChecklist.isCompleted ? (
                    <Button as={NavLink} to={{ $: "/" }} colorScheme="green">
                        Complete
                    </Button>
                ) : (
                    <Button disabled>Complete</Button>
                )}
                <CancelButton />
            </ButtonGroup>
        </>
    );
};

export default ChecklistDetailsModule;
