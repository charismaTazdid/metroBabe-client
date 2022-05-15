import React from 'react';
import Post from './Post/Post';
import useStyles from './style';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@mui/material';

const Posts = ({ setCurrentId }) => {
    const classes = useStyles();
    const { posts, isLoading } = useSelector((state) => state.posts)
    // console.log(posts)
    if (!posts.length && !isLoading) return "NO POST TO SHOW..."
    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3} >
                {
                    posts.map((post) => (
                        <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}>
                            <Post post={post} setCurrentId={setCurrentId}> </Post>
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
};

export default Posts;