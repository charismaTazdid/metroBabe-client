import { Container } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/styles";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Auth from './components/Auth/Auth';

function App() {
  let theme = createTheme();
  // theme = responsiveFontSizes(theme)

  return (
    <Router> 
    <ThemeProvider theme={theme}>
      <Container maxWidth='lg'>
        <Navbar> </Navbar>
        <Routes> 
          <Route path='/' element={<Home> </Home>}> </Route> 
          <Route path='/auth' element={<Auth> </Auth>}> </Route> 
        </Routes>
        
      </Container>
    </ThemeProvider>
    </Router>
  );
}

export default App;
