import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { theme } from '../../styles';
import { Avatar, Button, makeStyles, TextField } from '@material-ui/core';
import { formatSecondsToDate } from '../../utils';
import { Link } from 'react-router-dom';
import { deleteUserAccount } from '../../lib/firestore/userData';
import { useDispatch } from 'react-redux';
import { signoutUser } from '../../redux';
import { deleteUser } from '../../lib/firebase';

const { colors } = theme;

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(3),
      width: '80%',
    },
  },
}));

const ProfileContainer = styled.section`
  min-height: 100vh;
  margin: 30px 50px;
  .heading {
    color: ${colors.blue};
    padding-bottom: 5px;
    border-bottom: 1px solid ${colors.grey1};
    font-size: 20px;
  }
`;

const UserDetailsContainer = styled.div`
  .content__container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin: 0px 60px;
    .left__user__data {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-top: 10vh;
      p {
        color: ${colors.grey2};
        font-weight: bold;
        font-size: 14px;
      }
      .user__button__container {
        button {
          margin: 0px 10px;
          text-transform: none;
        }
      }
    }
    .right__user__data {
      margin: 20px 80px;
    }
    .user__details__button__container {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      a {
        text-transform: none;
      }
      button {
        margin-left: 10px;
        text-transform: none;
      }
    }
  }
`;
const UserShippingAddressContainer = styled.div``;

const Profile = () => {
  const {
    userDetails: { displayName, email, phoneNumber, photoURL, createdAt },
  } = useSelector((state) => state.user);

  const dName = displayName ? displayName : '';
  const emailID = email ? email : '';
  const pNumber = phoneNumber ? phoneNumber : '';

  const [userName, setUserName] = useState(dName);
  const [userEmail, setUserEmail] = useState(emailID);
  const [userPhoneNumber, setUserPhoneNumber] = useState(pNumber);
  const [userDetailsButtons, setUserDetailsButtons] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();

  const ToggleUserDetailsButton = () => {
    if (displayName === userName && phoneNumber === userPhoneNumber && email === userEmail) {
      setUserDetailsButtons(false);
    } else {
      setUserDetailsButtons(true);
    }
  };

  const DeleteUserAccount = async () => {
    await deleteUserAccount(email);
    dispatch(signoutUser());
    await deleteUser();
  };

  return (
    <ProfileContainer>
      <UserDetailsContainer>
        <h1 className="heading">Your Details</h1>
        <div className="content__container">
          <div className="left__user__data">
            <Avatar src={photoURL} alt={email} className={classes.avatar} />
            <p>Joined on {formatSecondsToDate(createdAt.seconds)}</p>
            <div className="user__button__container">
              <Button variant="contained" color="primary">
                {photoURL ? 'Upload new picture' : 'Add picture'}
              </Button>
              <Button variant="contained" color="secondary" onClick={() => DeleteUserAccount()}>
                Delete Account
              </Button>
            </div>
          </div>
          <div className={classes.inputContainer}>
            <TextField
              label="Name"
              variant="outlined"
              color="primary"
              fullWidth
              value={userName}
              onChange={(event) => {
                setUserName(event.target.value);
                ToggleUserDetailsButton();
              }}
            />
            <TextField
              label="Email id"
              variant="outlined"
              color="primary"
              fullWidth
              value={userEmail}
              onChange={(event) => {
                setUserEmail(event.target.value);
                ToggleUserDetailsButton();
              }}
            />
            <TextField
              label="Phone number"
              variant="outlined"
              color="primary"
              fullWidth
              value={userPhoneNumber}
              onChange={(event) => {
                setUserPhoneNumber(event.target.value);
                ToggleUserDetailsButton();
              }}
            />
            <Button color="primary" variant="outlined">
              Update Password
            </Button>
            <div className="user__details__button__container">
              {userDetailsButtons ? (
                <>
                  <Button variant="contained" component={Link} to="/">
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary">
                    Save
                  </Button>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </UserDetailsContainer>
      <UserShippingAddressContainer>
        <h1 className="heading">Shipping Address</h1>
      </UserShippingAddressContainer>
    </ProfileContainer>
  );
};

export default Profile;
