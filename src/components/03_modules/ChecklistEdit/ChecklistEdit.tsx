import { useNavigate } from "react-router";
import { ActionIcon, Button, Group, Stack, TextInput, Title } from "@mantine/core";
import { useForm, formList } from "@mantine/form";
import { Plus as IconPlus, Trash as IconTrash } from "tabler-icons-react";
import { map, prop } from "ramda";

import { minLength } from "../../../utils/validators";
import { ChecklistId } from "../../../entities/Checklist";
import useChecklistsController from "../../../controllers/useChecklists";
import CancelButton from "../../02_specific/buttons/CancelButton";
import routes from "../../../routes";

type ChecklistEditModuleProps = {
    checklistId: ChecklistId;
};

/**
 * A module for adding and editing a checklist.
 */
const ChecklistEditModule = ({ checklistId }: ChecklistEditModuleProps) => {
    const { getChecklist, updateChecklist, removeChecklist } = useChecklistsController();
    const [checklist, _] = getChecklist(checklistId);
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            title: checklist?.title || "",
            newItem: "",
            items: formList<{ title: string }>(checklist?.items.map((item) => ({ title: item.title })) || []),
        },

        validate: {
            title: minLength(3, "Title must have at least 3 letters"),
        },
    });

    // HANDLERS
    const handleFormSubmit = ({ title, items }: typeof form.values) => {
        const itemTitles = map(prop("title"), items);

        updateChecklist(checklistId, title, itemTitles);
        navigate(routes.children.checklistDetails({ checklistId }).$);
    };

    const handleDelete = () => {
        removeChecklist(checklistId);
        navigate("/");
    };

    // RENDER
    return (
        <div>
            {checklist ? (
                <form onSubmit={form.onSubmit(handleFormSubmit)}>
                    <Stack>
                        {/* TITLE */}
                        <TextInput
                            placeholder="Title"
                            size="xl"
                            variant="unstyled"
                            autoFocus
                            {...form.getInputProps("title")}
                        />

                        {/* ITEMS */}
                        {form.values.items.map((item, index) => (
                            <Group align="center" key={index}>
                                <TextInput
                                    sx={{ flex: 1 }}
                                    placeholder="item title"
                                    {...form.getListInputProps("items", index, "title")}
                                />
                                <ActionIcon
                                    color="red"
                                    onClick={() => {
                                        form.removeListItem("items", index);
                                    }}
                                >
                                    <IconTrash size="20" />
                                </ActionIcon>
                            </Group>
                        ))}

                        {/* NEW ITEM */}
                        <Group align="center">
                            <TextInput sx={{ flex: 1 }} placeholder="item title" {...form.getInputProps("newItem")} />
                            <ActionIcon
                                variant="light"
                                color="blue"
                                onClick={() => {
                                    form.addListItem("items", { title: form.values.newItem });
                                    form.setFieldValue("newItem", "");
                                }}
                            >
                                <IconPlus />
                            </ActionIcon>
                        </Group>
                    </Stack>

                    {/* ACTIONS */}
                    <Group spacing="sm" mt="24px">
                        <Button color="green" uppercase type="submit">
                            Save
                        </Button>
                        <Button color="red" uppercase type="button" onClick={handleDelete}>
                            Delete
                        </Button>
                        <CancelButton backUrl={routes.children.checklistDetails({ checklistId }).$} />
                    </Group>
                </form>
            ) : (
                "Unkown checklist"
            )}
        </div>
    );
};

export default ChecklistEditModule;
