import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Avatar, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LogoutIcon from '@mui/icons-material/Logout';

import useAuth from "../../global/hooks/useAuth";
import useConfig from "../../global/hooks/useConfig";
import ProfilePic from "../../images/pp.png";

const AppHeader = () => {
    const { auth, isLoggedIn, logout } = useAuth();
    const { defaultUser, defaultRole } = useConfig();
    const [loginStatus, setLoginStatus] = useState(false);
    const [heading, setHeading] = useState("Dashboard");
    const location: any = useLocation();

    const getHeaderTitleUsingPathname = useCallback((pathname: string) => {
        switch (pathname) {
            case "/dashboard":
                return "Dashboard";
            case "/parties":
                return "Parties";
            case "/sales":
                return "Sales";
            case "/items":
                return "Items";
            default:
                return "";
        }
    }, []);

    useEffect(() => {
        setLoginStatus(isLoggedIn);
    }, [isLoggedIn]);

    useEffect(() => {
        if (location?.pathname) {
            setHeading(getHeaderTitleUsingPathname(location.pathname));
        }
    }, [location, getHeaderTitleUsingPathname]);

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = () => {
        logout && logout();
    }
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", height: "80px" }}>
            <Typography variant="h6">{heading}</Typography>
            {
                loginStatus && (
                    <Box sx={{ flex: 1, display: "flex", gap: 2, flexGrow: 0, flexDirection: "row" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "end", justifyContent: "center" }}>

                            <Typography variant="body2" noWrap component="span" sx={{ fontSize: "small", fontWeight: "bold" }}>
                                {auth?.name ? auth.name : defaultUser}
                            </Typography>
                            <Typography variant="body2" noWrap component="span" sx={{ fontSize: "small", fontWeight: "bold" }}>
                                {auth?.role ? auth.role : defaultRole}
                            </Typography>
                        </Box>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Profile Pic" src={ProfilePic} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '40px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            <MenuItem onClick={() => { handleCloseUserMenu(); handleLogout() }}>
                                <ListItemIcon>
                                    <LogoutIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Logout</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                )
            }
        </Box>
    )
}

export default AppHeader