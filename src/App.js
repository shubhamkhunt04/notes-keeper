import React, {  useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from './firebase';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import UpdateNote from './components/NotesCard/UpdateNote';
import Error404 from './Error404/Error404';
import Loader from './components/Loader/Loader';
import Footer from './components/Footer/Footer';
import { darkTheme } from './theme';

import './App.css';

const App = () => {
  const [theme] = useState(darkTheme);
  const [user,loading] = useAuthState(auth);

  if (loading) return <Loader />;

  return (
    <>
      <ThemeProvider theme={theme}>
        {user ? (
          <>
            <Router>
              <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/edit/:noteId' component={UpdateNote} />
                <Route path='*' component={Error404} />
              </Switch>
            </Router>
            <Footer/>
          </>
        ) : (
          <Login />
        )}
      </ThemeProvider>
    </>
  );
};

export default App;
