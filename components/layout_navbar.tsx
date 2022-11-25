import { Burger, Header, MediaQuery, Navbar, ScrollArea, Text, useMantineTheme } from "@mantine/core";
import { useState } from "react";


const LayoutNavbar = () => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (<Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
        <Text>Application navbar</Text>
    </Navbar>)
}

export default LayoutNavbar;