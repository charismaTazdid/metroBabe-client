import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo2 from '../../images/1.png';
import useStyle from './styles';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    //    const user = null;
    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) handleLogOut()
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const handleLogOut = () => {
        dispatch({ type: 'LOGOUT' });
        setUser(null);
        // navigate('/');
    };
    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' align='center' >
                    <img src={logo2} height="50" alt="" />
                </Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {
                    user ? (<div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}> {user.result.name.charAt(0)} </Avatar>
                        <Typography className={classes.userName} variant="h6"> {user.result.name}  </Typography>
                        <Button onClick={handleLogOut} variant='contained' className={classes.logout} color="secondary"> Logout</Button>

                    </div>) : (
                        <div>
                            <Button component={Link} to="/auth" variant='contained' color="primary"> LogIn</Button>
                        </div>
                    )
                }
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;