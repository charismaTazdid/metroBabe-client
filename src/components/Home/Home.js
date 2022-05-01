import React, { useEffect, useState } from 'react';
import { Container, Grid, Grow } from '@mui/material';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';

const Home = () => {

    const [currentId, setCurrentId] = useState(null); //this state for track which post is clicked 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch]);

    return (

        <Grow in>
            <Container>
                <Grid container justify='space-between' alignItems='stretch' spacing={4}>
                    <Grid item xs={12} sm={4} >

                        <Form currentId={currentId} setCurrentId={setCurrentId} > </Form>

                    </Grid>
                    <Grid item xs={12} sm={7} >

                        <Posts setCurrentId={setCurrentId}> </Posts>

                    </Grid>


                </Grid>
            </Container>
        </Grow>

    );
};

export default Home;