import { Avatar, Box, Button, CardActions, CardMedia, Divider, Grid, IconButton, ImageListItem, TextField, Typography } from "@mui/material";
import { styleModal } from "../Styles/StyleModal";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/IUser";
import { VisuallyHiddenInput } from "../Styles/VisuallyHiddenInput";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useUpdateUSer } from "../GraphQL/Hooks/userHook";
import { useReactiveVar } from "@apollo/client";
import { updateUserVar } from "../GraphQL/States/userSatate";

interface IUserEditModal {
    user: IUser
    handleClose: () => void
}

export default function UserEditModal({user, handleClose}: IUserEditModal) {
    const [image, setImage] = useState<any>('');
    const [coverImage, setCoverImage] = useState<any>('');
    const [updateUser, setUpdateUser] = useState<IUser>(user);
    const navigate = useNavigate();
    const [ editUser ] = useUpdateUSer(user.id);
    const updateUserResponse = useReactiveVar(updateUserVar);

  useEffect(() => {
    if(updateUserResponse) {
        if(updateUserResponse?.code === 200) {
            toast.success(updateUserResponse.message);
            handleReset();
        }
      if(updateUserResponse?.code !== 200) toast.error(updateUserResponse.message);
    }
  }, [updateUserResponse]);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type=== 'image/png') {
                if(e.target.name == 'image') setImage(image);
                if(e.target.name == 'cover_image') setCoverImage(image);
                setUpdateUser({
                    ...updateUser,
                    [e.target.name]: image
                })
            }
            else{
                alert("Mande uma imagem do tipo PNG ou JPEG");
                setImage(null);
                return;
            } 
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if(!updateUser.name) return toast.error('O campo nome é obrigatório');
    
        if(!updateUser.email) return toast.error('O campo email é obrigatório');
    
        if(updateUser.password) {
          if(!updateUser.confirmPassword) return toast.error('A confirmação da senha é obrigatório');
    
          if(updateUser.password !== updateUser.confirmPassword) return toast.error('As senhas precisam iguais');
        }
    
        if(typeof updateUser.image === 'string') {
            if(typeof updateUser.cover_image === 'string'){
                editUser({
                    variables: {
                      user: {
                        name: updateUser.name,
                        email: updateUser.email,
                        password: updateUser.password
                      }
                    }
                });
                return;
            }
            editUser({
                variables: {
                  user: {
                    name: updateUser.name,
                    email: updateUser.email,
                    password: updateUser.password,
                    cover_image: updateUser.cover_image
                  }
                }
            });
            return;          
        }

        if(typeof updateUser.cover_image === 'string'){
            editUser({
                variables: {
                  user: {
                    name: updateUser.name,
                    email: updateUser.email,
                    password: updateUser.password,
                    image: image
                  }
                }
            });
            return;
        }
    
        editUser({
          variables: {
            user: {
              name: updateUser.name,
              email: updateUser.email,
              image: updateUser.image,
              cover_image: updateUser.cover_image,
              password: updateUser.password
            }
          }
        });
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUpdateUser({
            ...updateUser,
            [event.target.name]: event.target.value
        })
    };

    const handleReset = () => {
        setImage('');
        setUpdateUser({
            ...user,
            password: '',
            confirmPassword: ''
        });
        setCoverImage('');
        handleClose();
    }

    return(
        <Box
            sx={styleModal}
        >
            <IconButton aria-label="delete" sx={{marginLeft: '95%'}} onClick={handleReset}>
                <CloseIcon color="error"/>
            </IconButton>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <input type="hidden" name="id" value={user.id}/>
                <Typography
                    gutterBottom
                    variant="h5"
                >
                    Foto do perfil
                </Typography>

                <Box component="div" sx={{display: 'flex'}}>
                    <Avatar
                        src={image? URL.createObjectURL(image) : user.image? `${process.env.REACT_APP_API_URL}${user.image}` : ''}
                        sx={{
                            height: 80,
                            mb: 2,
                            width: 80
                        }}
                    />
                    <Button component="label" variant="text" startIcon={<CloudUploadIcon />} size='small' sx={{ marginBottom: 2, marginLeft: 2 }}>
                        Alterar imagem
                        <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFile} multiple name="image"/>
                    </Button>
                </Box>

                <Typography
                    gutterBottom
                    variant="h5"
                >
                    Foto de capa
                </Typography>  

                <Box component="div" sx={{display: 'flex'}}>
                    <ImageListItem sx={{maxHeight: '150px', maxWidth: '200px'}}>
                        <img
                            srcSet={coverImage? URL.createObjectURL(coverImage) : user.cover_image? `${process.env.REACT_APP_API_URL}${user.cover_image}` :  '/padrao.jpeg'}
                            src={coverImage? URL.createObjectURL(coverImage) : user.cover_image? `${process.env.REACT_APP_API_URL}${user.cover_image}` :  '/padrao.jpeg'}
                            alt={user.name}
                            loading="lazy"
                        />
                    </ImageListItem>
                    <Button component="label" variant="text" startIcon={<CloudUploadIcon />} size='small' sx={{ marginBottom: 2, marginLeft: 2 }}>
                        Alterar imagem
                        <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFile} multiple name="cover_image"/>
                    </Button>
                </Box>
                <Divider sx={{display: 'block', marginTop: 3}}/> 
                <Box component="div" sx={{marginTop: 6}}>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            xs={12}
                            md={6}
                            marginBottom={2}
                        >
                            <TextField
                            fullWidth
                            label="Nome"
                            name="name"
                            onChange={handleChange}
                            required
                            value={updateUser.name}
                            />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            onChange={handleChange}
                            required
                            value={updateUser.email}
                            />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                            fullWidth
                            label="Senha"
                            name="password"
                            onChange={handleChange}
                            type="password"
                            value={updateUser.password}
                            />
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                            fullWidth
                            label="Confirme a Senha"
                            name="confirmPassword"
                            onChange={handleChange}
                            type='password'
                            required
                            value={updateUser.confirmPassword}
                            />
                        </Grid>
                    </Grid> 
                </Box>   
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button variant="contained" type='submit'>
                        Salvar
                    </Button>
                </CardActions>       
            </Box>
        </Box>
    );
}