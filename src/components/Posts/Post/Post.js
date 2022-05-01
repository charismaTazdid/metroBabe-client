import { Delete, MoreHoriz, ThumbUp } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const handleDelete = ()=> {
        dispatch(deletePost(post._id))
    }

    return (
        <Card className={classes.card} >
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6'> {post.creator} </Typography>
                <Typography variant='body2'> {moment(post.createdAt).fromNow()}  </Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)} >
                    <MoreHoriz fontSize='large'> </MoreHoriz>
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary' > {post.tags.map(tag => `#${tag} `)} </Typography>
            </div>
            <Typography className={classes.title} variant='h5' gutterBottom> {post.title} </Typography>

            <CardContent>
                <Typography variant='body2' color='textSecondary' > {post.message} </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button color='primary' size="small" onClick={() => dispatch(likePost(post._id))} >
                    <ThumbUp fontSize='small'> </ThumbUp> &#160; Like &#160;
                    {post.likeCount}
                </Button>
                <Button color='primary' size="small"
                    onClick={handleDelete} >
                    <Delete fontSize='small'> </Delete> Delete
                </Button>
            </CardActions>

        </Card>
    );
};

export default Post;