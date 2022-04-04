import { FC, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Box, ListItemText, Menu, MenuItem, Paper, styled, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from '@mui/material/ListItemIcon';

import IParty from "../../model/party";

interface IPartyListItemProps {
    data: IParty,
    changeSelectedParty: Function,
    isActive: boolean | false
}

const PartyListItem: FC<IPartyListItemProps> = ({ data, changeSelectedParty, isActive }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (actionType: string) => {
        setAnchorEl(null);
        if (actionType === "edit")
            navigate(`/parties/update/${data.id}`)
    };
    const handleCardClick = () => {
        changeSelectedParty(data);
    }
    return (

        <Item sx={[{ width: "100%", borderLeft: 5, borderRadius: 0, borderColor: "transparent" }, isActive && { borderColor: "primary.main", backgroundColor: "grey.200" }, { '&:hover': { backgroundColor: "grey.100" } }]}>
            <Box onClick={handleCardClick}>
                <Typography variant="subtitle1">{data.name}</Typography>
                <Typography variant="subtitle2" sx={{ color: "grey.700" }}>{data.billingLocations.reduce((previousValue, newValue) => previousValue + ' | ' + newValue.phone, '').substring(2)}</Typography>
                <Typography variant="subtitle2" sx={{ color: "grey.700" }}>{data.type} | {data.currentBalance}</Typography>
            </Box>
            <IconButton aria-label="action" component="span" onClick={handleClick} aria-controls={open ? 'basic-menu' : undefined} aria-expanded={open ? 'true' : undefined}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => handleClose("edit")}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => handleClose("delete")}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>
        </Item>
    )
}

const Item = styled(Paper)({
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    width: "100%"
})

export default PartyListItem