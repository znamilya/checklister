import { ChecklistsListModule, NewChecklistButton } from "@/features/checklists";
import PageHeading from "@/ui/components/PageHeading";

const HomePage = () => {
    return (
        <>
            <PageHeading control={<NewChecklistButton />}>Checklists</PageHeading>
            <ChecklistsListModule />
        </>
    );
};

export default HomePage;
