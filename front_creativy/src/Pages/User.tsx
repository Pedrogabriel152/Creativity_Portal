import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Utils
import { api } from '../Utils/Api';

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
import { useDeletePost, useGetPost, useLikePost } from '../GraphQL/Hooks/postHooks';
import { useReactiveVar } from '@apollo/client';
import { deletedPostVar, getPostVar } from '../GraphQL/States/postState';
import { useGetUser } from '../GraphQL/Hooks/userHook';
import { userVar } from '../GraphQL/States/userSatate';

// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import CreatedPost from '../Components/CreatedPost';
import ConfirmeModal from '../Components/ConfirmeModal';
import CardProfile from '../Components/CardProfile';

// Toatify
import { toast } from 'react-toastify';
import UserEditModal from '../Components/UserEditModal';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function User() {
    const {id} = useParams();
    const {error} = useGetUser(id? parseInt(id) : 0);
    const user = useReactiveVar(userVar);
    const { getLocalStorage } = useAuthContext();
    const auth = getLocalStorage();
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if(auth) {
            api.defaults.headers.Authorization = `Bearer ${auth?.token}`;
            api.get('api/user', {
            headers: {
                Authorization: `Bearer ${auth?.token}`
            }
            }).then(response => {})
            .catch(error => {
                navigate('/login');
                toast.error('Entre na plataforma primeiro!');
            });
        }
      }, []);

    useEffect(() => {
        if(error) {
            navigate('/login');
            toast.error('Entre na plataforma primeiro!');
        }   
    }, [error]); 

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    if(!user) return <div></div>

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Creativy Portal" user={user} />
                <main>
                <Grid container spacing={5} sx={{ mt: 3 }}>
                    <Grid
                    item
                    xs={12}
                    md={12}
                    sx={{
                        '& .markdown': {
                        py: 3,
                        },  
                    }}
                    >
                        <CardProfile user={user} handleOpen={handleOpen}/>
                    {/* <Link sx={{textDecoration: 'none', color: '#000'}} href={`/user/${post.user_id}`}>
                    <Typography variant="subtitle2" gutterBottom sx={{display: 'flex'}}>
                        <Avatar alt={post.user?.name} src={post.user?.image? `${process.env.REACT_APP_API_URL}${post.user?.image}`:''} />
                        <span style={{marginLeft: '10px', textAlign: 'center', paddingTop:'10px'}}>{post.user?.name}</span>
                    </Typography>
                    </Link>
                    {post?.user_id === user && (
                        <>
                        <IconButton aria-label="load" size='large' style={{ color: 'blue' }} onClick={handleOpen}>
                        <EditNoteIcon fontSize="inherit"/>
                        </IconButton>
                        <IconButton aria-label="load" size='large' style={{ color: 'red', marginRight: '0px' }} onClick={handleOpenDelete}>
                        <DeleteIcon fontSize="inherit"/>
                        </IconButton>
                        </>
                    )}               */}
                    </Grid>
                    {/* <Main auth={auth} post={post} user={user} first={first} likePostFunc={likePostFunc}/>
                    <Comments user={user} auth={auth} setFirst={setFirst} loadindMoreComment={loadindMoreComment} likeCommentFunc={likeCommentFunc} first={first} update={update}/> */}
                </Grid>
                </main>
            </Container>
            <Footer
                title="Footer"
                description="Something here to give the footer a purpose!"
            />
            <Modal keepMounted 
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <UserEditModal user={user} handleClose={handleClose}/>
            </Modal>
        </ThemeProvider>
    );
}