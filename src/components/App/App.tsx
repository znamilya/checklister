import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppShell, Container } from "@mantine/core";

import routes from "../../routes";
import AppHeaderModule from "../03_modules/AppHeader";
import AddChecklistPage from "../04_pages/AddChecklist";
import ChecklistDetailsPage from "../04_pages/ChecklistDetails";
import EditChecklistPage from "../04_pages/EditChecklist";
import HomePage from "../04_pages/Home";
import NotFoundPage from "../04_pages/NotFound";

function App() {
    return (
        <BrowserRouter>
            <AppHeaderModule />
            <AppShell padding="md">
                <Container size="xs">
                    <Routes>
                        <Route path={routes.template}>
                            <Route index element={<HomePage />} />
                            <Route path={routes.children.addChecklist.template} element={<AddChecklistPage />} />
                            <Route
                                path={routes.children.checklistDetails.template}
                                element={<ChecklistDetailsPage />}
                            />
                            <Route path={routes.children.editChecklist.template} element={<EditChecklistPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Route>
                    </Routes>
                </Container>
            </AppShell>
        </BrowserRouter>
    );
}

export default App;
