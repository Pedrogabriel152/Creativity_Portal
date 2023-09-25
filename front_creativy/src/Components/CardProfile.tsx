import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea } from '@mui/material';
import { IUser } from '../interfaces/IUser';

interface ICardProfile {
  user: IUser
}

export default function CardProfile({user}: ICardProfile) {
  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <CardMedia
          component="img"
          height="300"
          image={`${process.env.REACT_APP_API_URL}${user.cover_image}`}
          alt={user.name}
        />
        <Avatar src={`${process.env.REACT_APP_API_URL}${user.image}`} alt={user.name}/>
        <Typography gutterBottom variant="h5" component="div">
          {user.name}
        </Typography>
    </CardContent>
    </Card>
  );
}