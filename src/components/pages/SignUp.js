import React, { useState } from 'react';
import styled from 'styled-components';
import { theme, media, mixins } from '../../styles';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { googleAuth, githubAuth, signup } from '../../lib/firebase';
import { useDispatch } from 'react-redux';
import { makeNotification } from '../../redux';

import googleIcon from '../../images/googleIcon.svg';
import githubIcon from '../../images/github_icon.svg';
import shoey__icon from '../../images/shoey__icon.png';

const { colors } = theme;

const SignUpContainer = styled.main`
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .img__container {
    padding: 20px;
    margin-top: 1rem;
    border-radius: 50%;
    ${mixins.shadow};
    .shoey__icon {
      width: 50px;
      height: 50px;
    }
  }

  .auth__heading {
    margin-top: 1rem;
    color: ${colors.textColor};
    font-size: 20px;
    font-weight: 500;
    span {
      font-weight: 600;
      font-size: 25px;
    }
  }
  ${media.phablet`
  max-width:100%;
  margin:0;
  `}
`;

const Divider = styled.p`
  ${mixins.divider};
`;

const FormContainer = styled.section`
  padding: 1rem 2rem;
`;
const StyledTextField = styled(TextField)`
  background-color: ${colors.grey3};
`;
const AuthAltContainer = styled.div`
  text-align: center;
  p {
    color: ${colors.textColor};
    span {
      font-weight: 700;
    }
    &:hover {
      opacity: 0.7;
    }
    ${media.phablet`
    font-size:13px;
    `}
  }
`;
const AuthProviderContainer = styled.div`
  .container {
    margin: 20px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${mixins.shadow};
    border-radius: 5px;
    .logo {
      width: 25px;
      margin-right: 10px;
    }
    .text {
      color: ${colors.textColor};
    }
    &:hover,
    &:focus {
      background-color: ${colors.grey3};
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: '10px 0px',
    },
  },
  loading: {
    margin: '0 auto',
  },
  buttonStyles: {
    marginTop: 10,
    width: '100%',
    padding: '15px 20px',
    fontWeight: '500',
    color: colors.white,
    letterSpacing: 1,
  },
}));

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const signInForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await signup(email, password);
      history.push('/profile');
    } catch (error) {
      dispatch(makeNotification({ message: error.message, variant: 'error', duration: null }));
    }
    setLoading(false);
  };

  const signUpWithGoogle = async () => {
    setLoading(true);
    try {
      await googleAuth();
      history.push('/profile');
    } catch (error) {
      dispatch(makeNotification({ message: error.message, variant: 'error', duration: null }));
    }
    setLoading(false);
  };
  const signUpWithGithub = async () => {
    setLoading(true);
    try {
      await githubAuth();
      history.push('/profile');
    } catch (error) {
      dispatch(makeNotification({ message: error.message, variant: 'error', duration: null }));
    }
    setLoading(false);
  };

  return (
    <SignUpContainer>
      <div className="img__container">
        <img src={shoey__icon} alt="shoey icon" className="shoey__icon" />
      </div>
      <h1 className="auth__heading">
        <span>Create</span> your free account.
      </h1>
      <FormContainer>
        <form className={classes.form} onSubmit={signInForm}>
          <StyledTextField
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            variant="outlined"
            label="Email ID"
            color="primary"
            fullWidth
          />
          <StyledTextField
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            variant="outlined"
            label="Password"
            color="primary"
            margin="normal"
            fullWidth
          />

          {loading ? (
            <CircularProgress className={classes.loading} />
          ) : (
            <Button type="submit" color="primary" variant="contained" className={classes.buttonStyles}>
              CREATE ACCOUNT
            </Button>
          )}
        </form>
        <AuthAltContainer>
          <Link to="/signin">
            <p>
              Already have an account? <span>sign in</span>
            </p>
          </Link>
        </AuthAltContainer>
        <Divider>Or</Divider>
        <AuthProviderContainer>
          <div className="container" onClick={signUpWithGoogle}>
            <img src={googleIcon} alt="google logo" className="logo" />
            <h5 className="text">Sign up with Google</h5>
          </div>
          <div className="container" onClick={signUpWithGithub}>
            <img src={githubIcon} alt="github logo" className="logo" />
            <h5 className="text">Sign up with Github</h5>
          </div>
        </AuthProviderContainer>
      </FormContainer>
    </SignUpContainer>
  );
};

export default SignUp;
