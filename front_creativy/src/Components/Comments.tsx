// Material UI
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { CircularProgress, Grid, IconButton, ListItemButton, TextField } from "@mui/material";

// Icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteIcon from '@mui/icons-material/Favorite';

// GraphQL
import { useReactiveVar } from '@apollo/client';
import { getCommentsVar } from '../GraphQL/States/commentState';

// Interface 
import { IComment } from "../interfaces/IComment";
import { IAuth } from '../interfaces/IAuth';

interface IComments {
  user: number
  auth: IAuth
  setFirst: (newFirst: number) => void,
  loadindMoreComment: boolean
}

export default function Comments({ user, auth, loadindMoreComment, setFirst}: IComments) {
  const comments = useReactiveVar(getCommentsVar);
  const moreComments = () => {if(comments?.paginatorInfo?.hasMorePages) setFirst(comments?.paginatorInfo.count+10);}
  return (
    <Grid item xs={12} md={4}>
      <Box sx={{ pb: 7, height: 800, marginBottom: 8}} component="div">
        <CssBaseline /> 
        <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100' }}>
          <List sx={{height: 610, overflow: 'auto', }}>
            {comments?.data?.map((comment: IComment, index) => (
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
          {comments?.paginatorInfo?.hasMorePages 
            ? !loadindMoreComment
              ?<IconButton aria-label="load" size='large' style={{margin: '0 auto', marginLeft: '48%', marginTop: '15px'}} onClick={moreComments}>
                  <ReplayIcon fontSize="inherit"/>
              </IconButton>
              : <CircularProgress disableShrink style={{margin: '0 auto', marginLeft: '48%', marginTop: '15px'}} size={25}/>
          : <div></div>
        }
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