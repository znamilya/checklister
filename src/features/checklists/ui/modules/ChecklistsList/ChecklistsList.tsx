import useChecklistsController from "../../../controllers/useChecklists";
import ChecklistsList from "../../components/ChecklistsList";

/**
 * Display a list of available checklists.
 */
const ChecklistsListModule = () => {
    const { getChecklists } = useChecklistsController();
    const [checklists, checklistsError] = getChecklists();

    if (checklistsError) {
        return <div>Can't get your checklists.</div>;
    }

    return <ChecklistsList checklists={checklists} />;
};

export default ChecklistsListModule;
