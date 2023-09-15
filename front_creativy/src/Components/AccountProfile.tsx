import { useState } from 'react';

// Mui Material
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';

// Utils
import { dateFormater } from '../Utils/functions';

// Styles
import { VisuallyHiddenInput } from '../Styles/VisuallyHiddenInput';

// Interfaces
import { IUser } from '../interfaces/IUser';

interface IAccount {
    user: IUser
    setUser: (user: IUser) => void
}

export const AccountProfile = ({user, setUser}: IAccount) => {
    const [image, setImage] = useState<any>('');

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type=== 'image/png') {
                setImage(image);
                setUser({
                    ...user,
                    image: image
                })
            }
            else{
                alert("Mande uma imagem do tipo PNG ou JPEG");
                setImage(null);
                return;
            } 
        }
    }

    return (
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
                src={image? URL.createObjectURL(image) : user.image? `${process.env.REACT_APP_API_URL}${user.image}` : ''}
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
            component="label"
                fullWidth
                variant="text"        
            >
                Alterar Imagem
                <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFile} multiple/>
            </Button>
            </CardActions>
        </Card>
    );
}
  