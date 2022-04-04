import { useEffect, useState } from "react";

import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LogoutIcon from '@mui/icons-material/Logout';

import logo from '../../images/logo-color.png';
import SidebarItem from "./SidebarItem";
import useAuth from "../../global/hooks/useAuth";
const Sidebar = () => {
    const { isLoggedIn, logout } = useAuth();
    const [loginStatus, setLoginStatus] = useState(false);
    const [activeLink, setActiveLink] = useState("dashboard");
    const logoutUser = () => {
        if (logout !== undefined) {
            logout();
        }
    }

    useEffect(() => {
        setLoginStatus(isLoggedIn);
    }, [isLoggedIn])
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
            <Box sx={{ height: "100px", width: "80%", cursor: "pointer" }}>
                <img src={logo} alt="Logo" height="100%" width="100%" />
            </Box>
            <Box sx={{ flex: 1, width: "100%", display: "flex", flexDirection: "column" }}>
                <List sx={{ flex: 1 }}>
                    <ListItem onClick={() => setActiveLink("dashboard")}>
                        <SidebarItem title="Dashboard" path="/dashboard" isActive={activeLink === "dashboard"}>
                            <DashboardIcon />
                        </SidebarItem>
                    </ListItem>
                    <ListItem onClick={() => setActiveLink("parties")}>
                        <SidebarItem title="Parties" path="/parties" isActive={activeLink === "parties"}>
                            <GroupAddIcon />
                        </SidebarItem>
                    </ListItem>
                    <ListItem onClick={() => setActiveLink("items")}>
                        <SidebarItem title="Items" path="/items" isActive={activeLink === "items"}>
                            <CategoryIcon />
                        </SidebarItem>
                    </ListItem>
                    <ListItem onClick={() => setActiveLink("sales")}>
                        <SidebarItem title="Sales" path="/sales" isActive={activeLink === "sales"}>
                            <MonetizationOnIcon />
                        </SidebarItem>
                    </ListItem>
                </List>
                {
                    loginStatus &&
                    <Box>
                        <List>
                            <ListItem onClick={logoutUser}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LogoutIcon sx={{ color: "black" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default Sidebar