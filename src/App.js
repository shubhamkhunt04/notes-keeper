import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// import { AuthProvider } from "./context/auth";
// import AuthRoute from "./util/AuthRoute";
// import Dashboard from "./Components/Dashboard/Dashboard";
// import Login from "./Components/AdminAuth/Login";
// import SignUp from "./Components/AdminAuth/SignUp";
import { ThemeProvider } from '@material-ui/core/styles';
import { darkTheme, lightTheme } from './theme';
import Login from './components/Auth/Login';
import { auth, firestore } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '@material-ui/core';
import Dashboard from './components/Dashboard/Dashboard';
import UpdateNote from './components/NotesCard/UpdateNote';

const App = () => {
  const [theme, setTheme] = useState(darkTheme);
  const [themeToggler, setThemeToggler] = useState(true);

  const [user] = useAuthState(auth);

  console.log(user);

  const signOut = () => {
    auth.signOut();
    // dispatch({ type: 'SET_ALL' });
  };

  const themeHandler = () => {
    if (themeToggler) {
      setThemeToggler(false);
      setTheme(lightTheme);
    } else {
      setThemeToggler(true);
      setTheme(darkTheme);
    }
  }

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
                {/* <AuthRoute exact path="/signup" component={SignUp} /> */}
                <Route exact path='/login' component={Login} />
                <Route exact path='/edit/:noteId' component={UpdateNote} />

                <Dashboard />
                <Button onClick={signOut} className='signout-btn'>
                  Sign Out
                </Button>
              </Switch>
            </Router>
          </>
        ) : (
          <Login />
        )}
        {/* <Login /> */}
      </ThemeProvider>
    </>
  );
};

export default App;
