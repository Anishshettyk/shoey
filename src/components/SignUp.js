import React, { useState } from 'react';
import styled from 'styled-components';
import { LazyImage } from './index';
import { useAuth } from '../context/AuthContext';
import { theme } from '../styles';
import signUpImage from '../images/signup.svg';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

import googleIcon from '../images/googleIcon.svg';
import twitterIcon from '../images/twitterIcon.svg';
import logo from '../images/shoey_logo.svg';

const { colors, navHeight } = theme;

const SignUpContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  height: calc(100vh - ${navHeight});
  margin-top: ${navHeight};
`;
const SignUpForm = styled.section`
  margin: 20px 60px;
  form {
    display: flex;
    flex-direction: column;
  }
  .signUp__message {
    text-transform: uppercase;
    color: ${colors.grey2};
    font-weight: bold;
  }
  .signUp__heading {
    color: ${colors.textColor};
    font-weight: bold;
    font-size: 40px;
    margin: 0;
  }
`;
const Divider = styled.p`
  margin: 30px 0px 0px 0px;
  text-align: center;
  position: relative;
  overflow: hidden;
  &:before {
    position: absolute;
    width: 35%;
    height: 2px;
    top: 50%;
    left: 60%;
    background-color: ${colors.grey1};
    content: '';
  }
  &:after {
    position: absolute;
    width: 35%;
    height: 2px;
    top: 50%;
    right: 60%;
    background-color: ${colors.grey1};
    content: '';
  }
`;
const SignUpProvider = styled.div`
  display: Flex;
  justify-content: space-around;
`;
const ImageContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  .signUp__company {
    position: absolute;
    top: 5%;
    left: 10%;
    img {
      max-width: 130px;
    }
    p {
      margin: 0;
    }
  }
  .signUp_sidebar_image {
    background-color: ${colors.grey3};
    padding: 0px 20px;
    width: 100%;
    min-height: 100%;
    position: absolute;
    max-height: 100vh;
  }
`;

const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      margin: '15px 0px',
    },
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
    '& img': {
      maxWidth: '32px',
      backgroundColor: 'transparent',
    },
  },
  signUpProviderText: {
    marginLeft: '10px',
  },
}));

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const classes = useStyles();

  const signUpSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(email, password);
    } catch {}
  };

  return (
    <SignUpContainer>
      <ImageContainer>
        <img src={signUpImage} alt="sign up side" className="signUp_sidebar_image" />
        <div className="signUp__company">
          <img src={logo} alt="" />
          <p className="company_desc">A central hub to find a perfect sole.</p>
        </div>
      </ImageContainer>
      <SignUpForm>
        <p className="signUp__message">Start for free</p>
        <h1 className="signUp__heading">Sign up to Shoey.</h1>
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
          <Button type="submit" color="primary" variant="contained" className={classes.buttonStyles}>
            CREATE ACCOUNT
          </Button>
        </form>
        <Divider>or</Divider>
        <SignUpProvider>
          <Paper elevation={3} className={classes.signUpProvider}>
            <LazyImage src={googleIcon} alt="google logo" className={classes.signUpProviderLogo} />
            <h5 className={classes.signUpProviderText}>Sign up with Google</h5>
          </Paper>
          <Paper elevation={3} className={classes.signUpProvider}>
            <LazyImage src={twitterIcon} alt="google logo" className={classes.signUpProviderLogo} />
            <h5 className={classes.signUpProviderText}>Sign up with Twitter</h5>
          </Paper>
        </SignUpProvider>
      </SignUpForm>
    </SignUpContainer>
  );
};

export default SignUp;
