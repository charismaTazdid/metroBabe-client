import React, { useState } from 'react';
import { AppBar, Button, Container, Grid, Grow, Paper, TextField } from '@mui/material';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import { useDispatch } from 'react-redux';
import { getPostBySearch } from '../../actions/posts';
import Paginate from '../Pagination';
import { useNavigate, useLocation } from 'react-router-dom';
import useStyles from './styles';
import ChipInput from 'material-ui-chip-input';


const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const Home = () => {

    const [currentId, setCurrentId] = useState(null); //this state for track which post is clicked 
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();

    // useEffect(() => {
    //     dispatch(getPosts())
    // }, [dispatch]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();

        }
    };
    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagForDelete) => setTags(tags.filter((tag) => tag !== tagForDelete));

    const handleSearch = () => {
        if (search.trim() || tags) {
            dispatch(getPostBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/')
            console.log('navigate from else block')
        }
    };

    return (

        <Grow in>
            <Container maxWidth='xl' >
                <Grid container justify='space-between' alignItems='stretch' spacing={4} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={3}  >
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>

                            <TextField name='search' variant='outlined' label='Search Post' fullWidth value={search} onChange={(e) => { setSearch(e.target.value) }} onKeyPress={handleKeyPress} />

                            <ChipInput
                                style={{ margin: '10px 0px' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search By Tags"
                                variant='outlined'
                            />
                            <Button onClick={handleSearch} className={classes.searchBtn} color='primary' variant='contained'> Search </Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} > </Form>
                        <Paper elevation={6}>
                            {
                                !searchQuery && !tags.length && (
                                    <Paginate page={page} className={classes.pagination} />
                                )
                            }
                        </Paper>

                    </Grid>

                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId}> </Posts>
                    </Grid>



                </Grid>
            </Container>
        </Grow>

    );
};

export default Home;