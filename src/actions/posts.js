import * as api from '../api';
import { CREATE, DELETE, FETCH_ALL, FETCH_BY_SEARCH, LIKE, UPDATE, START_LOADING, END_LOADING, FETCH_POST, COMENT } from '../constants/actionTypes';

//get all post
export const getPosts = (page) => async (dispatch) => {

    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);
        const action = { type: FETCH_ALL, payload: data }
        // return action;
        dispatch(action);
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error.message)
    }
};

//single post
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);
        dispatch({ type: FETCH_POST, payload: data });
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error.message)
    }
};


export const getPostBySearch = (searchQuery) => async (dispatch) => {

    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.getPostBySearch(searchQuery);
        // console.log(data)
        dispatch({ type: FETCH_BY_SEARCH, payload: data })
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error)
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);
        // console.log(typeof(data));
        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error)
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatingPost(id, post);
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error.message)
    }
};

//Delete Post Method
export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }
}
//like post method
export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error)
    }
};


//comment posting method

export const commentPost = (comment, id) => async (dispatch) => {

    try {
        const {data} = await api.commentPost(comment, id);
        dispatch({ type: COMENT, payload: data })
        return data.comments;

    } catch (error) {
        console.log(error)
    }
};
