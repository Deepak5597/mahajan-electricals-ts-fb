import { FC } from 'react';
import { List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import IParty from '../../model/party';
import { Box } from '@mui/system';

interface IBillingLocationCardView {
    data: IParty
}
const BillingLocationCardView: FC<IBillingLocationCardView> = ({ data }) => {
    return (
        <List sx={{ width: '100%', minWidth: 400, bgcolor: 'background.paper' }}>
            {
                data.billingLocations.map(location => {
                    return (<>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={location.billingName}
                                secondary={
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {location.phone}
                                        </Typography>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {location.address}
                                        </Typography>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {location.billingType}
                                        </Typography>
                                    </Box>
                                }
                                sx={{ '& span': { backgroundColor: location.isDefault ? "primary.main" : "common.white", color: location.isDefault ? "primary.contrastText" : "common.black" } }}
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </>)
                })
            }
        </List>
    )
}

export default BillingLocationCardView