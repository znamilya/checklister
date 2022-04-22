import { ActionIcon, Button, Group, Stack, TextInput } from "@mantine/core";
import { Plus as IconPlus, Trash as IconTrash } from "tabler-icons-react";
import { useForm, formList } from "@mantine/form";

import { minLength } from "@/utils/validators";
import CancelButton from "@/ui/components/CancelButton";

type ItemValue = { title: string };

export type Values = {
    title: string;
    items: ItemValue[];
};

export type ChecklistCreateFormProps = {
    initialValues?: Partial<Values>;
    submitButtonText: string;
    cancelBackUrl?: string;
    onSubmit: (values: Values) => void;
    onDelete?: () => void;
};

const ChecklistCreateForm = ({
    initialValues,
    submitButtonText,
    cancelBackUrl,
    onSubmit,
    onDelete,
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
        <div>
            <Stack>
                {/* TITLE */}
                <form id="main-form" onSubmit={form.onSubmit(handleFormSubmit)}>
                    <TextInput label="Title" size="xl" variant="unstyled" autoFocus {...form.getInputProps("title")} />
                </form>

                {/* ITEMS */}
                {form.values.items.map((_item, index) => (
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
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.addListItem("items", { title: form.values.newItem });
                        form.setFieldValue("newItem", "");
                    }}
                >
                    <Group align="center">
                        <TextInput sx={{ flex: 1 }} placeholder="item title" {...form.getInputProps("newItem")} />
                        <ActionIcon variant="light" color="blue" type="submit">
                            <IconPlus />
                        </ActionIcon>
                    </Group>
                </form>
            </Stack>
            {form.errors.itemsCount}
            {/* ACTIONS */}
            <Group mt="24px" position="apart">
                <Group spacing="sm">
                    <Button color="green" type="submit" form="main-form" uppercase>
                        {submitButtonText}
                    </Button>
                    <CancelButton backUrl={cancelBackUrl} />
                </Group>
                <Button color="red" variant="light" uppercase type="button" onClick={() => onDelete?.()}>
                    Delete
                </Button>
            </Group>
        </div>
    );
};

export default ChecklistCreateForm;
