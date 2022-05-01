import React, { useState } from 'react';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material';
import useStyle from './styles';
import LockIcon from '@mui/icons-material/Lock';
import CustomInput from './CustomInput';
import GoogleLogin from 'react-google-login';
import Icon from './icon'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const handleShowPassword = () => setShowPassword(!showPassword);
    const switchMood = () => setIsSignUp(!isSignUp);

    const handleSubmit = () => {

    };
    const handleChange = () => {

    };
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            navigate('/')
        } catch (error) {
            console.log(error)
        }
        // console.log(res)
    };
    const googleFailure = () => {
        console.log("dude! google login fail... don't worry, sometimes it happen... try later")
    };

    return (
        <Container component='main' maxWidth='xs' >
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockIcon  ></LockIcon>
                </Avatar>
                <Typography variant='h5'> {isSignUp ? 'Sign Up' : 'Sign In'} </Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <CustomInput name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                    <CustomInput name='firstName' label='First Name' handleChange={handleChange} half />

                                </>
                            )
                        }
                        <CustomInput name='email' label="Email Address" handleChange={handleChange} type='email' />
                        <CustomInput name='password' label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {
                            isSignUp && <CustomInput name='confirmPassword' label=" Re-Type Password" handleChange={handleChange} type='password' />
                        }
                    </Grid>
                    <Button type='submit' variant='contained' className={classes.submit} color='primary' fullWidth>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <GoogleLogin
                        clientId='1061426492004-iggjv0sp8vm2h3un51g23a15nd4c7j30.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained" >
                                SIGN IN WITH GOOGLE
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />

                    <Grid container justifyContent='center' >
                        <Grid item >
                            <Button onClick={switchMood} color='warning'>
                                {
                                    isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;