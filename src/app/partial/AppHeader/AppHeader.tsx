import { Container, Center } from "@chakra-ui/react";
import { Link } from "typesafe-routes";
import { FaCheckSquare as IconCheck } from "react-icons/fa";

import routes from "@/routes";

const AppHeaderModule = () => {
    return (
        <Container as="header" height={12}>
            <Center height="100%">
                <Link to={routes({})}>
                    <IconCheck color="green" size={32} />
                </Link>
            </Center>
        </Container>
    );
};

export default AppHeaderModule;
