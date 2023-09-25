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

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

export default function Header(props: HeaderProps) {
  const { sections, title } = props;
  const [name, setName] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()));

  return (
    <Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 3 }}>
        <Box>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Buscar usuário"
            value={name}
            onChange={handleChange}
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
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
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