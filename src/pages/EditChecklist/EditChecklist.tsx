import { useRouteParams } from "typesafe-routes";

import routes from "@/routes";
import { ChecklistEditModule } from "@/features/checklists";

const EditChecklistPage = () => {
    const { checklistId } = useRouteParams(routes.children.checklistDetails);

    return (
        <>
            <ChecklistEditModule checklistId={checklistId} />
        </>
    );
};

export default EditChecklistPage;
