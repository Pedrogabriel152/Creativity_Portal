import { ChangeEvent, Fragment, useState } from 'react';

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
import SearchUsers from './SearchUsers';
import { IUser } from '../interfaces/IUser';

interface HeaderProps {
  user: IUser
  title: string;
}

export default function Header(props: HeaderProps) {
  const { user, title } = props;
  const [name, setName] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [autoFoco, setAutoFoco] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
    setAutoFoco(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAutoFoco(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()));

  return (
    <Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 3 }}>
        <Box>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Buscar usuário"
            value={name}
            autoFocus={autoFoco}
            onChange={handleChange}
            onClick={handleOpen}
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
        <Button variant="outlined" size="small">
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