// Is important to import as object cause the library uses `this` context.
import * as typesafeRoutes from "typesafe-routes";

const routes = typesafeRoutes.route(
    "/",
    {},
    {
        home: typesafeRoutes.route("/", {}, {}),
        addChecklist: typesafeRoutes.route("/add", {}, {}),
        checklistDetails: typesafeRoutes.route(
            "/:checklistId",
            {
                checklistId: typesafeRoutes.stringParser,
            },
            {},
        ),
        editChecklist: typesafeRoutes.route(
            "/:checklistId/edit",
            {
                checklistId: typesafeRoutes.stringParser,
            },
            {},
        ),
    },
);

export default routes;
