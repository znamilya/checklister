import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider, Container } from "@chakra-ui/react";

import routes from "@/routes";
import DebugObserver from "@/features/devTools/ui/DebugObserver";
import { ConfirmationProvider } from "@/features/confirmation";
import AddChecklistPage from "@/pages/AddChecklist";
import ChecklistDetailsPage from "@/pages/ChecklistDetails";
import EditChecklistPage from "@/pages/EditChecklist";
import HomePage from "@/pages/Home";
import NotFoundPage from "@/pages/NotFound";
import theme from "@/styles/chakraTheme";

import AppHeaderModule from "./partial/AppHeader";

function App() {
    return (
        <BrowserRouter>
            <DebugObserver />
            <ChakraProvider theme={theme}>
                <AppHeaderModule />
                <ConfirmationProvider>
                    <Container as="main" pt={4}>
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
                </ConfirmationProvider>
            </ChakraProvider>
        </BrowserRouter>
    );
}

export default App;
