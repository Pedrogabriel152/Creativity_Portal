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
import { sections } from '../Utils/variable';
import { useGetFeaturedPosts, useGetMainPost } from '../GraphQL/Hooks/postHooks';
import { useReactiveVar } from '@apollo/client';
import { getFeaturedPostsVar, getMainPostVar } from '../GraphQL/States/postState';
import { IPost } from '../interfaces/IPost';
import { CircularProgress, IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useEffect, useState } from 'react';

const Home = () => {
    const [first, setFirst] = useState<number>(6);
    useGetMainPost();
    const {loading: loadindMorePosts} = useGetFeaturedPosts(first);
    const mainPost = useReactiveVar(getMainPostVar);
    const featuredPosts = useReactiveVar(getFeaturedPostsVar);

    useEffect(() => {},[first]); 

    const morePosts = () => {if(featuredPosts?.paginatorInfo.hasMorePages) setFirst(featuredPosts?.paginatorInfo.count+6);}

    if(!mainPost || !featuredPosts)  {
      return <div></div>
    }
    
    // TODO remove, this demo shouldn't need to reset the theme.
    const defaultTheme = createTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container maxWidth="lg">
            <Header title="Creativy Portal" sections={sections} />
            <main>
            <MainFeaturedPost image={mainPost.image} subtitle={mainPost.subtitle} title={mainPost.title} id={mainPost.id}/>
            <Grid container spacing={4}>
                {featuredPosts.data.map((post: IPost) => (
                <FeaturedPost key={post.id} post={post} />
                ))}
            </Grid>
            {loadindMorePosts 
                ?<CircularProgress disableShrink style={{margin: '0 auto', marginLeft: '48%', marginTop: '15px'}} size={25}/>
                :<IconButton aria-label="load" size='large' style={{margin: '0 auto', marginLeft: '48%', marginTop: '15px'}} onClick={morePosts}>
                    <ReplayIcon fontSize="inherit"/>
                </IconButton>
            }
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