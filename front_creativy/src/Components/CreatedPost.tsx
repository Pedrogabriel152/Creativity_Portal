import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";

// Mui Material
import { Box, Button, ImageListItem, Link, TextField, Typography } from "@mui/material";

// GraphQL
import { useCreatePost, useUpdatePost } from "../GraphQL/Hooks/postHooks";
import { createdPostVar, updatedPostVar } from "../GraphQL/States/postState";

// Toastify
import { toast } from "react-toastify";
import { useReactiveVar } from "@apollo/client";

// Styles
import { StyledTextarea } from "../Styles/TextArea";
import { VisuallyHiddenInput } from "../Styles/VisuallyHiddenInput";
import { styleModal } from "../Styles/StyleModal";

// Interface
import { IPost } from "../interfaces/IPost";

interface ICreated {
  title?: string
  post?: IPost
}

export default function CreatedPost({title, post}: ICreated) {
    const [image, setImage] = useState<any>('');
    const [newPost, setNewPost] = useState<any>({});
    const [createPost, {error: errorCreate}] = useCreatePost();
    const [updatePost, {error: errorUpdate}] = useUpdatePost();
    const createdPostResponse = useReactiveVar(createdPostVar);
    const updatePostResponse = useReactiveVar(updatedPostVar);
    const navigate = useNavigate();

    useEffect(() => {
      if(errorCreate) {
        toast.error('Algo deu errado');
        return;
      }

      if(createdPostResponse?.code !== 200) {
        toast.error(createdPostResponse?.message);
        return;
      }

      toast.success(createdPostResponse?.message);
      navigate('/');
    }, [errorCreate, createdPostResponse]);

    useEffect(() => {
      if(errorUpdate) {
        toast.error('Algo deu errado');
        return;
      }

      if(updatePostResponse?.code !== 200) {
        toast.error(updatePostResponse?.message);
        return;
      }

      toast.success(updatePostResponse?.message);
      navigate('/');
    }, [errorUpdate, updatePostResponse])

    useEffect(() => {
      if(post) {
        setNewPost(post);
      }
    }, [])

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

      if(title) {
        if(image) {
          updatePost({
            variables: {
              id: data.get('id'),
              post: {
                id: data.get('id'),
                title: `${data.get('title')}`,
                subtitle: `${data.get('subtitle')}`,
                image: image
              }
            }
          });
          return;
        }
  
        updatePost({
          variables: {
            id: data.get('id'),
            post: {
              id: data.get('id'),
              title: `${data.get('title')}`,
              subtitle: `${data.get('subtitle')}`,
            }
          }
        }); 

        return;
      }

      if(image) {
        createPost({
          variables: {
            post: {
              title: `${data.get('title')}`,
              subtitle: `${data.get('subtitle')}`,
              image: image
            }
          }
        });
        return;
      }

      createPost({
        variables: {
          post: {
            title: `${data.get('title')}`,
            subtitle: `${data.get('subtitle')}`,
          }
        }
      }); 
    };

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      setNewPost({
        ...newPost,
        [event.target.name]: event.target.value
      });
    }

    const handleTextAreaOnChange = (event:  React.ChangeEvent<HTMLTextAreaElement>) => {
      setNewPost({
        ...newPost,
        subtitle: event.target.value,
      });
    }

    return(
      <Box
        sx={styleModal}
      >
        <Typography component="h1" variant="h5">
          {title? title : 'New Post'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <input type="hidden" name="id" value={newPost.id}/>
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
            value={newPost.title}
            onChange={handleOnChange}
          />
          <StyledTextarea 
            value={newPost.subtitle}
            onChange={handleTextAreaOnChange}
            placeholder="Legenda"
            sx={{ width: '100%', resize: 'none' }}
          />
          <Button
            component="label"
            fullWidth
            variant="text"        
          >
            {image? 'Alterar Imagem' : 'Adicionar uma imagem'}
            <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFile} multiple/>
          </Button>

          {image ? (
            <ImageListItem key={image} sx={{ width: '50%', height: 200, textAlign: 'center', marginLeft: '25%'}}>
            <img
              srcSet={URL.createObjectURL(image)}
              src={URL.createObjectURL(image)}
              loading="lazy"
            />
            </ImageListItem>
          ): post?.image &&(
            <ImageListItem key={image} sx={{ width: '50%', height: 200, textAlign: 'center', marginLeft: '25%'}}>
              <img
                srcSet={`${process.env.REACT_APP_API_URL}${post.image}`}
                src={`${process.env.REACT_APP_API_URL}${post.image}`}
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
            {title? 'Salvar' : 'Postar'}
          </Button>
        </Box>
      </Box>
    );
}