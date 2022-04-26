import { Container, Center } from "@chakra-ui/react";
import { Link } from "typesafe-routes";
import { SquareCheck as IconListCheck } from "tabler-icons-react";

import routes from "@/routes";

const AppHeaderModule = () => {
    return (
        <Container as="header" height={12}>
            <Center height="100%">
                <Link to={routes({})}>
                    <IconListCheck color="green" size={36} />
                </Link>
            </Center>
        </Container>
    );
};

export default AppHeaderModule;
