import React, { useState } from 'react';
import styled from 'styled-components';
import { mixins, theme, media } from '../../styles';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { resetPassword } from '../../lib/firebase';
import { useDispatch } from 'react-redux';
import { makeNotification } from '../../redux';

import shoey__icon from '../../images/shoey__icon.png';

const { colors } = theme;

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    padding: '0.5rem 2rem',
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
    fontWeight: '600',
    color: colors.white,
    letterSpacing: 1,
    textTransform: 'none',
    fontSize: '1rem',
  },
}));

const ResetPasswordContainer = styled.section`
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
      font-weight: 800;
    }
  }
  .auth__para {
    color: ${colors.grey2};
    font-weight: 600;
  }
  form {
  }
  .auth__alt {
    text-align: center;
    p {
      color: ${colors.textColor};
      span {
        font-weight: 700;
      }
      &:hover {
        opacity: 0.7;
      }
    }
  }

  ${media.phablet`
  max-width:100%;
  margin:0;
  `}
`;
const StyledTextField = styled(TextField)`
  background-color: ${colors.grey3};
`;

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const classes = useStyles();
  const dispatch = useDispatch();

  const sendEmail = async () => {
    try {
      await resetPassword(email);
      dispatch(
        makeNotification({
          message: 'Email sent successfully. Check your mailbox for further instructions',
          variant: 'success',
          duration: 5000,
        })
      );
    } catch (error) {
      dispatch(makeNotification({ message: error.message, variant: 'error', duration: null }));
    }
  };
  return (
    <ResetPasswordContainer>
      <div className="img__container">
        <img src={shoey__icon} alt="shoey icon" className="shoey__icon" />
      </div>
      <h1 className="auth__heading">
        <span>Forgot </span> your password?.
      </h1>
      <p className="auth__para">Send a reset email link</p>
      <div className={classes.form}>
        <StyledTextField
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          variant="outlined"
          label="Email ID"
          fullWidth
          placeholder="Email ID (required)"
        />
        <Button className={classes.buttonStyles} type="submit" color="primary" variant="contained" onClick={sendEmail}>
          Send email
        </Button>
      </div>
      <Link to="/signin" className="auth__alt">
        <p>
          Remember your password? <span>sign in</span>
        </p>
      </Link>
    </ResetPasswordContainer>
  );
};

export default ResetPassword;
