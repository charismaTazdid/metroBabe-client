import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Form from '../Form/Form';

const CreatePost = () => {
    const [currentId, setCurrentId] = useState(null); //this state for track which post is clicked 

    return (
        <div>
            <Typography variant='h5' gutterBottom>   Create your awesome Post:
            </Typography>
            <Grid container alignItems='center' justifyContent='center'> 
            <Grid item xs={12} sm={6} md={6}>
                <Form currentId={currentId} setCurrentId={setCurrentId}>
                </Form>
            </Grid>
            </Grid>
        </div>
    );
};

export default CreatePost;