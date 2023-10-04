import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mui Material
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Components
import Copyright from '../Components/Copyright';

// Toastify
import { toast } from 'react-toastify';

// Context
import { useAuthContext } from '../Context/AuthContext';

// Interfaces
import { IRegister } from '../interfaces/IRegister';

// Utils
import { api } from '../Utils/Api';
import { removeLocalStorage, saveLocalStorage } from '../Utils/functions';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
    const { createUser, getLocalStorage } = useAuthContext();
    const [auth, setAuth] = useState<any>(getLocalStorage());
    const navigate = useNavigate();

    useEffect(() => {
        if(auth?.code == 200){
            navigate('/');
            toast.success('Bem vindo ao Creativy Portal!');
        }
    }, [auth]); 

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newUser: IRegister = {
            name: `${data.get('firstName')} ${data.get('lastName')}`,
            email: `${data.get('email')}`,
            password: `${data.get('password')}`,
            confirmPassword: `${data.get('confirmPassword')}`,
        }

        api.get('/sanctum/csrf-cookie').then(response => { 
            api.post('/api/register', {
                name: newUser.name,
                email: newUser.email,
                password: newUser.password
            })
            .then((res: any) => {
                removeLocalStorage();
                saveLocalStorage(res);
                console.log(res.data)
                navigate('/');
                toast.success('Bem vindo ao Creativy Portal!');
            })
            .catch((error: any) => {
                removeLocalStorage();
                
                toast.error(error.response.data.message);
            })
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Cadastrar-se
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="Nome"
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Sobrenome"
                        name="lastName"
                        autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirme a Senha"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-confirmpassword"
                        />
                    </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Cadastrar-se
                    </Button>
                    <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            Já tem uma conta? Sign in
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
        </ThemeProvider>
    );
}