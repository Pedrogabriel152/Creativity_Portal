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
import { useState } from 'react';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function EmailRecoverPassword() {
    const [email, setEmail] = useState<string>('');

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!email) return toast.error('Preencha todos os campos');
 
        api.post('/api/email-recover-password', {
            email:email,
        })
        .then(res => {
            toast.success('Email enviado');
        })
        .catch(error => {
            toast.error("Tente novamente mais tarde");
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
                Email para redefinição de senha
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    type='email'
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={handleOnChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                Enviar
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