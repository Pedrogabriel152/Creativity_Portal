import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import { IPost } from "../interfaces/IPost";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea } from "@mui/material";
import { useReactiveVar } from "@apollo/client";
import { getPostVar, likePostVar } from "../GraphQL/States/postState";
import { useEffect, useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLikePost } from "../GraphQL/Hooks/postHooks";

interface IPostCard {
    post: IPost
    user: number
}

export default function PostCard({post, user} : IPostCard) {
    return (
        <Card sx={{ width: '100%', marginTop: '30px' }}>
            <CardContent sx={{ width: '100%' }}>
                <CardActionArea href={`/post/${post.id}`}>
                <Stack direction="column" sx={{ width: '100%'}}>
                    <Typography gutterBottom variant="h5" component="div" marginBottom={3}>
                        {post.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom marginBottom={5}>
                        {post.subtitle}
                    </Typography>
                    {post.image && (
                        <CardMedia
                            component="img"
                            height="300"
                            image={`${process.env.REACT_APP_API_URL}${post.image}`}
                            alt={post.title}
                        />
                    )}
                </Stack>
                </CardActionArea>
                {/* <Button variant="outlined" startIcon={like ?  <FavoriteIcon /> : <FavoriteBorderIcon />} style={{marginTop: '8px'}} onClick={() => {likePostFunc(); updateLike(post, index);}} /> */}
            </CardContent>
        </Card>
    );
}