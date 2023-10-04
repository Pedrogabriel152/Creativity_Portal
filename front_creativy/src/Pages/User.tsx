import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Utils
import { api } from '../Utils/Api';

// Mui Material
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Modal } from '@mui/material';

// GraphQL
import { useAuthContext } from '../Context/AuthContext';
import { useReactiveVar } from '@apollo/client';
import { useGetUser } from '../GraphQL/Hooks/userHook';
import { updateUserVar, userVar } from '../GraphQL/States/userSatate';

// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import CardProfile from '../Components/CardProfile';
import UserEditModal from '../Components/UserEditModal';
import PostCard from '../Components/PostCard';

// Toatify
import { toast } from 'react-toastify';

// Interfaces
import { IUser } from '../interfaces/IUser';
import { IPost } from '../interfaces/IPost';

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
    const [user_id, setUserId] = useState<number>(0);
    const [userLog, setUserLog] = useState<IUser>();
    const updateUserResponse = useReactiveVar(updateUserVar);
    const [likes, setLikes] = useState<boolean[]>([]);

    useEffect(() => {}, [updateUserResponse]);

    useEffect(() => {
        if(auth) {
            api.defaults.headers.Authorization = `Bearer ${auth?.token}`;
            api.get('api/user', {
            headers: {
                Authorization: `Bearer ${auth?.token}`
            }
            }).then(response => {
                setUserId(response.data.id);
                setUserLog(response.data);
            })
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
    }, [updateUserResponse, error]); 


    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    if(!user || !userLog) return <div></div>

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Creativy Portal" user={userLog} />
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
                        <CardProfile user={updateUserResponse?.user? updateUserResponse.user : user} handleOpen={handleOpen} userId={user_id}/>
                        {user.posts?.map((post: IPost, index: number) => (
                            <PostCard post={post} user={userLog.id}/>                          
                        ))}
                    </Grid>
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
                <UserEditModal user={updateUserResponse?.user? updateUserResponse.user : user} handleClose={handleClose}/>
            </Modal>
        </ThemeProvider>
    );
}