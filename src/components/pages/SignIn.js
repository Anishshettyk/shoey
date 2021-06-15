import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mixins, theme, media } from '../../styles';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { googleAuth, githubAuth, signin } from '../../lib/firebase';
import { useDispatch } from 'react-redux';
import { makeNotification } from '../../redux';
import { Helmet } from 'react-helmet';
import { BackdropMaker, Kawaii } from '../index';

import googleIcon from '../../images/googleIcon.svg';
import githubIcon from '../../images/github_icon.svg';
import shoey__icon from '../../images/shoey__icon.png';

const { colors } = theme;

const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      margin: '10px 0px',
    },
  },
  loadingSpinner: {
    margin: '0px auto',
    textAlign: 'center',
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

const SignInContainer = styled.main`
  max-width: 500px;
  margin: 0 auto;
  ${mixins.flexCenter};
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
      font-size: 25px;
      font-weight: 800;
    }
  }
  ${media.phablet`
  max-width:100%;
  margin:0;
  `}
`;
const FormContainer = styled.section`
  padding: 1rem 2rem;
`;
const AuthAltContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const Divider = styled.p`
  ${mixins.divider};
`;
const StyledTextField = styled(TextField)`
  background-color: ${colors.grey3};
`;
const AuthProviderContainer = styled.div`
  .container {
    margin: 20px 0px;
    ${mixins.flexCenter};
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

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const backdropOpen = () => {
    setOpenBackdrop(!openBackdrop);
  };
  const backdropClose = () => {
    setOpenBackdrop(false);
  };

  const signInForm = async (event) => {
    event.preventDefault();

    backdropOpen();
    try {
      await signin(email, password);
      history.push('/');
    } catch (error) {
      dispatch(makeNotification({ message: error.message, variant: 'error', duration: null }));
    }
    backdropClose();
  };

  const signInWithGoogle = async () => {
    backdropOpen();
    try {
      await googleAuth();
      history.push('/');
    } catch (error) {
      dispatch(makeNotification({ message: error.message, variant: 'error', duration: null }));
    }
    backdropClose();
  };
  const signInWithGithub = async () => {
    backdropOpen();
    try {
      await githubAuth();
      history.push('/');
    } catch (error) {
      dispatch(makeNotification({ message: error.message, variant: 'error', duration: null }));
    }
    backdropClose();
  };
  return (
    <SignInContainer>
      <Helmet>
        <title>Sign in to shoey</title>
      </Helmet>
      <div className="img__container">
        <img src={shoey__icon} alt="shoey icon" className="shoey__icon" />
      </div>
      <h1 className="auth__heading">
        <span>Sign in</span> to Shoey account.
      </h1>
      <FormContainer>
        <form className={classes.form} onSubmit={signInForm}>
          <StyledTextField
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            variant="outlined"
            label="Email ID"
            fullWidth
            placeholder="Email ID (required)"
          />
          <StyledTextField
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            variant="outlined"
            label="Password"
            fullWidth
            placeholder="Password (required)"
          />
          <Button className={classes.buttonStyles} type="submit" color="primary" variant="contained">
            Sign in
          </Button>
        </form>
        <AuthAltContainer>
          <Link to="/signup">
            <p>
              new here? <span>sign up</span>
            </p>
          </Link>
          <Link to="/reset-password">
            <p>
              <span>Forgot your password?</span>
            </p>
          </Link>
        </AuthAltContainer>
        <Divider>Or</Divider>
        <AuthProviderContainer>
          <div className="container" onClick={signInWithGoogle}>
            <img src={googleIcon} alt="google logo" className="logo" />
            <h5 className="text">Sign in with Google</h5>
          </div>
          <div className="container" onClick={signInWithGithub}>
            <img src={githubIcon} alt="github logo" className="logo" />
            <h5 className="text">Sign in with Github</h5>
          </div>
        </AuthProviderContainer>
      </FormContainer>
      <BackdropMaker open={openBackdrop}>
        <Kawaii name="browser" message="we are signing you in" />
      </BackdropMaker>
    </SignInContainer>
  );
};

export default SignIn;
