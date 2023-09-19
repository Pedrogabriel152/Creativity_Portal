import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, ImageList, ImageListItem, Link, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { VisuallyHiddenInput } from "../Styles/VisuallyHiddenInput";
import { useEffect, useState } from "react";
import { IPost } from "../interfaces/IPost";
import { useCreatePost } from "../GraphQL/Hooks/postHooks";
import { toast } from "react-toastify";
import { useReactiveVar } from "@apollo/client";
import { createdPostVar } from "../GraphQL/States/postState";
import { useNavigate } from "react-router-dom";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function CreatedPost() {
    const [image, setImage] = useState<any>('');
    const [createPost, {error}] = useCreatePost();
    const createdPostResponse = useReactiveVar(createdPostVar);
    const navigate = useNavigate();

    useEffect(() => {
      if(error) {
        toast.error('Algo deu errador');
        return;
      }

      if(createdPostResponse?.code !== 200) {
        toast.error(createdPostResponse?.message);
        return;
      }

      toast.success(createdPostResponse?.message);
      navigate('/');
    }, [error, createdPostResponse]);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.files){
        const image = e.target.files[0];

        if(image) {
          if(image.type === 'image/jpeg' || image.type=== 'image/png') {
            setImage(image);
          }
          else{
            alert("Mande uma imagem do tipo PNG ou JPEG");
            setImage(null);
            return;
          }
        } 
      }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      if(!data.get('title')) return toast.error('O titulo é obrigatório');

      if(!data.get('subtitle')) return toast.error('A legenda é obrigatória');

      createPost({
        variables: {
          post: {
            title: `${data.get('title')}`,
            subtitle: `${data.get('subtitle')}`,
            image: image
          }
        }
      });
      
    };

    return(
        <Box
          sx={style}
        >
          <Typography component="h1" variant="h5">
            New Post
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Titulo"
              name="title"
              autoComplete="title"
              autoFocus
              type="text"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="subtitle"
              label="Legenda"
              type="text"
              id="subtitle"
              autoComplete="current-subtitle"
            />
            <Button
            component="label"
                fullWidth
                variant="text"        
            >
                {image? 'Alterar Imagem' : 'Adicionar uma imagem'}
                <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFile} multiple/>
            </Button>

            {image&& (
                <ImageListItem key={image} sx={{ width: '50%', height: 200, textAlign: 'center', marginLeft: 28}}>
                <img
                    srcSet={URL.createObjectURL(image)}
                    src={URL.createObjectURL(image)}
                //   alt={item.title}
                    loading="lazy"
                />
                </ImageListItem>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Postar
            </Button>
          </Box>
        </Box>
    );
}