import { FC, useState, useReducer } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { sha256 } from 'js-sha256';

import { Alert, Avatar, Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import useAuth from '../../global/hooks/useAuth';
import useConfig from '../../global/hooks/useConfig';
import db from '../../firebase';
import loginReducer from './reducer/loginReducer';
import IAuth from '../../global/models/auth';

const Login: FC = () => {
    const { login } = useAuth();
    const { userDb } = useConfig();

    const navigate = useNavigate();
    const location: any = useLocation();
    const routeTo = location?.state?.from ? location.state.from : '/';

    const [loginForm, setLoginForm] = useState({ email: '', password: '' })
    const [loginData, loginDispatcher] = useReducer(loginReducer, { data: [], isLoading: false, isSuccess: true });

    const handleFieldChange = (e: any) => {
        const target = e.target;
        setLoginForm({
            ...loginForm,
            [target.name]: target.value
        })
    }
    const handleLogin = async (e: any) => {
        e.preventDefault();
        if (login === undefined)
            return;
        if (process.env.REACT_APP_ENV === "DEV") {
            login({ email: 'deepakbisht@gmail.com', role: 'admin', name: 'Deepak Bisht' });
            navigate(routeTo, { replace: true });
            return;
        }
        loginDispatcher("INITIATE");
        if (!loginForm.email || !loginForm.password) {
            loginDispatcher("FAILURE_VALIDATION");
            return;
        }
        try {
            const loginQuery = query(collection(db, userDb), where("email", "==", loginForm.email), where("password", "==", sha256(loginForm.password)));
            const userInfoSnapshot = await getDocs(loginQuery);
            if (userInfoSnapshot.size) {
                const userData: IAuth[] = [];
                userInfoSnapshot.forEach((doc) => { userData.push(createDataObject(doc.data())) })
                loginDispatcher("SUCCESS");
                login(userData[0]);
                navigate(routeTo, { replace: true });
            } else {
                loginDispatcher("FAILURE_ERROR");
            }
        } catch (err) {
            loginDispatcher("FAILURE_EXCEPTION");
        }
    }
    const createDataObject = (data: any): IAuth => {
        const authObj: IAuth = {
            name: data.name,
            email: data.email,
            role: data.role
        }
        return authObj;
    }
    return (
        <Container component="main" maxWidth="xs" sx={{ height: "100vh" }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: "center",
                    height: "100%",
                    width: "100%"
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5" mb={2}>
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                    {(!loginData.isSuccess && loginData?.message) &&
                        <Alert severity="error">{loginData.message}</Alert>
                    }
                    <TextField
                        margin="normal"
                        size="small"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleFieldChange}
                    />
                    <TextField
                        margin="normal"
                        size="small"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleFieldChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLogin}
                    >
                        Sign In
                    </Button>
                </Box>

            </Box>
        </Container >
    )
}

export default Login