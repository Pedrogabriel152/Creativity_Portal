import { ChangeEvent, Fragment, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mui Material
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase, Modal, Paper } from '@mui/material';

// Components
import SearchUsers from './SearchUsers';

// Utils
import { removeLocalStorage } from '../Utils/functions';

// Interfaces
import { IUser } from '../interfaces/IUser';

interface HeaderProps {
  user: IUser
  title: string;
}

export default function Header(props: HeaderProps) {
  const { user, title } = props;
  const [name, setName] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleClose = () => setOpen(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value);

  const handleLogout = () => {
    removeLocalStorage();
    navigate('/login');
  }

  return (
    <Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 3 }}>
        <Box>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Buscar usuário"
            value={name}
            onChange={handleChange}
            onClick={handleOpen}
            inputRef={inputRef}
            inputProps={{ 'aria-label': 'Buscar usuário' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleOpen}>
            <SearchIcon />
          </IconButton>
        </Box>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <Link
          color="inherit"
          noWrap
          key={'Home'}
          variant="body2"
          href={'/'}
          sx={{ p: 1, flexShrink: 0 }}
        >
          Home
        </Link>
        <Link
          color="inherit"
          noWrap
          key={'Meus Posts'}
          variant="body2"
          href={'/my-posts'}
          sx={{ p: 1, flexShrink: 0 }}
        >
          Meus Posts
        </Link>
        <Link
          color="inherit"
          noWrap
          key={'Perfil'}
          variant="body2"
          href={`/user/${user.id}`}
          sx={{ p: 1, flexShrink: 0 }}
        >
          Perfil
        </Link>
        <IconButton>
          <NotificationsNoneIcon />
        </IconButton>
        <Button variant="outlined" size="small" onClick={handleLogout}>
          Sair
        </Button>
      </Toolbar>

      {open && (
        <Paper 
          elevation={0}
          sx={{ width: '30%', height: '60%', marginTop: '-20px', position: 'absolute', zIndex: 99 }}
        >
          <SearchUsers name={name} closeOpen={handleClose}/>
        </Paper>
      )}
    </Fragment>
  );
}