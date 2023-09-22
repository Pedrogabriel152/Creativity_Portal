import { Fragment } from 'react';

// Mui Material
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase } from '@mui/material';

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

export default function Header(props: HeaderProps) {
  const { sections, title } = props;

  return (
    <Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 3 }}>
        <Box>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Buscar usuário"
            inputProps={{ 'aria-label': 'Buscar usuário' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
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
    </Fragment>
  );
}