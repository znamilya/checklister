import { useRouteParams } from "typesafe-routes";

import routes from "../../../routes";
import ChecklistEditModule from "../../03_modules/ChecklistEdit";

const EditChecklistPage = () => {
    const { checklistId } = useRouteParams(routes.children.checklistDetails);

    return (
        <>
            <ChecklistEditModule checklistId={checklistId} />
        </>
    );
};

export default EditChecklistPage;
