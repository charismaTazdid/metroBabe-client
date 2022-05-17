//this file contain all the api call function

import axios from "axios";

// const url = 'http://localhost:5000/posts';
const API = axios.create({ baseURL: 'https://metro-babe.herokuapp.com' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const getPostBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatingPost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost)

export const deletePost = (id) => API.delete(`/posts/${id}`)

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const commentPost = (comment, id) => API.post(`/posts/${id}/commentPost`, {comment});

export const signIn = (formData) => API.post('/user/signIn', formData);
export const signUp = (formData) => API.post('/user/signUp', formData);