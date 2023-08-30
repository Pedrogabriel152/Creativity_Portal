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
import { post1, post2, post3 } from '../Posts/posts';
import { useParams } from 'react-router-dom';
import { useGetPost } from '../GraphQL/Hooks/postHooks';
import { useReactiveVar } from '@apollo/client';
import { getPostVar } from '../GraphQL/States/postState';
import { Avatar, Typography } from '@mui/material';
import { sections } from '../Utils/variable';

const posts = [post1, post2, post3];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Post() {
  const {id} = useParams();
  useGetPost(id? parseInt(id) : 0);
  const post = useReactiveVar(getPostVar);

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
              <Typography variant="subtitle2" gutterBottom>
                <Avatar alt={post.user?.name} src={post.user?.image? `${process.env.REACT_APP_API_URL}/${post.user?.image}`:''} />
                <span>{post.user?.name}</span>
              </Typography>
            </Grid>
            <Main title={post.title} created_at={post.created_at} id={post.id} image={post.image} like={post.like} subtitle={post.subtitle} user={post.user} user_post={post.user_post} comment={post.comment} />
            <Sidebar 
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
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