import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

// Interfaes
import { IUser } from '../interfaces/IUser';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Post() {
  const [first, setFirst] = React.useState<number>(8);
  const { getLocalStorage } = useAuthContext();
  const {id} = useParams();
  const likeCommentResponse = useReactiveVar(updatedCommentsVar);
  const {loading: loadindMoreComment} = useGetPost(id? parseInt(id) : 0, first);
  const post = useReactiveVar(getPostVar);
  const auth = getLocalStorage();
  const [user, setUser] = React.useState<IUser>();
  const [likeComment, {loading}] = useLikeComment(id? parseInt(id) : 0, first);
  const [likePost] = useLikePost();
  const likePostResponse = useReactiveVar(updatedCommentsVar);
  const [update, setUpdate] = React.useState<boolean>(true);
  const navigate = useNavigate();
  const [deletePost] = useDeletePost();
  const deletePostResponse = useReactiveVar(deletedPostVar);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
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

  React.useEffect(() => {}, [first, loading, likeCommentResponse, likeCommentResponse, user]);

  React.useEffect(() => {
    if(deletePostResponse?.code !== 200) {
      toast.error(deletePostResponse?.message);
      return;
    }
    toast.success(deletePostResponse?.message);
  }, [deletePostResponse]);

  const handleOpen = () => setOpenEdit(true);
  const handleClose = () => setOpenEdit(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const likeCommentFunc = (id: number, post_id: number) => {
    likeComment({
      variables: {
        id,
        post_id,
        first
      }
    });
    setUpdate(false);
  }

  const likePostFunc = (id: number) => {
    likePost({
      variables: {
        id,
        first
      }
    });
  }

  const handleDeletePost = () => {
    deletePost({
      variables: {
        id
      }
    });
    navigate('/');
  }

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  if(!post || !user) {
    return <div></div>
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Creativy Portal" user={user} />
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
              <Link sx={{textDecoration: 'none', color: '#000'}} href={`/user/${post.user_id}`}>
              <Typography variant="subtitle2" gutterBottom sx={{display: 'flex'}}>
                <Avatar alt={post.user?.name} src={post.user?.image? `${process.env.REACT_APP_API_URL}${post.user?.image}`:''} />
                <span style={{marginLeft: '10px', textAlign: 'center', paddingTop:'10px'}}>{post.user?.name}</span>
              </Typography>
              </Link>
              {post?.user_id === user.id && (
                <>
                <IconButton aria-label="load" size='large' style={{ color: 'blue' }} onClick={handleOpen}>
                  <EditNoteIcon fontSize="inherit"/>
                </IconButton>
                <IconButton aria-label="load" size='large' style={{ color: 'red', marginRight: '0px' }} onClick={handleOpenDelete}>
                  <DeleteIcon fontSize="inherit"/>
                </IconButton>
                </>
              )}              
            </Grid>
            <Main auth={auth} post={post} user={user.id} first={first} likePostFunc={likePostFunc} handleFocus={handleFocus}/>
            <Comments user={user?.id} auth={auth} setFirst={setFirst} loadindMoreComment={loadindMoreComment} likeCommentFunc={likeCommentFunc} first={first} update={update} inputRef={inputRef} userLog={user}/>
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />

      <Modal keepMounted 
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <CreatedPost title="Editar Post" post={post}/>
      </Modal>
      <Modal keepMounted 
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <ConfirmeModal text='Deseja excluir o post' handleClick={handleDeletePost} handleClose={handleCloseDelete}/>
      </Modal>
    </ThemeProvider>
  );
}