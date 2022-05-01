import React from 'react';
import Post from './Post/Post';
import useStyles from './style';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@mui/material';

const Posts = ({setCurrentId}) => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts)
    // console.log(posts)
    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3} >
                {
                    posts.map((post) => (
                        <Grid item key={post._id} xs={12} sm={6} >
                            <Post post={post} setCurrentId={setCurrentId}> </Post>
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
};

export default Posts;