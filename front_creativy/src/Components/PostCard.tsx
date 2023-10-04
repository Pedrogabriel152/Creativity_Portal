import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import { IPost } from "../interfaces/IPost";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

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
            </CardContent>
        </Card>
    );
}