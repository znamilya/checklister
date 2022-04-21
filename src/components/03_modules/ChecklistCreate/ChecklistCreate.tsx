import { useNavigate } from "react-router";
import { ActionIcon, Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm, formList } from "@mantine/form";
import { Plus as IconPlus, Trash as IconTrash } from "tabler-icons-react";
import { map, prop } from "ramda";

import { minLength } from "../../../utils/validators";
import useChecklistsController from "../../../controllers/useChecklists";
import CancelButton from "../../02_specific/buttons/CancelButton";

/**
 * A module for creating new checklists.
 */
const ChecklistCreate = () => {
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            title: "",
            newItem: "",
            itemsCount: 0,
            items: formList<{ title: string }>([]),
        },

        validate: {
            title: minLength(3, "Title must have at least 3 letters"),
            itemsCount: (value: number) => (value > 0 ? null : "Checklist must have at least 1 item"),
        },
    });
    const { addChecklist } = useChecklistsController();

    // HANDLERS
    const handleFormSubmit = ({ title, items }: typeof form.values) => {
        const itemTitles = map(prop("title"), items);

        addChecklist(title, itemTitles);
        navigate("/");
    };

    // RENDER
    return (
        <div>
            <form onSubmit={form.onSubmit(handleFormSubmit)}>
                <Stack>
                    {/* TITLE */}
                    <TextInput label="Title" size="xl" variant="unstyled" autoFocus {...form.getInputProps("title")} />

                    {/* ITEMS */}
                    {form.values.items.map((item, index) => (
                        <Group align="center">
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

                {form.errors.itemsCount}

                {/* ACTIONS */}
                <Group spacing="sm" mt="24px">
                    <Button color="green" uppercase type="submit">
                        Create
                    </Button>
                    <CancelButton />
                </Group>
            </form>
        </div>
    );
};

export default ChecklistCreate;
