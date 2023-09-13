import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Components/Header';
import MainFeaturedPost from '../Components/MainFeaturedPost';
import FeaturedPost from '../Components/FeaturedPost';
import Main from '../Components/Main';
import Sidebar from '../Components/SideBar';
import Footer from '../Components/Footer';
import { useParams } from 'react-router-dom';
import { useGetPost, useLikePost } from '../GraphQL/Hooks/postHooks';
import { useReactiveVar } from '@apollo/client';
import { getPostVar } from '../GraphQL/States/postState';
import { Avatar, Typography } from '@mui/material';
import { sections } from '../Utils/variable';
import Comments from '../Components/Comments';
import { api } from '../Utils/Api';
import { useAuthContext } from '../Context/AuthContext';
import { useLikeComment } from '../GraphQL/Hooks/commentHooks';
import { likeCommentVar } from '../GraphQL/States/commentState';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Post() {
  const [first, setFirst] = React.useState<number>(8);
  const { getLocalStorage } = useAuthContext();
  const {id} = useParams();
  const likeCommentResponse = useReactiveVar(likeCommentVar);
  const {loading: loadindMoreComment} = useGetPost(id? parseInt(id) : 0, first);
  const post = useReactiveVar(getPostVar);
  const auth = getLocalStorage();
  const [user, setUser] = React.useState<number>(0);
  const [likeComment, {loading}] = useLikeComment(id? parseInt(id) : 0, first);
  const [likePost] = useLikePost();
  const likePostResponse = useReactiveVar(likeCommentVar);

  const likeCommentFunc = (id: number, post_id: number) => {
    likeComment({
      variables: {
        id,
        post_id
      }
    });
  }

  const likePostFunc = (id: number) => {
    likePost({
      variables: {
        id
      }
    })
  }

  React.useEffect(() => {
    api.defaults.headers.Authorization = `Bearer ${auth?.token}`;
    api.get('api/user', {
      headers: {
        Authorization: `Bearer ${auth?.token}`
      }
    }).then(response => setUser(response.data.id));
  }, [auth]);

  React.useEffect(() => {}, [first, loading, likeCommentResponse, likeCommentResponse]);

  if(!post) {
    return <div></div>
  }

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
              <Typography variant="subtitle2" gutterBottom sx={{display: 'flex'}}>
                <Avatar alt={post.user?.name} src={post.user?.image? `${process.env.REACT_APP_API_URL}/${post.user?.image}`:''} />
                <span style={{marginLeft: '10px', textAlign: 'center', paddingTop:'10px'}}>{post.user?.name}</span>
              </Typography>
            </Grid>
            <Main auth={auth} post={post} user={user} first={first} likePostFunc={likePostFunc}/>
            <Comments user={user} auth={auth} setFirst={setFirst} loadindMoreComment={loadindMoreComment} likeCommentFunc={likeCommentFunc} first={first}/>
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