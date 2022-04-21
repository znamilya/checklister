import { useEffect } from "react";
import { ActionIcon, Button, Checkbox, Group, Stack, Title } from "@mantine/core";
import { NavLink } from "typesafe-routes";
import { Settings as IconSettings } from "tabler-icons-react";

import { ChecklistId } from "../../../entities/Checklist";
import useActiveChecklistController from "../../../controllers/useActiveChecklist/useActiveChecklist";
import routes from "../../../routes";
import ChecklistNotFound from "../../01_basic/ChecklistNotFound";
import CancelButton from "../../02_specific/buttons/CancelButton";

/**
 * A module for working with a checklist.
 */
type ChecklistDetailsModuleProps = {
    checklistId: ChecklistId;
};

const ChecklistDetailsModule = ({ checklistId }: ChecklistDetailsModuleProps) => {
    const { setActiveChecklist, getActiveChecklist, checkItem, reset } = useActiveChecklistController();
    const [activeChecklist, _activeChecklistErr] = getActiveChecklist();

    useEffect(() => {
        setActiveChecklist(checklistId);

        return () => {
            reset();
        };
    }, []);

    if (!activeChecklist) {
        return <ChecklistNotFound />;
    }

    return (
        <div>
            <Group mb="24px" align="center" position="apart">
                <Title order={1}>{activeChecklist.title}</Title>
                <ActionIcon
                    component={NavLink}
                    to={routes.children.editChecklist({ checklistId })}
                    variant="light"
                    color="blue"
                    size="lg"
                >
                    <IconSettings />
                </ActionIcon>
            </Group>

            <Stack spacing="sm">
                {activeChecklist.items.map((item, index) => (
                    <Checkbox
                        py="xs"
                        size="md"
                        label={item.title}
                        checked={item.isChecked}
                        onChange={(event) => checkItem(index, event.currentTarget.checked)}
                        key={item.id}
                    />
                ))}
            </Stack>

            <Group spacing="sm" mt="24px">
                {activeChecklist.isCompleted ? (
                    <Button component={NavLink} to={{ $: "/" }} color="green" uppercase>
                        Complete
                    </Button>
                ) : (
                    <Button disabled uppercase>
                        Complete
                    </Button>
                )}
                <CancelButton />
            </Group>
        </div>
    );
};

export default ChecklistDetailsModule;
