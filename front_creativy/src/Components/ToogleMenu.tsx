import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ListItemIcon, ListItemText, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ConfirmeModal from './ConfirmeModal';

const options = [
  'Editar',
  'Excluir',
];

const ITEM_HEIGHT = 48;

export default function ToogleMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
        <MenuItem  onClick={handleClose}>
            <ListItemIcon color='#000'>
                <DeleteIcon fontSize="small" sx={{ marginRight: 1 }} color='error'/>
                <ListItemText color='#000'>Excluir</ListItemText>
            </ListItemIcon>
        </MenuItem>
      </Menu>

      <Modal keepMounted 
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        {/* <ConfirmeModal text='Deseja excluir o post' handleClick={handleDeletePost} handleClose={handleCloseDelete}/> */}
        <h1>Teste</h1>
      </Modal>
    </div>
  );
}