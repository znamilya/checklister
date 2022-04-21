import { ActionIcon, Button, Group, Stack, TextInput } from "@mantine/core";
import { Plus as IconPlus, Trash as IconTrash } from "tabler-icons-react";
import { useForm, formList } from "@mantine/form";

import { minLength } from "../../../utils/validators";
import CancelButton from "../../02_specific/buttons/CancelButton";

type ItemValue = { title: string };

export type Values = {
    title: string;
    items: ItemValue[];
};

export type ChecklistCreateFormProps = {
    initialValues: Partial<Values>;
    submitButtonText: string;
    cancelBackUrl?: string;
    onSubmit: (values: Values) => void;
};

const ChecklistCreateForm = ({
    initialValues,
    submitButtonText,
    cancelBackUrl,
    onSubmit,
}: ChecklistCreateFormProps) => {
    const form = useForm({
        initialValues: {
            title: initialValues?.title || "",
            newItem: "",
            items: formList<ItemValue>(initialValues?.items || []),
        },

        validate: {
            title: minLength(3, "Title must have at least 3 letters"),
        },
    });

    // HANDLERS
    const handleFormSubmit = ({ title, items }: typeof form.values) => {
        onSubmit({ title, items });
    };

    // RENDER
    return (
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
                    {submitButtonText}
                </Button>
                <CancelButton backUrl={cancelBackUrl} />
            </Group>
        </form>
    );
};

export default ChecklistCreateForm;
