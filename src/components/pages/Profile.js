import React, { useState, forwardRef } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles';
import {
  Avatar,
  Button,
  makeStyles,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { formatSecondsToDate } from '../../utils';
import { Link } from 'react-router-dom';
import { deleteUserAccount, updateUserDetails, getUserData } from '../../lib/firestore/userData';
import { useDispatch, useSelector } from 'react-redux';
import { signoutUser, setUser } from '../../redux';
import { deleteUser } from '../../lib/firebase';

const { colors } = theme;

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: colors.blue,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
  const { userDetails } = useSelector((state) => state.user);
  const { displayName, email, phoneNumber, photoURL, createdAt } = userDetails;

  const dName = displayName ? displayName : '';
  const emailID = email ? email : '';
  const pNumber = phoneNumber ? phoneNumber : '';

  const [userName, setUserName] = useState(dName);
  const [userEmail, setUserEmail] = useState(emailID);
  const [userPhoneNumber, setUserPhoneNumber] = useState(pNumber);
  const [open, setOpen] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const backdropOpen = () => {
    setOpenBackdrop(!openBackdrop);
  };
  const backdropClose = () => {
    setOpenBackdrop(false);
  };

  const DeleteUserAccount = async () => {
    handleClose();
    await deleteUserAccount(email);
    dispatch(signoutUser());
    await deleteUser();
  };

  const updateUserDetailsForm = async (event) => {
    event.preventDefault();
    const updatedDetails = {
      displayName: userName,
      phoneNumber: userPhoneNumber,
    };
    await updateUserDetails(email, updatedDetails);
    const userDataRes = await getUserData(userDetails);
    dispatch(setUser(userDataRes));
    backdropClose();
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
              <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                Delete Account
              </Button>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">{'Are you sure you want to delete account?'}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    All the data like your cart, shipping address and products purchased will be lost.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Close
                  </Button>
                  <Button onClick={DeleteUserAccount} color="secondary">
                    Delete account
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
          <form className={classes.inputContainer} onSubmit={updateUserDetailsForm}>
            <TextField
              type="text"
              label="Name"
              variant="outlined"
              color="primary"
              fullWidth
              value={userName}
              onChange={(event) => {
                setUserName(event.target.value);
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
              }}
            />
            <TextField
              type="number"
              label="Phone number"
              variant="outlined"
              color="primary"
              fullWidth
              value={userPhoneNumber}
              onChange={(event) => {
                setUserPhoneNumber(event.target.value);
              }}
            />
            <Button color="primary" variant="outlined">
              Update Password
            </Button>
            <div className="user__details__button__container">
              <Button variant="contained" component={Link} to="/">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit" onClick={backdropOpen}>
                Save
              </Button>
              <Backdrop className={classes.backdrop} open={openBackdrop}>
                <CircularProgress color="inherit" />
              </Backdrop>
            </div>
          </form>
        </div>
      </UserDetailsContainer>
      <UserShippingAddressContainer>
        <h1 className="heading">Shipping Address</h1>
      </UserShippingAddressContainer>
    </ProfileContainer>
  );
};

export default Profile;
