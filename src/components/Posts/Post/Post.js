import { Delete, MoreHoriz } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import useStyles from './styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useNavigate } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('profile'));
    const [totalLikes, setTotalLikes] = useState(post?.likes); //post > likes is an array

    const handleDelete = () => {
        dispatch(deletePost(post._id))
    };
    const userId = (user?.result?.googleId || user?.result?._id);
    const hasLiked = totalLikes.find((like) => like === userId); //in the likes array we put id of user who like a post

    const handleLikes = async () => {
        dispatch(likePost(post._id));
        if (hasLiked) {
            setTotalLikes(totalLikes.filter(id => id !== userId));
        } else {
            setTotalLikes([...totalLikes, userId])
        }
    };

    const Likes = () => {

        if (totalLikes.length > 0) {
            return totalLikes.find((like) => like === userId)
                ? (
                    <>
                        {totalLikes.length > 1 ? `you and ${totalLikes.length - 1} others react${totalLikes.length > 1 ? 's' : ''}` : `you react this post`}
                    </>
                ) : (
                    <>
                        {totalLikes.length} {totalLikes.length === 1 ? 'react this post' : 'reacts this post'}
                    </>
                )
        }
    };


    const openPost = () => {
        navigate(`/posts/${post._id}`)
    };
    const messageResize = (string, countChar) => {
        return string?.length > countChar ? string.substr(0, countChar - 1) + `  ...Read more📖` : string;
    };

    return (
        <Card className={classes.card} raised elevation={10}>

            <div className={classes.cardContent} >
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} component='div' onClick={openPost}
                />
                <div className={classes.overlay} onClick={openPost}>
                    <Typography variant='h6'> {post.name} </Typography>
                    <Typography variant='body2'> {moment(post.createdAt).fromNow()}  </Typography>
                </div>
                {
                    (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
                    <div className={classes.overlay2}>
                        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)} >
                            <MoreHoriz fontSize='large'> </MoreHoriz>
                        </Button>
                    </div>
                }

                <div className={classes.details} onClick={openPost}>
                    <Typography variant='body2' color='textSecondary' > {post.tags.map(tag => `#${tag} `)} </Typography>
                </div>
                <Typography className={classes.title} variant='h5' gutterBottom onClick={openPost}> {post.title} </Typography>

                <CardContent onClick={openPost}>
                    <Typography variant='body2' color='textSecondary' > {messageResize(post.message, 110)} </Typography>
                </CardContent>

            </div>

            <CardActions className={classes.cardActions}>
                <Button color='primary' disabled={!user?.result} size="small"
                    onClick={handleLikes} >
                    {
                        hasLiked ? <FavoriteIcon color='error' /> : <><FavoriteBorderOutlinedIcon color='error' />&#160; Like</>
                    }
                </Button>
                <Typography variant="caption" style={{ color: 'gray' }} fontSize='small'>
                    <Likes />
                </Typography>
                {
                    (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
                    <Button color='primary' size="small"
                        onClick={handleDelete} >
                        <Delete fontSize='small'> </Delete> Delete
                    </Button>
                }
            </CardActions>

        </Card>
    );
};

export default Post;


