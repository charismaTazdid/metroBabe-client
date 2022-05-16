import { Button, CircularProgress, Divider, Paper, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost, getPostBySearch } from '../../actions/posts';
import useStyles from './styles';
import notFound from '../../images/noimage.jpg';
import Coments from './Coments';

const PostDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();

    const { post, posts, isLoading } = useSelector((state) => state.posts);

    // const post = posts.find(pst => pst._id === id);
    useEffect(() => {
        dispatch(getPost(id))
    }, [id, dispatch]);

    useEffect(() => {
        if (post) {
            dispatch(getPostBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    }, [post, dispatch]);

    const recomandedPost = posts.filter(({ _id }) => _id !== post?._id);


    if (!post) return null;
    if (isLoading) {
        return <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size='7rem' />
        </Paper>
    };

    const openPost = (id) => navigate(`/posts/${id}`);
    const messageResize = (string, countChar) => {
        return string?.length > countChar ? string.substr(0, countChar - 1) + `  ...Read more📖` : string;
    };
    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                 <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || notFound} alt={post.title} />
                </div>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography variant="h6">Created by: {post.name}</Typography>
                    <Typography variant="body1"> {moment(post.createdAt).fromNow()} </Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Comments: </strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Coments post={post}></Coments>
                    <Divider style={{ margin: '20px 0' }} />
                </div>
            
            </div>


            {
                recomandedPost.length && (
                    <div className={classes.section2}>
                        <Divider></Divider>
                        <Divider></Divider>
                        <Typography gutterBottom variant='h5'>💩  You might also like:  </Typography>
                        {/* <Divider></Divider> */}
                        <div className={classes.recommendedPosts}>
                            {
                                recomandedPost.map(({ title, message, name, likes, _id, selectedFile }) => (
                                    <div className={classes.recomandedPost} onClick={() => openPost(_id)} key={_id}>
                                        <Typography gutterBottom variant='h6'> {title} </Typography>
                                        <Typography gutterBottom variant='subtitle2'> posted by:  {name}</Typography>
                                        <Typography gutterBottom variant='subtitle2'> {messageResize(message, 70)}</Typography>
                                        <Typography gutterBottom variant='subtitle1'>😍  {likes.length} people love this post </Typography>
                                        <img src={selectedFile} alt="" width='200px' />
                                        <br />
                                        <Button variant='contained' color='warning'> Read more </Button>
                                    </div>
                                ))
                            }


                        </div>
                    </div>
                )
            }
        </Paper>
    );
};

export default PostDetails;     