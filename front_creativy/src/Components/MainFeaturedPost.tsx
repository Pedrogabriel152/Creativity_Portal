import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { IMainFeatured } from '../interfaces/IMainFeatured';

export default function MainFeaturedPost(mainPost: IMainFeatured) {
  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: mainPost.image? `url(${process.env.REACT_APP_API_URL}/${mainPost.image})` : '',
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={mainPost.image? mainPost.image : ''} alt={mainPost.title} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {mainPost.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {mainPost.subtitle.substring(0,150)}
            </Typography>
            <Link variant="subtitle1" href={`/post/${mainPost.id}`}>
              Continue Lendo...
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}