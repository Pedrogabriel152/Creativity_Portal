import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import MessageIcon from '@mui/icons-material/Message';

// intertfades
import { IPost } from '../interfaces/IPost';
import Button from '@mui/material/Button';
import { Card } from '@mui/material';
import { useAuthContext } from '../Context/AuthContext';
import { useEffect, useState } from 'react';
import { api } from '../Utils/Api';

export default function Main(post: IPost) {
  const { getLocalStorage } = useAuthContext();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    api.defaults.headers.Authorization = `Bearer ${auth?.token}`;
    api.get('api/user', {
      headers: {
          Authorization: `Bearer ${auth?.token}`
      }
    }).then(response => setUser(response.data.id));
  }, [])
  const auth = getLocalStorage();

  const userPost = post.user_post?.filter(user => user.user_id === auth.user_id)

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
      <Card sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          sx={{ width: 750, display: { xs: 'none', sm: 'block' } }}
          image={post.image? `${process.env.REACT_APP_API_URL}/${post.image}` : ''}
          alt={post.title}
        />
      </Card>
      <Button variant="outlined" startIcon={userPost?.length === 1? userPost[0].user_id === user ?  <FavoriteIcon /> : <FavoriteBorderIcon /> : <FavoriteBorderIcon />} style={{marginTop: '8px'}}>
        {post.like}
      </Button>
      <Button variant="outlined" startIcon={ <MessageIcon />} style={{marginTop: '8px', marginLeft: '10px'}}>
        {post.comment}
      </Button>
      <Button variant="outlined" startIcon={<SendIcon />} style={{marginTop: '8px', marginLeft: '10px'}}>
        Compartilhar
      </Button>
    </Grid>
  );
}