import { Burger, Header, MediaQuery, Navbar, NavLink, ScrollArea, Text, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { Icon360View, IconDashboard, IconDatabase, IconEye, IconMap, IconRoad } from '@tabler/icons'


// interim assessment

const listNavLink = [
    {
        "lable": "Dashboard",
        "icon": IconDashboard,
        "href": "/pge/dashboard"
    },
    {
        "lable": "Area Distribution",
        "icon": Icon360View,
        "href": "/pge/area-distribution"
    },
    {
        "lable": "Source Data",
        "icon": IconDatabase,
        "href": "/pge/dashboard"
    },
    {
        "lable": "Candidate Screening",
        "icon": IconEye,
        "href": "/pge/dashboard"
    },
    {
        "lable": "Fan Mapping",
        "icon": IconMap,
        "href": "/pge/dashboard"
    },
    {
        "lable": "Data Estimates",
        "icon": IconRoad,
        "href": "/pge/dashboard"
    },


]


const LayoutNavbar = () => {

    const [active, setActive] = useState(0)
    const [opened, setOpened] = useState(false);
    const route = useRouter();

    return (
        <Navbar
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}>
            {listNavLink.map((item, index) =>
                <NavLink
                    key={item.lable}
                    icon={<item.icon />}
                    active={index === active}
                    label={item.lable}
                    onClick={() => {
                        setActive(index)
                        route.push(item.href)
                    }} />)}
        </Navbar>)
}

export default LayoutNavbar;