import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/Pedrogabriel152/Creativity_Portal">
          Pedro Gabriel
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}