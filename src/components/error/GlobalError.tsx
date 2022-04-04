import { Link } from 'react-router-dom';

import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";

const GlobalError = ({ errorInfo }: any) => {
    return (
        <Card sx={{ maxWidth: 345, margin: "auto", mt: 5 }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="subtitle1" component="div">
                        Sorry, We didn't expected this to happen
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {errorInfo}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Link to="/dashboard">
                    <Button size="small" color="primary" sx={{ textDecorationLine: "none" }}>
                        Go To Dashboard
                    </Button>
                </Link>
            </CardActions>
        </Card>
    )
}

export default GlobalError