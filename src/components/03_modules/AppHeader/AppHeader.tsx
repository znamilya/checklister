import { Container, Header } from "@mantine/core";
import { NavLink } from "typesafe-routes";
import { SquareCheck as IconListCheck } from "tabler-icons-react";

import routes from "../../../routes";

const AppHeaderModule = () => {
    return (
        <header>
            <Header
                height={60}
                p="xs"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                fixed={false}
            >
                <Container size="xs">
                    <NavLink to={routes({})}>
                        <IconListCheck color="green" size={36} />
                    </NavLink>
                </Container>
            </Header>
        </header>
    );
};

export default AppHeaderModule;
