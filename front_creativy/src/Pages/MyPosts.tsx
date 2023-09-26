import { useEffect, useState } from 'react';

// Mui Material
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button, ButtonGroup, CircularProgress, IconButton, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import ReplayIcon from '@mui/icons-material/Replay';
import AddIcon from '@mui/icons-material/Add';

// Components
import Header from '../Components/Header';
import CreatedPost from '../Components/CreatedPost';
import FeaturedPost from '../Components/FeaturedPost';
import Footer from '../Components/Footer';

// GraphQL
import { useGetFeaturedPosts, useGetMainPost, useGetMyPosts } from '../GraphQL/Hooks/postHooks';
import { useReactiveVar } from '@apollo/client';
import { getFeaturedPostsVar, getMainPostVar, getMyPostsVar } from '../GraphQL/States/postState';

// Interfaces
import { IPost } from '../interfaces/IPost';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../interfaces/IUser';

// Toastify
import { toast } from 'react-toastify';

// Context
import { useAuthContext } from '../Context/AuthContext';

// Utils
import { api } from '../Utils/Api';

export default function MyPosts() {
    const [first, setFirst] = useState<number>(10);
    const { getLocalStorage } = useAuthContext();
    const auth = getLocalStorage();
    const [user, setUser] = useState<IUser>();
    const navigate = useNavigate();
    const {loading: loadindMorePosts, error} = useGetMyPosts(auth?.user_id, first);
    const myPosts = useReactiveVar(getMyPostsVar);
    const [open, setOpen] = useState(false);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    useEffect(() => {
        if(error){
            navigate('/login');
            toast.error('Entre na plataforma primeiro!');
        }
    },[first, error]);     

    const morePosts = () => {if(myPosts?.paginatorInfo.hasMorePages) setFirst(myPosts?.paginatorInfo.count+10);}
    
    if(!myPosts || !user) return <div></div>

    // TODO remove, this demo shouldn't need to reset the theme.
    const defaultTheme = createTheme();

    return(
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container maxWidth="lg">
            <Header title="Creativy Portal" user={user} />
            <main>
            <Button variant="outlined" startIcon={<AddIcon />} sx={{marginBottom: 3, marginLeft: '75%'}} onClick={handleOpen}>
                New Post
            </Button>
            <Grid container spacing={4}>
                {myPosts?.data.map((post: IPost) => (
                <FeaturedPost key={post.id} post={post} />
                ))}
            </Grid>
            
            {myPosts?.paginatorInfo?.hasMorePages?
                loadindMorePosts 
                ?<CircularProgress disableShrink style={{margin: '0 auto', marginLeft: '48%', marginTop: '15px'}} size={25}/>
                :<IconButton aria-label="load" size='large' style={{margin: '0 auto', marginLeft: '48%', marginTop: '15px'}} onClick={morePosts}>
                    <ReplayIcon fontSize="inherit"/>
                </IconButton>
                :<div></div>
            }             
            </main>
        </Container>
        <Footer
            title="Mais informações"
            description="Something here to give the footer a purpose!"
        />
        <Modal keepMounted 
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <CreatedPost />
        </Modal>
        </ThemeProvider>
    );
}