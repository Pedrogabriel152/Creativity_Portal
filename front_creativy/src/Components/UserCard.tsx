import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea } from '@mui/material';
import { IUser } from '../interfaces/IUser';

interface IUserCard {
    user: IUser
}

export default function UserCard({user}: IUserCard) {
    return(
        <CardActionArea href={`/user/${user.id}`}>
        <Card sx={{ width: '100%', height: '80px', marginTop: '8px' }}>       
            <CardContent sx={{display: 'flex'}}>
                <Avatar alt='testpo' src={`${process.env.REACT_APP_API_URL}${user.image}`}/>
                <Typography gutterBottom variant="h5" component="div" fontSize='1.2em' sx={{marginLeft: '8px', marginTop: '3%'}}>
                    {user.name}
                </Typography>
            </CardContent>
        </Card>
        </CardActionArea>
    );
}