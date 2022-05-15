import { Button, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { commentPost } from '../../actions/posts';
import useStyles from './styles';



const Coments = ({ post }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const commentRef = useRef();

    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleCommentSubmit = async () => {

        if (user?.result?.name) {
            const finaleCommnet = `${user.result.name} : ${comment}`;
            const commentFromUpdatedPost = await dispatch(commentPost(finaleCommnet, post._id));
            setComments(commentFromUpdatedPost);
            setComment('');
            commentRef.current.scrollIntoView({behavior: 'smooth'})
        }
        else {
            alert('you are not allow to comment, login first...');
            navigate('/auth', { state: { id: post._id } })  //we pass the state, couse I want push back here the user after completing login.
        }
    };

    return (

        <div>
            <div className={classes.commentOuterContainer}>
                <div className={classes.commentInnerContainer}>
                    <Typography gutterBottom variant='h6'> Comments </Typography>
                    {
                        comments.map((cmnt, index) => (
                            <Typography key={index} variant='subtitle1' gutterBottom> 
                            <strong> {cmnt.split(' : ')[0].toUpperCase()}</strong> says : 
                            {cmnt.split(':')[1]}
                            </Typography>
                        ))
                    }
                    <div ref={commentRef}/>
                </div>
                <div style={{ width: '70%' }}>
                    <Typography gutterBottom variant='h6'> Write A Comment </Typography>
                    <TextField fullWidth
                        rows={4}
                        variant='outlined'
                        label='Comment'
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button style={{ marginTop: '10px' }} fullWidth disabled={(!comment)} variant='contained' onClick={handleCommentSubmit}> Submit </Button>



                </div>

            </div>
        </div>
    );
};

export default Coments;