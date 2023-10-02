import { useNavigate, useParams } from 'react-router-dom';

// Interfaces
import { ILogin } from '../interfaces/ILogin';

// Components
import Copyright from '../Components/Copyright';

// Mui Material
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Utils
import { api } from '../Utils/Api';
import { removeLocalStorage, saveLocalStorage } from '../Utils/functions';

// Toastify
import { toast } from 'react-toastify';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ForgotPassword() {
    const {token} = useParams();
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        api.post('/api/forgot-password', {
            password: `${data.get('password')}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            removeLocalStorage();
            saveLocalStorage(res);
            navigate('/');
            toast.success('Senha auterada com sucesso');
        })
        .catch(error => {
            removeLocalStorage();
            toast.error(error.response.data.message);
        })
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
                Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Nova Senha"
                    type='password'
                    name="password"
                    autoComplete="password"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirme a Senha"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-confirmPassword"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                Alterar Senha
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="/login" variant="body2">
                        Login
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        </ThemeProvider>
    );
}