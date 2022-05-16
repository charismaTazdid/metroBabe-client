import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import logo from '../../images/logo.png'
import useStyles from './styles';

const NavSecond = () => {
    //   const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const classes = useStyles()
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('profile')));
    //    const user = null;
    React.useEffect(() => {
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
        navigate('/');
    };

    return (
        <AppBar position="static" color='transparent' style={{ borderRadius: 5, margin: '30px 0', padding: '8px' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to='/'
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img src={logo} height='55' width='200px' alt="" />
                    </Typography>

                    {/* for small divice */}
                   
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to='/posts'
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img src={logo} height='40' alt="" />
                    </Typography>



                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>


                    </Box>


                    {
                        user ? (<div className={classes.profile}>

                            <Avatar style={{ margin: '0px 6px' }} className={classes.purple} alt={user.result.name} src={user.result.imageUrl}> {user.result.name.charAt(0)} </Avatar>
                            <Typography style={{ margin: '0px 6px' }} className={classes.userName} variant="h6"> {user.result.name}  </Typography>

                        </div>) : (
                            <div>
                                <Button component={Link} to="/auth" variant='outlined' color="inherit" style={{ marginRight: '10px' }}> LogIn</Button>
                            </div>
                        )
                    }
                    {/* important */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <MenuIcon color='inherit' />

                            </IconButton>
                        </Tooltip>

                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            {
                                user ?
                                    <MenuItem component={Link} to='/posts/createPost' onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center"> Create Post </Typography>
                                    </MenuItem> :

                                    <MenuItem component={Link} to='/auth' onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center"> Create Account </Typography>
                                    </MenuItem>}

                            {
                                user ?
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center"> My Profile </Typography>

                                    </MenuItem>
                                    :
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center"> About us </Typography>
                                    </MenuItem>
                            }

                            {
                                user &&
                                <MenuItem component={Link} to="/posts" onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center"> Home </Typography>
                                </MenuItem>

                            }

                            {
                                user &&
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Button onClick={handleLogOut} variant='contained' className={classes.logoutBtn} color="secondary"> Logout</Button>
                                </MenuItem>
                            }

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavSecond;