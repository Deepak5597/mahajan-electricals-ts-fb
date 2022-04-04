import { ListItemButton, ListItemText } from "@mui/material";
import { FC } from "react";

import { useNavigate } from "react-router-dom";

interface ISidebarItemProps {
    title: string,
    path: string,
    isActive: boolean
}

const SidebarItem: FC<ISidebarItemProps> = ({ title, path, isActive, children }) => {
    const navigate = useNavigate();
    const handleNavigation = (path: string) => { navigate(path) }
    return (
        <ListItemButton selected={isActive} onClick={() => handleNavigation(path)}>
            {children}
            <ListItemText primary={title} sx={{ ml: 4 }} />
        </ListItemButton>
    )
}

export default SidebarItem