import { useEffect, useState } from 'react';

// Mui Material
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import MessageIcon from '@mui/icons-material/Message';
import Button from '@mui/material/Button';
import { Card } from '@mui/material';

// intertfades
import { IPost } from '../interfaces/IPost';
import { IAuth } from '../interfaces/IAuth';

// GraphQL
import { useGetPost } from '../GraphQL/Hooks/postHooks';
import { useReactiveVar } from '@apollo/client';
import { getPostVar } from '../GraphQL/States/postState';

interface IMain {
  post: IPost
  user: number
  auth: IAuth
  first: number
  likePostFunc: (id: number) => void
  handleFocus: () => void
}

export default function Main({post, user, auth, first, likePostFunc, handleFocus}: IMain) {
  const userPost = post.user_post?.filter(user => user.user_id === auth.user_id);
  useGetPost(post.id, first);
  const postUpdate = useReactiveVar(getPostVar);
  const [like, setLike] = useState<boolean>(false);

  useEffect(() => {
    if(postUpdate?.user_post?.filter(user => user.user_id == auth.user_id).length === 1 && postUpdate?.user_post?.filter(user => user.user_id == auth.user_id)[0].user_id == user) setLike(true); else setLike(false)
  }, [postUpdate]);

  const updateLike = () => setLike(!like);

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
      <Typography variant="subtitle1" gutterBottom marginBottom={5}>
        {post.subtitle}
      </Typography>
      <Card sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          sx={{ width: 750, display: { xs: 'none', sm: 'block' } }}
          image={post.image? `${process.env.REACT_APP_API_URL}${post.image}` : ''}
          alt={post.title}
        />
      </Card>
      <Button variant="outlined" startIcon={like ?  <FavoriteIcon /> : <FavoriteBorderIcon />} style={{marginTop: '8px'}} onClick={() => {likePostFunc(post.id); updateLike();}} />
       <Button variant="outlined" startIcon={ <MessageIcon />} style={{marginTop: '8px', marginLeft: '10px'}} onClick={handleFocus}/>
    </Grid>
  );
}