import { Input, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { Button, IconButton, ButtonGroup, Stack } from "@chakra-ui/react";
import { FiPlus as IconPlus, FiTrash2 as IconTrash } from "react-icons/fi";
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
            itemsCount: initialValues?.items?.length || 0,
            items: formList<ItemValue>(initialValues?.items || []),
        },

        validate: {
            title: minLength(3, "Title must have at least 3 letters"),
            itemsCount: (value) => {
                return value > 0 ? null : "Checklist must contain at least one item";
            },
        },
    });

    // HANDLERS
    const handleFormSubmit = ({ title, items }: typeof form.values) => {
        onSubmit({ title, items });
    };

    // RENDER
    return (
        <div>
            <Stack spacing={4}>
                {/* TITLE */}
                <form id="main-form" onSubmit={form.onSubmit(handleFormSubmit)}>
                    <FormControl isInvalid={Boolean(form.errors.title)}>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <Input id="title" variant="flushed" autoFocus {...form.getInputProps("title")} />
                        <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                    </FormControl>
                </form>

                {/* ITEMS */}
                {form.values.items.map((_item, index) => (
                    <Stack align="center" spacing={4} isInline key={index}>
                        <FormControl isInvalid={Boolean(form.errors.title)} sx={{ flex: 1 }}>
                            <Input {...form.getListInputProps("items", index, "title")} />
                            <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                        </FormControl>
                        <IconButton
                            colorScheme="red"
                            variant="ghost"
                            aria-label="Delete item"
                            onClick={() => {
                                form.setFieldValue("itemsCount", form.values.itemsCount - 1);
                                form.removeListItem("items", index);
                            }}
                        >
                            <IconTrash size="20" />
                        </IconButton>
                    </Stack>
                ))}

                {/* NEW ITEM */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.addListItem("items", { title: form.values.newItem });
                        form.setFieldValue("itemsCount", form.values.itemsCount + 1);
                        form.setFieldValue("newItem", "");
                    }}
                >
                    <Stack spacing={4} isInline>
                        <FormControl isInvalid={Boolean(form.errors.itemsCount)} sx={{ flex: 1 }}>
                            <Input
                                {...form.getInputProps("newItem")}
                                onChange={(e) => {
                                    form.setFieldError("itemsCount", null);
                                    form.getInputProps("newItem").onChange(e);
                                }}
                            />
                            <FormErrorMessage>{form.errors.itemsCount}</FormErrorMessage>
                        </FormControl>
                        <IconButton aria-label="Add item" variant="ghost" colorScheme="blue" type="submit">
                            <IconPlus />
                        </IconButton>
                    </Stack>
                </form>
            </Stack>

            {/* ACTIONS */}
            <Stack mt={8} justify="space-between" isInline>
                <ButtonGroup>
                    {/* SUBMIT BUTTON */}
                    <Button colorScheme="green" type="submit" form="main-form">
                        {submitButtonText}
                    </Button>

                    {/* CANCEL BUTTON */}
                    <CancelButton backUrl={cancelBackUrl} />
                </ButtonGroup>

                {/* DELETE BUTTON */}
                {initialValues && (
                    <Button colorScheme="red" variant="outline" type="button" onClick={() => onDelete?.()}>
                        Delete
                    </Button>
                )}
            </Stack>
        </div>
    );
};

export default ChecklistCreateForm;
