import { useEffect, useState } from 'react';

// Mui Material
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress, IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

// Components
import Header from '../Components/Header';
import MainFeaturedPost from '../Components/MainFeaturedPost';
import FeaturedPost from '../Components/FeaturedPost';
import Footer from '../Components/Footer';

// Utils
import { sections } from '../Utils/variable';

// GraphQL
import { useGetFeaturedPosts, useGetMainPost } from '../GraphQL/Hooks/postHooks';
import { useReactiveVar } from '@apollo/client';
import { getFeaturedPostsVar, getMainPostVar } from '../GraphQL/States/postState';

// Interfaces
import { IPost } from '../interfaces/IPost';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Home = () => {
    const [first, setFirst] = useState<number>(6);
    useGetMainPost();
    const {loading: loadindMorePosts, error, } = useGetFeaturedPosts(first);
    const mainPost = useReactiveVar(getMainPostVar);
    const featuredPosts = useReactiveVar(getFeaturedPostsVar);
    const navigate = useNavigate();

    useEffect(() => {
        if(error){
            navigate('/login');
            toast.error('Entre na plataforma primeiro!');
        }
    },[first, error]); 

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
            {featuredPosts?.paginatorInfo?.hasMorePages?
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
        </ThemeProvider>
    );
}

export default Home;