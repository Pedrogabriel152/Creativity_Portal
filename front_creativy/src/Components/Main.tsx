import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// intertfades
import { IPost } from '../interfaces/IPost';

export default function Main(post: IPost) {
  console.log(post)
  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {post.title}
      </Typography>
      <Divider />
      <Typography variant="subtitle1" gutterBottom>
        {post.subtitle}
      </Typography>
    </Grid>
  );
}