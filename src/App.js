import { Container } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/styles";
import Home from './components/Home/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import CreatePost from './components/CreatePost/CreatePost';

function App() {
  let theme = createTheme();

  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Container maxWidth='xl'>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Navigate to='/posts' />}> </Route>
            <Route path='/posts' element={<Home> </Home>}> </Route>
            <Route path='/posts/createPost' element={<CreatePost> </CreatePost>}> </Route>
            <Route path='/posts/search' element={<Home />}> </Route>
            <Route path='/posts/:id' element={<PostDetails />}> </Route>
            <Route path='/auth' element={(!user ? <Auth /> : <Navigate to='/posts' />)}> </Route>
          </Routes>

        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
