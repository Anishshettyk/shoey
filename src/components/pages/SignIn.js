import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mixins, theme, media } from '../../styles';
import { Button, TextField, Paper, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LazyImage } from '../index';
import { useHistory } from 'react-router-dom';
import { googleAuth, githubAuth, signin } from '../../lib/firebase';

import googleIcon from '../../images/googleIcon.svg';
import githubIcon from '../../images/github_icon.svg';
import signInImage from '../../images/signIn.svg';
import logo from '../../images/shoey_logo.svg';

const { colors } = theme;

const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      margin: '15px 0px',
    },
  },
  loadingSpinner: {
    margin: '0px auto',
  },
  buttonStyles: {
    width: '30%',
    minWidth: '200px',
    padding: '15px 20px',
  },
  signInProvider: {
    display: 'flex',
    backgroundColor: 'transparent',
    width: '100%',
    margin: '30px 10px',
    padding: '0px 20px',
    cursor: 'pointer',
    transition: 'all 0.175s',
    '& img': {
      maxWidth: '32px',
      backgroundColor: 'transparent',
    },
    '&:hover': {
      transform: 'translateY(-10px)',
      backgroundColor: colors.grey3,
    },
    [theme.breakpoints.down('sm')]: {
      '& h5': {
        fontSize: '10px',
      },
    },
  },
  signInProviderText: {
    marginLeft: '10px',
  },
}));

const SignInContainer = styled.main`
  ${mixins.visibleLayout}
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
const ImageContainer = styled.section`
  background-color: ${colors.grey3};
  position: relative;
  img {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;
const SignInFormContainer = styled.section`
  margin: 30px 60px;
`;
const Divider = styled.p`
  ${mixins.divider};
`;
const SignInProvider = styled.div`
  display: Flex;
  justify-content: space-around;
  ${media.phablet`
    display:block;
  `}
`;

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const history = useHistory();
  const classes = useStyles();
  const defaultErrorMessage = 'Error occured while signing in please try again.';

  const signInForm = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signin(email, password);
      history.push('/');
    } catch (error) {
      setError(error.message ? error.message : defaultErrorMessage);
    }
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      setError('');
      await googleAuth();
      history.push('/');
    } catch (error) {
      setError(error.message ? error.message : defaultErrorMessage);
    }
    setLoading(false);
  };
  const signInWithGithub = async () => {
    setLoading(true);
    try {
      setError('');
      await githubAuth();
      history.push('/');
    } catch (error) {
      setError(error.message ? error.message : defaultErrorMessage);
    }
    setLoading(false);
  };
  return (
    <SignInContainer>
      <ImageContainer>
        <img src={signInImage} alt="sign in background" />
        <div className="company__info">
          <img src={logo} alt="shoey logo" />
          <p className="company_desc">A central hub to find a perfect sole.</p>
        </div>
      </ImageContainer>
      <SignInFormContainer>
        <p className="auth__message">Already a memeber?</p>
        <h1 className="auth__heading">Sign in with shoey.</h1>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        <form className={classes.form} onSubmit={signInForm}>
          <TextField
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            variant="outlined"
            label="Email ID"
            color="primary"
            fullWidth
          />
          <TextField
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            variant="outlined"
            label="Password"
            color="primary"
            margin="normal"
            fullWidth
          />
          <p>
            <Link to="/forgot-password">forgot password?</Link>
          </p>
          {error && <p className="error_message">{error}</p>}
          {loading ? (
            <CircularProgress className={classes.loadingSpinner} />
          ) : (
            <Button className={classes.buttonStyles} type="submit" color="primary" variant="contained">
              Sign in
            </Button>
          )}
        </form>
        <Divider>Or</Divider>
        <SignInProvider>
          <Paper elevation={3} className={classes.signInProvider} onClick={signInWithGoogle}>
            <LazyImage src={googleIcon} alt="google logo" className={classes.signUpProviderLogo} />
            <h5 className={classes.signInProviderText}>Sign in with Google</h5>
          </Paper>
          <Paper elevation={3} className={classes.signInProvider} onClick={signInWithGithub}>
            <LazyImage src={githubIcon} alt="github logo" className={classes.signUpProviderLogo} />
            <h5 className={classes.signInProviderText}>Sign in with Github</h5>
          </Paper>
        </SignInProvider>
      </SignInFormContainer>
    </SignInContainer>
  );
};

export default SignIn;
