import { useRouteParams } from "typesafe-routes";

import routes from "@/routes";
import { ChecklistDetailsModule } from "@/features/checklists";

const ChecklistDetailsPage = () => {
    const { checklistId } = useRouteParams(routes.children.checklistDetails);

    return (
        <>
            <ChecklistDetailsModule checklistId={checklistId} />
        </>
    );
};

export default ChecklistDetailsPage;
