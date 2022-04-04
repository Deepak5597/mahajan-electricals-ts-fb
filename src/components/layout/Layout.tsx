import { Outlet } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';
function Layout() {
    return (
        <Box sx={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column" }}>
            <Grid container height="100vh" width="100%">
                <Grid item xs={2} sx={{ backgroundColor: "common.white", height: "100vh", border: 1, borderColor: "grey.300" }}>
                    <Sidebar />
                </Grid>
                <Grid item container direction="column" xs={10} sx={{ backgroundColor: "grey.200" }}>
                    <Grid item sx={{ px: 3 }}>
                        <AppHeader />
                    </Grid>
                    <Grid item xs sx={{ backgroundColor: "grey.200", p: 3, height: "calc(100vh-75px)", overflowY: "auto" }}>
                        <Outlet />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Layout