import { Grid } from "@mui/material"
import { Box } from "@mui/system";
const Dashboard = () => {
    return (
        <Box sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
            <Grid container height="100%" width="100%" sx={{ height: "100%" }}>
                <Grid item xs={2.5} sx={{ height: "100%" }}>

                </Grid>
                <Grid item xs={9.5} sx={{ height: "100%" }}>

                </Grid>

            </Grid>
        </Box>
    )
}

export default Dashboard