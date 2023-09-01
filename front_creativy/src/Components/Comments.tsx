import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { Grid, ListItemButton, TextField } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import { IComment } from "../interfaces/IComment";
import { useAuthContext } from '../Context/AuthContext';
import { useEffect, useState } from 'react';
import { api } from '../Utils/Api';
import { IAuth } from '../interfaces/IAuth';

interface IComments {
  comments: IComment[]
  user: number
  auth: IAuth
}

export default function Comments({comments, user, auth}: IComments) {
  const { getLocalStorage } = useAuthContext();
  
  return (
    <Grid item xs={12} md={4}>
      <Box sx={{ pb: 7, height: 800, marginBottom: 8}} component="div">
        <CssBaseline /> 
        <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100' }}>
          <List sx={{height: 610, overflow: 'auto', }}>
            {comments.map((comment: IComment, index) => (
              <ListItem key={index} sx={{cursor: 'default'}}>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={comment.user.image? `${process.env.REACT_APP_API_URL}/${comment.user.image}` : ''} />
                </ListItemAvatar>
                <ListItemText primary={comment.user.name} secondary={comment.text} sx={{width: 500}} />
                <ListItemButton sx={{paddingLeft: 3, '&:hover': {background: 'transparent', cursor: 'pointer'}}} autoFocus={false}>
                  {comment.user_comments?.filter(user => user.user_id == auth.user_id).length === 1? comment.user_comments[0].user_id == user
                    ? <FavoriteIcon color="error"/> 
                    : <FavoriteBorderIcon color="error"/> 
                    : <FavoriteBorderIcon color="error"/> 
                  }
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
        <Paper elevation={1} sx={{ p: 2, marginTop:1 }}>
          <Box component="form" onSubmit={() => {}} noValidate sx={{ mt: 1, width: 345, display: 'flex', height: 80, paddingLeft: 1, justifyContent: 'space-between'}}>
            <TextField
              margin="dense"
              required
              fullWidth
              id="text"
              name="text"
              autoComplete="text"
              autoFocus
              sx={{height: 50}}
            />
            <ListItemButton sx={{paddingLeft: 3, '&:hover': {background: 'transparent'}}} autoFocus={false}>
              <SendIcon color="primary"/>
            </ListItemButton>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
}