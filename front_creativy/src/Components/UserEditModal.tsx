import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { styleModal } from "../Styles/StyleModal";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/IUser";
import { VisuallyHiddenInput } from "../Styles/VisuallyHiddenInput";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface IUserEditModal {
    user: IUser
    handleClose: () => void
}

export default function UserEditModal({user, handleClose}: IUserEditModal) {
    const [image, setImage] = useState<any>('');
    const [coverImage, setCoverImage] = useState<any>('');
    const [updateUser, setUpdateUser] = useState<IUser>(user);
    // const [newPost, setNewPost] = useState<any>({});
    // const [createPost, {error: errorCreate}] = useCreatePost();
    // const [updatePost, {error: errorUpdate}] = useUpdatePost();
    // const createdPostResponse = useReactiveVar(createdPostVar);
    // const updatePostResponse = useReactiveVar(updatedPostVar);
    const navigate = useNavigate();

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

    const handleReset = () => {
        setImage('');
        setUpdateUser({
            ...updateUser,
            image: image,
            cover_image: coverImage
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
            <Box component="form" onSubmit={() => {}} noValidate sx={{ mt: 1 }}>
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
                    <Avatar
                        src={coverImage? URL.createObjectURL(coverImage) : user.cover_image? `${process.env.REACT_APP_API_URL}${user.cover_image}` : ''}
                        sx={{
                            height: 80,
                            mb: 2,
                            width: 80
                        }}
                    />
                    <Button component="label" variant="text" startIcon={<CloudUploadIcon />} size='small' sx={{ marginBottom: 2, marginLeft: 2 }}>
                        Alterar imagem
                        <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFile} multiple name="cover_image"/>
                    </Button>
                </Box>              
            </Box>
        </Box>
    );
}