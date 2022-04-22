import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppShell, Container } from "@mantine/core";

import routes from "@/routes";
import DebugObserver from "@/features/devTools/ui/DebugObserver";
import AddChecklistPage from "@/pages/AddChecklist";
import ChecklistDetailsPage from "@/pages/ChecklistDetails";
import EditChecklistPage from "@/pages/EditChecklist";
import HomePage from "@/pages/Home";
import NotFoundPage from "@/pages/NotFound";

import AppHeaderModule from "./partial/AppHeader";

function App() {
    return (
        <BrowserRouter>
            <DebugObserver />
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
