import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import { IUser } from '../interfaces/IUser';
import { dateFormater } from '../Utils/functions';
  
const user = {
avatar: '/assets/avatars/avatar-anika-visser.png',
city: 'Los Angeles',
country: 'USA',
jobTitle: 'Senior Developer',
name: 'Anika Visser',
timezone: 'GTM-7'
};

interface IAccount {
    user: IUser
}

export const AccountProfile = ({user}: IAccount) => (
<Card>
    <CardContent>
    <Box
        sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
        }}
    >
        <Avatar
        src={user.image}
        sx={{
            height: 80,
            mb: 2,
            width: 80
        }}
        />
        <Typography
        gutterBottom
        variant="h5"
        >
        {user.name}
        </Typography>
        <Typography
        color="text.secondary"
        variant="body2"
        >
        {user.email}
        </Typography>
        <Typography
        color="text.secondary"
        variant="body2"
        >
        {dateFormater(user.created_at, "numerica")}
        </Typography>
    </Box>
    </CardContent>
    <Divider />
    <CardActions>
    <Button
        fullWidth
        variant="text"
    >
        Alterar imagem
    </Button>
    </CardActions>
</Card>
);
  