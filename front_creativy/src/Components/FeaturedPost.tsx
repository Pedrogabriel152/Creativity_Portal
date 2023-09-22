// Mui material
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

// Utils
import { dateFormater } from '../Utils/functions';

interface FeaturedPostProps {
  post: {
    id: number
    title: string
    subtitle: string
    like: number
    image: string
    created_at: string
  };
}

export default function FeaturedPost(props: FeaturedPostProps) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href={`/post/${post.id}`}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {dateFormater(post.created_at)}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.subtitle.substring(0,150)}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue lendo...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image? `${process.env.REACT_APP_API_URL}${post.image}` : ''}
            alt={post.title}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}