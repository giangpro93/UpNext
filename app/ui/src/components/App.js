import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { Router } from './router/Router';
import { Login } from './login/Login'

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: '#7986cb',
      main: '#3f51b5',
      dark: '#303f9f',
      contrastText: '#fff'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router />
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
