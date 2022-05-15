import React, { useState } from 'react';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material';
import useStyle from './styles';
import LockIcon from '@mui/icons-material/Lock';
import CustomInput from './CustomInput';
import GoogleLogin from 'react-google-login';
import Icon from './icon'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../actions/auth';

const Auth = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });

    const switchMood = () => setIsSignUp(!isSignUp);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            dispatch(signUp(formData, navigate));
        }
        else {
            dispatch(signIn(formData, navigate));
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
        console.log("dude! google login attemp fail... don't worry, sometimes it happen... try later")
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
                                    <CustomInput name='lastName' label='Last Name' handleChange={handleChange} half />

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

                    <Grid container justifyContent='center' >
                        <Grid item >
                            <Button onClick={switchMood} color='inherit' className={classes.switchBtn} >
                                {
                                    isSignUp ? <> Already have an account? &#160;<b>Sign In</b> </>
                                        :
                                        <> Don't have an account? &#160; <b> Sign Up </b>  </>
                                }
                            </Button>
                        </Grid>
                    </Grid>

                    <GoogleLogin
                        clientId='1061426492004-iggjv0sp8vm2h3un51g23a15nd4c7j30.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button color='inherit' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained" >
                                SIGN IN WITH GOOGLE
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />


                </form>
            </Paper>
        </Container>
    );
};

export default Auth;