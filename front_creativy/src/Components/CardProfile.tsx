import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Button, CardActionArea, IconButton, Stack } from '@mui/material';
import { IUser } from '../interfaces/IUser';
import EditIcon from '@mui/icons-material/Edit';
import { VisuallyHiddenInput } from '../Styles/VisuallyHiddenInput';
import { useState } from 'react';

interface ICardProfile {
  user: IUser
  handleOpen: () => void
}

export default function CardProfile({user, handleOpen}: ICardProfile) {
  
  return (
    <Card sx={{ width: '100%' }}>
      <CardContent sx={{ width: '100%' }}>
        <Stack direction="column" sx={{textAlign: 'center', alignItems: 'center', width: '100%'}}>
          <CardMedia
            component="img"
            height="300"
            image={user.cover_image? `${process.env.REACT_APP_API_URL}${user.cover_image}` : '/padrao.jpeg'}
            alt={user.name}
          />
          <Avatar src={`${process.env.REACT_APP_API_URL}${user.image}`} alt={user.name} sx={{ width: 150, height: 150, position: 'relative', top: '-75px', fontSize: '3em' }}/>
          <Typography gutterBottom variant="h5" component="div" sx={{ padding: '0px', marginTop: -6}}>
            {user.name}
          </Typography>
          <Button component="label" variant="text" startIcon={<EditIcon />} size='small' onClick={handleOpen}>
            Editar perfil
            <VisuallyHiddenInput type="button" />
          </Button>
        </Stack>
    </CardContent>
    </Card>
  );
}