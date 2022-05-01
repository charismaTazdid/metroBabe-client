import * as api from '../api';
import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from '../constants/actionTypes';

//Action Creations 
export const getPosts = () => async (dispatch) => {

    try {
        const { data } = await api.fetchPosts();
        const action = { type: FETCH_ALL, payload: data }
        // return action;
        dispatch(action)
    } catch (error) {
        console.log(error.message)
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post)
        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error)
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatingPost(id, post) //data means response from api, we are imidietly disstructured the data from api response
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
        dispatch({type: LIKE, payload: data})
    } catch (error) {
        console.log(error)
    }
}
