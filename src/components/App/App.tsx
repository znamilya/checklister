import { BrowserRouter, Route, Routes } from "react-router-dom";

import routes from "../../routes";
import AppHeaderModule from "../03_modules/AppHeader";
import AddChecklistPage from "../04_pages/AddChecklist";
import ChecklistDetailsPage from "../04_pages/ChecklistDetails";
import HomePage from "../04_pages/Home";
import NotFoundPage from "../04_pages/NotFound";

function App() {
    return (
        <BrowserRouter>
            <AppHeaderModule />
            <main>
                <Routes>
                    <Route path={routes.template}>
                        <Route index element={<HomePage />} />
                        <Route
                            path={routes.children.addChecklist.template}
                            element={<AddChecklistPage />}
                        />
                        <Route
                            path={routes.children.checklistDetails.template}
                            element={<ChecklistDetailsPage />}
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
