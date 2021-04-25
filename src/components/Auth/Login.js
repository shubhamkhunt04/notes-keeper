import React, { useState, useContext } from 'react';
import { makeStyles, TextField, Button, Divider } from '@material-ui/core';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
// import { AuthContext } from "../../context/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    background: 'black',
    padding: '20px',
    width: '600px',
    margin: 'auto',
  },
  title: {
    color: '#f0db72',
    textAlign: 'center',
    marginTop: '90px',
    fontFamily: 'fangsong',
  },
  textField: {
    margin: '10px',
    width: '500px',
  },
}));

const Login = () => {
  document.getElementsByTagName('html')[0].style.background = 'black';
  //   const context = useContext(AuthContext);

  const classes = useStyles();
  const [error, setError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');
  const [passwordHelperText, setPasswordHelperText] = useState('');
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  console.log(error);
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // onInput change all the error messages are remove.
    setError(false);
    setEmailHelperText('');
    setPasswordHelperText('');
  };

  const history = useHistory();
  //   const [loginUser, { loading }] = useMutation(ADMIN_LOGIN_MUTATION, {
  //     update(_, result) {
  //       if (result) {
  //         context.adminLogin(result.data.adminLogin);
  //         history.push("/");
  //       }
  //     },
  //     onError(err) {
  //       //   setErrors(err.graphQLErrors[0].extensions.exception.errors);
  //     },
  //     variables: values,
  //   });

  const signInWithGoogle = () => {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  const signIn = async () => {
    // dispatch({ type: 'SET_LOADING', data: true });
    try {
      const userAuth = await auth.signInWithEmailAndPassword(
        values.email,
        values.password
      );
      console.log(userAuth);
    } catch (err) {
      console.log(err);
    }
  };

  const signUp = async () => {
    try {
      const newUser = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );
      console.log(newUser);
    } catch (err) {
      console.log(err);
    }
  };

  const formValidation = () => {
    // Email validation
    let reg = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;

    if (values.email === '' || values.email === null) {
      setError(true);
      setEmailHelperText('Email must not be empty');
    } else if (reg.test(values.email) === false) {
      setError(true);
      setEmailHelperText('Please enter valid email  address');
    } else {
      setError(false);
    }

    // Password validation

    if (values.password === '' || values.password === null) {
      setError(true);
      setPasswordHelperText('Password must not be empty');
    } else if (values.password.toString().length < 8) {
      setError(true);
      setPasswordHelperText('Password Length atleast 8 characters');
    } else {
      setError(false);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    formValidation();
    // loginUser();
    console.log('form is submited');
  };

  return (
    <div>
      <Button variant='outlined' color='secondary' onClick={signUp}>
        SignUP
      </Button>
      <Button variant='outlined' color='secondary' onClick={signIn}>
        SignIn
      </Button>
      <Button
        variant='outlined'
        color='secondary'
        className='google-btn'
        onClick={signInWithGoogle}
      >
        <TextField>Sign in with Google</TextField>
      </Button>
      <h1 className={classes.title}>Notes Keeper</h1>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={onFormSubmit}
      >
        <div>
          <TextField
            id='outlined-flexible'
            label='Email'
            variant='outlined'
            color='secondary'
            type='email'
            name='email'
            onChange={onChange}
            error={emailHelperText ? 1 : 0}
            helperText={emailHelperText}
            size='small'
            className={classes.textField}
          />
        </div>
        <div>
          <TextField
            id='outlined-flexible'
            label='Password'
            variant='outlined'
            color='secondary'
            type='password'
            name='password'
            onChange={onChange}
            error={passwordHelperText ? 1 : 0}
            helperText={passwordHelperText}
            size='small'
            className={classes.textField}
          />
        </div>
        <div>
          <Button
            variant='outlined'
            color='secondary'
            type='submit'
            startIcon={
              <img
                src='https://www.raqnbeauty.com/wp-content/uploads/2020/06/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png'
                alt='Google'
                width='20px'
                height='20px'
              />
            }
            className={classes.textField}
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </div>
        <Divider />
        <div>
          <Button
            variant='outlined'
            color='secondary'
            type='submit'
            onClick={signIn}
            // className={classes.textField}
          >
            Log In
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            type='submit'
            onClick={signUp}
            // className={classes.textField}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
