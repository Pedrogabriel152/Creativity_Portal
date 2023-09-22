import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Material UI
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { CircularProgress, Grid, IconButton, Link, ListItemButton, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

// Icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteIcon from '@mui/icons-material/Favorite';

// GraphQL
import { useReactiveVar } from '@apollo/client';
import { getCommentsVar, updatedCommentsVar } from '../GraphQL/States/commentState';
import { useCreateComment, useGetComments } from '../GraphQL/Hooks/commentHooks';

// Interface 
import { IComment } from "../interfaces/IComment";
import { IAuth } from '../interfaces/IAuth';
import { ICommentInput } from '../interfaces/ICommentInput';
import { toast } from 'react-toastify';
import ToogleMenu from './ToogleMenu';

interface IComments {
  user: number
  auth: IAuth
  setFirst: (newFirst: number) => void
  loadindMoreComment: boolean
  likeCommentFunc: (id: number, post_id: number) => void
  first: number
  update: boolean
}

export default function Comments({ user, auth, loadindMoreComment, setFirst, likeCommentFunc, first, update}: IComments) {
  const {id} = useParams();
  const [text, setText] = useState<string>('');
  const {error} = useGetComments(id? parseInt(id) : 0, first);
  const [like, setLike] = useState<any[]>([]);
  const [createComment, {loading: loadingCreate}] = useCreateComment(id? parseInt(id) : 0, first);
  const comments = useReactiveVar(getCommentsVar);
  const updatedComments = useReactiveVar(updatedCommentsVar);
  const navigate = useNavigate();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const moreComments = () => {
    if(comments?.paginatorInfo?.hasMorePages || updatedComments?.paginatorInfo?.hasMorePages) setFirst(updatedComments?.paginatorInfo?.count? updatedComments?.paginatorInfo?.count+8 : comments?.paginatorInfo?.count? comments?.paginatorInfo?.count+8 : first);
  }

  useEffect(() => {
    if(error) {
      navigate('/login');
      toast.error('Entre na plataflorma primeiro');
    }
  }, [error]);

  useEffect(() => {
    const likes: any[] = [];
    if(updatedComments) {
      updatedComments?.comments?.map((comment: IComment, index: number) => {
        if(comment.user_comments?.filter(user => user.user_id == auth.user_id).length === 1 && comment.user_comments?.filter(user => user.user_id == auth.user_id)[0].user_id == user) {
          likes[index] = comment;
        }
      });
      setLike(likes);
      if(updatedComments.code !== 200) toast.error(updatedComments.message);
      if(updatedComments.code === 200) toast.success(updatedComments.message);

      return;
    }
    comments?.data?.map((comment: IComment, index: number) => {
      if(comment.user_comments?.filter(user => user.user_id == auth.user_id).length === 1 && comment.user_comments?.filter(user => user.user_id == auth.user_id)[0].user_id == user) {
        likes[index] = comment;
      }
    });
    setLike(likes);
  }, [comments, updatedComments]);

  const handleOpen = () => setOpenEdit(true);
  const handleClose = () => setOpenEdit(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newComment: ICommentInput = {
      text: `${data.get('text')}`,
      post_id: id? parseInt(id) : 0,
    };

    createComment({
      variables: {
        comment: newComment,
        first: first
      },
    });
    setText('');
  }

  const updateLike = (comment: IComment, indexNum: number, user: number) => {
    if((comment.user_comments?.filter(user => user.user_id == auth.user_id).length === 1 && comment.user_comments?.filter(user => user.user_id == auth.user_id)[0].user_id != user) || indexNum in like) {
      const likes:any[] = [];
      like.map((item, index) => {
        if(index != indexNum) {
          likes[index] = item;
        }
      });
      setLike(likes);
      return;
    }
    const likes = like;
    likes[indexNum] = comment;
    setLike(likes);
  }

  return (
    <Grid item xs={12} md={4}>
      <Box sx={{ pb: 7, height: 800, marginBottom: 8}} component="div">
        <CssBaseline /> 
        <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100' }}>
          <List sx={{height: 610, overflow: 'auto', }}>
            {updatedComments?.comments && update ? (
              updatedComments.comments?.map((comment: IComment, index: number) => (
                <ListItem key={index} sx={{cursor: 'default'}}>
                <ListItemAvatar>
                  <Link sx={{textDecoration: 'none', color: '#000'}} href={`/user/${comment.user_id}`}>
                    <Avatar alt="Profile Picture" src={comment.user.image? `${process.env.REACT_APP_API_URL}${comment.user.image}` : ''} />
                  </Link>
                  </ListItemAvatar>    
                <ListItemText primary={comment.user.name} secondary={comment.text} sx={{width: 500}} />
                
                <ListItemButton sx={{paddingLeft: 3, '&:hover': {background: 'transparent', cursor: 'pointer'}}} autoFocus={false} onClick={() => {likeCommentFunc(comment.id, comment.post_id); updateLike(comment, index, user)}}>
                  {like[index] 
                    ? <FavoriteIcon color="error"/> 
                    : <FavoriteBorderIcon color="error"/>     
                  }
                </ListItemButton>
                {comment?.user_id == parseInt(id? id : '0') && (
                  <>
                  <ToogleMenu comment={comment} first={first} post_id={comment.post_id}/>
                  </>
                )}
              </ListItem>
              ))
            ) : (
              comments?.data?.map((comment: IComment, index) => (
                <ListItem key={index} sx={{cursor: 'default'}}>
                  <ListItemAvatar>
                  <Link sx={{textDecoration: 'none', color: '#000'}} href={`/user/${comment.user_id}`}>
                    <Avatar alt="Profile Picture" src={comment.user.image? `${process.env.REACT_APP_API_URL}${comment.user.image}` : ''} />
                  </Link>
                  </ListItemAvatar>
                  <ListItemText primary={comment.user.name} secondary={comment.text} sx={{width: 500}} />
                  <ListItemButton sx={{paddingLeft: 3, '&:hover': {background: 'transparent', cursor: 'pointer'}}} autoFocus={false} onClick={() => {likeCommentFunc(comment.id, comment.post_id); updateLike(comment, index, user)}}>
                    {like[index] 
                      ? <FavoriteIcon color="error"/> 
                      : <FavoriteBorderIcon color="error"/>     
                    }
                  </ListItemButton>
                  {comment?.user_id == parseInt(id? id : '0') && (
                    <>
                    <ToogleMenu comment={comment} first={first} post_id={comment.post_id}/>
                    </>
                  )}
                </ListItem>
              ))
            )}
          </List>
          {comments?.paginatorInfo?.hasMorePages
            ? !loadindMoreComment
              ?<IconButton aria-label="load" size='large' style={{margin: '0 auto', marginLeft: '48%', marginTop: '15px'}} onClick={moreComments}>
                  <ReplayIcon fontSize="inherit"/>
              </IconButton>
              : <CircularProgress disableShrink style={{margin: '0 auto', marginLeft: '48%', marginTop: '15px'}} size={25}/>
          : updatedComments?.paginatorInfo?.hasMorePages && update
          ? !loadindMoreComment
            ?<IconButton aria-label="load" size='large' style={{margin: '0 auto', marginLeft: '48%', marginTop: '15px'}} onClick={moreComments}>
                <ReplayIcon fontSize="inherit"/>
            </IconButton>
            : <CircularProgress disableShrink style={{margin: '0 auto', marginLeft: '48%', marginTop: '15px'}} size={25}/>
          : <div></div>
        }
        </Paper>
        <Paper elevation={1} sx={{ p: 2, marginTop:1 }}>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: 345, display: 'flex', height: 80, paddingLeft: 1, justifyContent: 'space-between'}}>
            <TextField
              margin="dense"
              required
              fullWidth
              id="text"
              name="text"
              autoComplete="text"
              autoFocus
              onChange={handleChange}
              value={text}
              sx={{height: 50}}
            />
            <button type="submit" style={{border: 'none', background: 'transparent'}}>
              <ListItemButton sx={{paddingLeft: 3, '&:hover': {background: 'transparent'}}} autoFocus={false}>
                <SendIcon color="primary"/>
              </ListItemButton>
            </button>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
}
