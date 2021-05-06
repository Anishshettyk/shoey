import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { theme, mixins } from '../../styles';
import { Avatar, Button, makeStyles, TextField } from '@material-ui/core';
import { formatSecondsToDate } from '../../utils';

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
      ${mixins.flexCenter};
      flex-direction: column;
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
      button {
        margin-right: 10px;
        text-transform: none;
      }
    }
  }
`;
const UserShippingAddressContainer = styled.div``;

const Profile = () => {
  const { userDetails } = useSelector((state) => state.user);

  const [userName, setUserName] = useState(userDetails?.displayName ? userDetails?.displayName : '');
  const [userEmail, setUserEmail] = useState(userDetails?.email ? userDetails?.email : '');
  const [userPhoneNumber, setUserPhoneNumber] = useState(userDetails?.phoneNumber ? userDetails?.phoneNumber : '');
  const [userDetailsButtons, setUserDetailsButtons] = useState(false);

  const classes = useStyles();

  const ToggleUserDetailsButton = () => {
    const { displayName, email, phoneNumber } = userDetails;

    if (displayName === userName && phoneNumber === userPhoneNumber && email === userEmail) {
      setUserDetailsButtons(false);
    } else {
      setUserDetailsButtons(true);
    }
  };

  return (
    <ProfileContainer>
      <UserDetailsContainer>
        <h1 className="heading">Your Details</h1>
        <div className="content__container">
          <div className="left__user__data">
            <Avatar src={userDetails.photoURL} alt={userDetails.email} className={classes.avatar} />
            <p>Joined on {formatSecondsToDate(userDetails.createdAt.seconds)}</p>
            <div className="user__button__container">
              <Button variant="contained" color="primary">
                {userDetails.photoURL ? 'Upload new picture' : 'Add picture'}
              </Button>
              <Button variant="contained" color="secondary">
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
                  <Button variant="contained">Cancel</Button>
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
