import { useState, useEffect } from 'react';

import { Avatar, Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import logo from '../../images/logo.png';
import ProfilePic from '../../images/pp.png';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import useAuth from '../../global/hooks/useAuth';
import useColorMode from '../../global/hooks/useColorMode';
import { ColorMode } from '../../global/models/colormode.context';

function Header() {
    const { auth, isLoggedIn, logout } = useAuth();
    const { toggleColorMode, mode } = useColorMode();
    const [loginStatus, setLoginStatus] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const logoutUser = () => {
        if (logout !== undefined) {
            logout();
        }
    }

    useEffect(() => {
        setLoginStatus(isLoggedIn);
    }, [isLoggedIn])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent">
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box sx={{ height: "80%", width: "100px" }}>
                        <img src={logo} alt="Logo" height="100%" width="100%" />
                    </Box>
                    {
                        loginStatus && (
                            <Box sx={{ display: "flex", gap: 2, flexGrow: 0, flexDirection: "row" }}>
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "end", justifyContent: "center" }}>

                                    <Typography variant="subtitle2" noWrap component="span" sx={{ fontSize: "small" }}>
                                        {auth?.name ? auth.name : "Guest"}
                                    </Typography>
                                    <Typography variant="subtitle2" noWrap component="span" sx={{ fontSize: "small" }}>
                                        {auth?.role ? auth.role : "guest"}
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
                                    <MenuItem onClick={() => { toggleColorMode !== undefined && toggleColorMode() }}>
                                        <ListItemIcon>
                                            {
                                                mode === ColorMode.light ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />
                                            }
                                        </ListItemIcon>
                                        <ListItemText>
                                            {
                                                mode === ColorMode.light ? "Dark Mode" : "Light Mode"
                                            }
                                        </ListItemText>
                                    </MenuItem>
                                    <MenuItem onClick={() => { handleCloseUserMenu(); logoutUser() }}>
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>Logout</ListItemText>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        )
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header