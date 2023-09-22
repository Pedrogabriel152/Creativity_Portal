import { useNavigate, useParams } from 'react-router-dom';

// Utils
import { api } from '../Utils/Api';
import { sections } from '../Utils/variable';

// Mui Material
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, IconButton, Link, Modal, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

// GraphQL
import { useAuthContext } from '../Context/AuthContext';
import { useLikeComment } from '../GraphQL/Hooks/commentHooks';
import { updatedCommentsVar } from '../GraphQL/States/commentState';
import { useDeletePost, useGetPost, useLikePost } from '../GraphQL/Hooks/postHooks';
import { useReactiveVar } from '@apollo/client';
import { deletedPostVar, getPostVar } from '../GraphQL/States/postState';

// Components
import Header from '../Components/Header';
import Main from '../Components/Main';
import Footer from '../Components/Footer';
import Comments from '../Components/Comments';
import CreatedPost from '../Components/CreatedPost';
import ConfirmeModal from '../Components/ConfirmeModal';

// Toatify
import { toast } from 'react-toastify';
import CardProfile from '../Components/CardProfile';
import { useEffect, useState } from 'react';
import { IUser } from '../interfaces/IUser';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function User() {
    const { getLocalStorage } = useAuthContext();
    const auth = getLocalStorage();
    const [user, setUser] = useState<IUser>();
    const navigate = useNavigate();

    useEffect(() => {
        api.defaults.headers.Authorization = `Bearer ${auth?.token}`;
        api.get('api/user', {
          headers: {
            Authorization: `Bearer ${auth?.token}`
          }
        }).then(response => setUser(response.data))
        .catch(error => {
          navigate('/login');
          toast.error('Entre na plataforma primeiro!');
        });
      }, []);

    if(!user) return <div></div>

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Creativy Portal" sections={sections} />
                <main>
                <Grid container spacing={5} sx={{ mt: 3 }}>
                    <Grid
                    item
                    xs={6}
                    md={12}
                    sx={{
                        '& .markdown': {
                        py: 3,
                        },  
                    }}
                    >
                        <CardProfile user={user}/>
                       
                    </Grid>
                </Grid>
                </main>
            </Container>
            <Footer
                title="Footer"
                description="Something here to give the footer a purpose!"
            />
        </ThemeProvider>
    );
}