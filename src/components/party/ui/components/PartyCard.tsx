import { FC } from "react";

import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import IParty from "../../model/party";
import getNameInitials from "../../../../global/utility/getNameInitials";

interface IPartyCardProps {
    party: IParty
}

const PartyCard: FC<IPartyCardProps> = ({ party }) => {
    return (
        <Card sx={{ height: "max-content", flex: 1, minWidth: "250px", maxWidth: { lg: "250px" } }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "primary.main" }} aria-label="recipe">
                        {getNameInitials(party.name)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={party.name}
                subheader={`${party.type} | ${party.currentBalance}`}>
            </CardHeader>
        </Card>
    )
}

export default PartyCard