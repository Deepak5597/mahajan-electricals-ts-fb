import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import IParty from "../../model/party";
import SimpleDialog from "../../../utility/SimpleDialog";
import React from "react";
import BillingLocationCardView from "./BillingLocationCardView";

interface IPartyListActionProps {
    data: IParty,
    key?: string
}
const ITEM_HEIGHT = 48;

const PartyListAction: FC<IPartyListActionProps> = ({ data, key }) => {
    const navigate = useNavigate();

    //action tab setup start
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    //action tab setup ends
    //view poup setup start
    const [openViewPopup, setOpenViewPopup] = useState(false);
    const handlePopupClose = (value: boolean) => {
        setOpenViewPopup(value);
    };
    //view poup setup ends

    return (
        <div key={key}>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem key="View Locations" onClick={() => setOpenViewPopup(true)}>
                    <ListItemIcon>
                        <VisibilityIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>View</ListItemText>
                </MenuItem>

                <MenuItem key="Edit" onClick={() => navigate(`/parties/edit/${data.id}`)}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>
                <SimpleDialog title="Billing Locations" open={openViewPopup} onClose={handlePopupClose}>
                    <BillingLocationCardView data={data} />
                </SimpleDialog>
            </Menu>
        </div>
    )
}

export default PartyListAction