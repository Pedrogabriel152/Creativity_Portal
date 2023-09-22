import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, ListItemIcon, ListItemText, Modal, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ConfirmeModal from './ConfirmeModal';
import { styleModal } from '../Styles/StyleModal';
import { StyledTextarea } from '../Styles/TextArea';
import ModalComment from './ModalComment';
import { IComment } from '../interfaces/IComment';
import { useUpdateComment } from '../GraphQL/Hooks/commentHooks';
import { ICommentInput } from '../interfaces/ICommentInput';

const ITEM_HEIGHT = 48;

interface IToogleMenu{
  comment: IComment
  post_id: number
  first: number
}

export default function ToogleMenu({comment, first, post_id}: IToogleMenu) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openModalConfirm, setOpenModalConfirm] = React.useState<boolean>(false);
  const [updateComment] = useUpdateComment(post_id, first);
  const [text, setText] = React.useState<string>(comment.text);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    handleClose();
    setOpenModal(true)
  };
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenModalConfirm = () => {
    handleClose();
    setOpenModalConfirm(true)
  };
  const handleCloseModalConfirm = () => setOpenModalConfirm(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newComment: ICommentInput = {
      text: text,
      post_id: post_id,
    };

    updateComment({
      variables: {
        id: comment.id,
        post_id: post_id,
        comment: newComment,
        first: first
      },
    });

    handleCloseModal();
  }

  const handleTextAreaOnChange = (event:  React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        
        <MenuItem  onClick={handleOpenModal} color='#000'>
            <ListItemIcon color='#000'>
                <EditNoteIcon fontSize="small" sx={{ marginRight: 1 }} color='info'/>
                <ListItemText color='#000'>Editar</ListItemText>
            </ListItemIcon>
        </MenuItem>
        <MenuItem  onClick={handleOpenModalConfirm}>
            <ListItemIcon color='#000'>
                <DeleteIcon fontSize="small" sx={{ marginRight: 1 }} color='error'/>
                <ListItemText color='#000'>Excluir</ListItemText>
            </ListItemIcon>
        </MenuItem>
      </Menu>

      <ModalComment 
        comment={comment} 
        handleCloseModal={handleCloseModal} 
        handleSubmit={handleSubmit} 
        handleTextAreaOnChange={handleTextAreaOnChange} 
        openModal={openModal}
        text={text}
      />

      <Modal keepMounted 
        open={openModalConfirm}
        onClose={handleCloseModalConfirm}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <ConfirmeModal text='Deseja excluir o comentário' handleClose={handleCloseModalConfirm} handleClick={() => {}}/>

      </Modal>
    </div>
  );
}