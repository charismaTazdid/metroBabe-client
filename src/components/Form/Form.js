import { Button, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useStyles from './style';
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';


const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    // console.log(currentId)
    //when user select any post to edit, we want to fullfill from with that data
    const post = useSelector(state => currentId ? state.posts.find(post => post._id === currentId) : null);
    useEffect(() => { 
        if(post){
            setPostData(post)
        }
    }, [post]);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, postData))
        } else {
            dispatch(createPost(postData))

        }
        clear()
    };

    const clear = () => {
        setCurrentId(null);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' })
    };

    return (
        <Paper className={classes.paper}>
            <form autoCapitalize='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'> {currentId? 'Edit' : 'Create'} Your post </Typography>

                <TextField name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })}>
                </TextField>
                <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}>
                </TextField>
                <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}>
                </TextField>
                <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}>
                </TextField>

                <div className={classes.fileInput}>
                    <FileBase type='file' multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}>
                    </FileBase>
                </div>

                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth> Submit </Button>

                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth> Clear </Button>

            </form>
        </Paper>
    );
};

export default Form;