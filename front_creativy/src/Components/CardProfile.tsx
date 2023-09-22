import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ICardProfile } from '../interfaces/ICardProfile';

export default function CardProfile({user}: ICardProfile) {
  return (
    <Card sx={{ width: '100%' }}>
        <CardMedia
          component="img"
          height="140"
          image={user.cover_image? `${process.env.REACT_APP_API_URL}${user.cover_image}` : ''}
          alt={user.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.name}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
    </Card>
  );
}