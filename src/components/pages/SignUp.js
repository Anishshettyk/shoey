import React, { useState } from 'react';
import styled from 'styled-components';
import { LazyImage } from '../index';
import { theme, media, mixins } from '../../styles';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, CircularProgress } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { googleAuth, githubAuth, signup } from '../../lib/firebase';

import signUpImage from '../../images/signup.svg';
import googleIcon from '../../images/googleIcon.svg';
import githubIcon from '../../images/github_icon.svg';
import logo from '../../images/shoey_logo.svg';

const { colors } = theme;

const SignUpContainer = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  ${mixins.visibleLayout}
  ${media.tabletL`
    display:block;
    margin-top:80px;
  `}
`;

const SignUpForm = styled.section`
  margin: 20px 60px;
  form {
    display: flex;
    flex-direction: column;
  }
  ${media.tphone`
  margin: 10px 30px;
  `}
`;
const Divider = styled.p`
  ${mixins.divider};
`;
const SignUpProvider = styled.div`
  display: Flex;
  justify-content: space-around;
  ${media.phablet`
    display:block;
  `}
`;
const ImageContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  .signUp_sidebar_image {
    background-color: ${colors.grey3};
    padding: 0px 20px;
    width: 100%;
    min-height: 100%;
    position: absolute;
    max-height: 100vh;
  }
  ${media.tabletL`
    display:none;
  `}
`;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: '15px 0px',
    },
  },
  loading: {
    margin: '0 auto',
  },
  buttonStyles: {
    width: '30%',
    minWidth: '200px',
    padding: '15px 20px',
  },
  headingStyles: {
    marginTop: '50px',
    margin: '20px 0px',
    padding: '0px',
    fontSize: '40px',
  },
  paraStyles: {
    marginBottom: '40px',
    fontWeight: '200',
    color: colors.grey2,
  },
  signUpProvider: {
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
  signUpProviderText: {
    marginLeft: '10px',
  },
}));

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const history = useHistory();

  const defaultErrorMessage = 'Error occured while creating account please try again.';

  const signUpSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      setError('');
      await signup(email, password);
      history.push('/profile');
    } catch (error) {
      setError(error.message ? error.message : defaultErrorMessage);
    }
    setLoading(false);
  };

  const signUpWithGoogle = async () => {
    setLoading(true);
    try {
      setError('');
      await googleAuth();
      history.push('/profile');
    } catch (error) {
      setError(error.message ? error.message : defaultErrorMessage);
    }
    setLoading(false);
  };
  const signUpWithGithub = async () => {
    setLoading(true);
    try {
      setError('');
      await githubAuth();
      history.push('/profile');
    } catch (error) {
      setError(error.message ? error.message : defaultErrorMessage);
    }
    setLoading(false);
  };

  return (
    <SignUpContainer>
      <ImageContainer>
        <img src={signUpImage} alt="sign up side" className="signUp_sidebar_image" />
        <div className="company__info">
          <img src={logo} alt="shoey logo" />
          <p className="company_desc">A central hub to find a perfect sole.</p>
        </div>
      </ImageContainer>
      <SignUpForm>
        <p className="auth__message">Start for free</p>
        <h1 className="auth__heading">Sign up to Shoey.</h1>
        <p>
          Already a member? <Link to="/signin">Sign in</Link>
        </p>
        <form onSubmit={signUpSubmit} className={classes.root}>
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
          {error && <p className="error_message">{error}</p>}
          {loading ? (
            <CircularProgress className={classes.loading} />
          ) : (
            <Button type="submit" color="primary" variant="contained" className={classes.buttonStyles}>
              CREATE ACCOUNT
            </Button>
          )}
        </form>
        <Divider>or</Divider>
        <SignUpProvider>
          <Paper elevation={3} className={classes.signUpProvider} onClick={signUpWithGoogle}>
            <LazyImage src={googleIcon} alt="google logo" className={classes.signUpProviderLogo} />
            <h5 className={classes.signUpProviderText}>Sign up with Google</h5>
          </Paper>
          <Paper elevation={3} className={classes.signUpProvider} onClick={signUpWithGithub}>
            <LazyImage src={githubIcon} alt="github logo" className={classes.signUpProviderLogo} />
            <h5 className={classes.signUpProviderText}>Sign up with Github</h5>
          </Paper>
        </SignUpProvider>
      </SignUpForm>
    </SignUpContainer>
  );
};

export default SignUp;
