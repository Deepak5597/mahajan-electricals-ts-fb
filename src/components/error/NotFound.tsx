import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Container, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import useConfig from '../../global/hooks/useConfig';

function NotFound() {

    const location: any = useLocation();
    const navigate = useNavigate();
    const { appDefaultRoute } = useConfig();

    const handleCta = () => {
        const navigationRoute = location?.state?.from ? location.state.from : appDefaultRoute;
        navigate(navigationRoute);
    }
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h1" mb={2}>
                    404
                </Typography>
                <Divider />
                <Typography component="h6" variant="h6" mb={2}>
                    We don't have anything to show you here
                </Typography>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleCta}
                >
                    <ArrowBackIcon sx={{ marginRight: 1 }} />
                    Go Back from where you started
                </Button>
            </Box>
        </Container>
    )
}

export default NotFound;
