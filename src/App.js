import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { darkTheme, lightTheme } from './theme';
import Login from './components/Auth/Login';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Dashboard from './components/Dashboard/Dashboard';
import UpdateNote from './components/NotesCard/UpdateNote';
import Error404 from './Error404/Error404';
import './App.css';

const App = () => {
  const [theme, setTheme] = useState(darkTheme);
  const [themeToggler, setThemeToggler] = useState(true);

  const [user] = useAuthState(auth);

  const themeHandler = () => {
    console.log('theme handler called');
    if (themeToggler) {
      setThemeToggler(false);
      setTheme(lightTheme);
    } else {
      setThemeToggler(true);
      setTheme(darkTheme);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        {user ? (
          <>
            <Router>
              <Switch>
                <Route
                  exact
                  path='/'
                  render={() => (
                    <Dashboard
                      themeHandler={themeHandler}
                      themeToggler={themeToggler}
                    />
                  )}
                />
                <Route exact path='/login' component={Login} />
                <Route exact path='/edit/:noteId' component={UpdateNote} />
                <Route path='*' component={Error404} />
              </Switch>
            </Router>
          </>
        ) : (
          <Login />
        )}
      </ThemeProvider>
    </>
  );
};

export default App;
