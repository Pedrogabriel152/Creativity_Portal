import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, ImageList, ImageListItem, Link, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { VisuallyHiddenInput } from "../Styles/VisuallyHiddenInput";
import { useState } from "react";


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

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type=== 'image/png') {
                setImage(image);
            }
            else{
                alert("Mande uma imagem do tipo PNG ou JPEG");
                setImage(null);
                return;
            } 

            console.log(image)
        }
    }

    return(
        <Box
          sx={style}
        >
          <Typography component="h1" variant="h5">
            New Post
          </Typography>
          <Box component="form" onSubmit={() => {}} noValidate sx={{ mt: 1 }}>
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
                Alterar Imagem
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
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Não tem uma conta? Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
    );
}