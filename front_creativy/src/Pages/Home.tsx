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
import { sections } from '../Utils/variable';
import { useGetFeaturedPosts, useGetMainPost } from '../GraphQL/Hooks/postHooks';
import { useReactiveVar } from '@apollo/client';
import { getFeaturedPostsVar, getMainPostVar } from '../GraphQL/States/postState';

const Home = () => {
  useGetMainPost();
  useGetFeaturedPosts();
  const mainPost = useReactiveVar(getMainPostVar);
  const featuredPosts = useReactiveVar(getFeaturedPostsVar);

    const mainFeaturedPost = {
        title: 'Teste post',
        description:
          "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
        image: 'https://source.unsplash.com/random?wallpapers',
        imageText: 'main image description',
        linkText: 'Continue reading…',
    };
    
    // const featuredPosts = [
    //     {
    //       title: 'Featured post',
    //       date: 'Nov 12',
    //       description:
    //         'This is a wider card with supporting text below as a natural lead-in to additional content.',
    //       image: 'https://source.unsplash.com/random?wallpapers',
    //       imageLabel: 'Image Text',
    //     },
    //     {
    //       title: 'Post title',
    //       date: 'Nov 11',
    //       description:
    //         'This is a wider card with supporting text below as a natural lead-in to additional content.',
    //       image: 'https://source.unsplash.com/random?wallpapers',
    //       imageLabel: 'Image Text',
    //     },
    // ];

    if(!mainPost || !featuredPosts)  {
      return <div></div>
    }
    
    // TODO remove, this demo shouldn't need to reset the theme.
    const defaultTheme = createTheme();
    console.log(featuredPosts)

    return (
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container maxWidth="lg">
            <Header title="Creativy Portal" sections={sections} />
            <main>
            <MainFeaturedPost image={mainPost.image} subtitle={mainPost.subtitle} title={mainPost.title} />
            <Grid container spacing={4}>
                {featuredPosts.map(post => (
                <FeaturedPost key={post.title} post={post} />
                ))}
            </Grid>
            {/* <Grid container spacing={5} sx={{ mt: 3 }}>
                <Main title="From the firehose" posts={posts} />
                <Sidebar
                title={sidebar.title}
                description={sidebar.description}
                archives={sidebar.archives}
                social={sidebar.social}
                />
            </Grid> */}
            </main>
        </Container>
        <Footer
            title="Mais informações"
            description="Something here to give the footer a purpose!"
        />
        </ThemeProvider>
    );
}

export default Home;