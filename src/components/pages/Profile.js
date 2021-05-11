import React, { useState, forwardRef } from 'react';
import styled from 'styled-components';
import { theme, mixins, media } from '../../styles';
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
  AppBar,
  withStyles,
  Box,
  Tabs,
  Tab,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import { formatSecondsToDate } from '../../utils';
import { Link } from 'react-router-dom';
import { deleteUserAccount, updateUserDetails, getUserData } from '../../lib/firestore/userData';
import { useDispatch, useSelector } from 'react-redux';
import { signoutUser, setUser } from '../../redux';
import { deleteUser } from '../../lib/firebase';
import { ProgressBar } from '../index';
import PropTypes from 'prop-types';
import { deleteUserPic } from '../../lib/storage/userData';

const { colors, transitionTime } = theme;

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: colors.blue,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  appBar: {
    boxShadow: 'none',
  },
  gender: {
    marginTop: '20px',
  },
}));

const StyledAppBar = withStyles({
  root: {
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})((props) => <AppBar {...props} />);

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: '90%',
      width: '100%',
      backgroundColor: colors.blue,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'uppercase',
    color: colors.black,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(13),
    marginRight: theme.spacing(1),
    padding: '10px 20px',
    backgroundColor: colors.grey3,
    '&:focus': {
      opacity: 1,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(10),
      padding: '5px 10px',
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const ProfileContainer = styled.section`
  margin: 30px 50px;

  .profile__para {
    margin: 10px;
    color: ${colors.darkGrey};
    margin: 5px 0px 20px;
    ${media.tablet`
    font-size: 14px;
    `}
  }
  .joined__on {
    color: ${colors.blue};
  }
  .tab__heading {
    color: ${colors.blue};
    font-size: 22px;
    letter-spacing: 1px;
    margin: 0;
    text-transform: uppercase;
    ${media.tablet`
    font-size: 18px;
    `}
  }
  ${media.tabletL`
  margin: 30px 10px;
  `}
`;

const UserInfoContainer = styled.section`
  ${mixins.flexCenter};
  flex-direction: column;
  text-align: center;
  h1 {
    font-size: 25px;
    font-weight: normal;
    margin: 10px;
  }
`;
const UserActionsContainer = styled.section`
  margin-top: 30px;
`;
const UserDetailsPanel = styled(TabPanel)`
  margin: 20px auto 20px;
  max-width: 60%;
  border: 1px solid ${colors.grey1};
  padding: 20px;
  border-radius: 10px;
  .MuiBox-root-30 {
    padding: 0px;
  }
  .user__pic__container {
    display: flex;
    align-items: center;
    margin: 40px 0px 20px;
    label input {
      height: 0;
      width: 0;
      opacity: 0;
    }
    label {
      margin-left: 10px;
      padding: 7px 10px;
      border: 2px solid ${colors.blue};
      font-size: 13px;
      background-color: ${colors.blue};
      color: ${colors.white};
      border-radius: 5px;
      transition: ${transitionTime.t4};
      &:hover,
      &:focus {
        background-color: transparent;
        color: ${colors.blue};
      }
    }
    button {
      font-size: 13px;
      text-transform: none;
      margin-left: 10px;
    }
  }
  .output__file {
    margin: 10px 0px;
    .file__name {
      font-weight: 500;
      color: ${colors.textColor};
    }
  }
  .user__details__container {
    margin-bottom: 20px;
    .MuiFormControl-root {
      margin-bottom: 20px;
    }
    input {
      background-color: ${colors.grey3};
    }
    .user__details__submit {
      ${mixins.flexCenter};
      a {
        text-transform: none;
      }
      button {
        margin-right: 10px;
        text-transform: none;
      }
    }
  }
  ${media.tabletL`
  max-width:100%;
  `}
`;

const Profile = () => {
  const { userDetails } = useSelector((state) => state.user);
  const { displayName, email, phoneNumber, photoURL, createdAt, gender } = userDetails;

  const dName = displayName ? displayName : '';
  const pNumber = phoneNumber ? phoneNumber : '';
  const initialGender = gender ? gender : '';
  const fileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  const [userName, setUserName] = useState(dName);
  const [userPhoneNumber, setUserPhoneNumber] = useState(pNumber);
  const [open, setOpen] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [tabNumber, setTabNumber] = useState(0);
  const [genderValue, setGenderValue] = useState(initialGender);

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
  const handleTabChange = (event, newValue) => {
    setTabNumber(newValue);
  };
  const handleUserGender = (event) => {
    setGenderValue(event.target.value);
  };

  const DeleteUserAccount = async () => {
    handleClose();
    await deleteUserAccount(email); //firestore data
    await deleteUserPic(email); //storage user pic
    await deleteUser(); //authentication delete
    dispatch(signoutUser()); //sign out user and push to home page.
  };

  const updateUserDetailsForm = async (event) => {
    event.preventDefault();
    const updatedDetails = {
      displayName: userName,
      phoneNumber: userPhoneNumber,
      gender: genderValue,
    };
    await updateUserDetails(email, updatedDetails);
    const userDataRes = await getUserData(userDetails);
    dispatch(setUser(userDataRes));
    backdropClose();
  };

  const handleUserPhotoUpload = (event) => {
    const fileSelected = event.target.files[0];

    if (fileSelected && fileTypes.includes(fileSelected.type)) {
      setFile(fileSelected);
      setFileError(null);
    } else {
      setFileError('please select a valid file type (png or jpeg).');
      setFile(null);
    }
  };

  return (
    <ProfileContainer>
      <UserInfoContainer>
        <Avatar src={photoURL} alt={email} className={classes.avatar} />
        <h1>Welcome, {displayName ? displayName : email}...</h1>
        <p className="joined__on"> Joined on {formatSecondsToDate(createdAt.seconds)}</p>
        <p className="profile__para">Manage your info, shipping address to make Shoey work better for you.</p>
      </UserInfoContainer>
      <UserActionsContainer>
        <StyledAppBar position="static" className={classes.appBar}>
          <StyledTabs aria-label="User actions tab" className={classes.tab} value={tabNumber} onChange={handleTabChange}>
            <StyledTab label="User Details" {...a11yProps(0)} />
            <StyledTab label="Shipping Address" {...a11yProps(1)} />
            <StyledTab label="Change Password" {...a11yProps(2)} />
          </StyledTabs>
        </StyledAppBar>
        <UserDetailsPanel value={tabNumber} index={0}>
          <h1 className="tab__heading">Personal info</h1>
          <p className="profile__para">Basic info, like your name and photo, that you use on Shoey services.</p>
          <div className="user__pic__container">
            <Avatar src={photoURL} alt={email} className={classes.avatar} />
            <label>
              <input type="file" onChange={handleUserPhotoUpload} />
              <span>{photoURL ? 'Upload new pic' : 'Upload pic'}</span>
            </label>
          </div>

          <div className="output__file">
            {fileError && <div className="error_message">{fileError}</div>}
            {file && <div className="file__name">File name: {file.name}</div>}
            {file && <ProgressBar file={file} setFile={setFile} userDetails={userDetails} />}
          </div>
          <div className="user__details__container">
            <form onSubmit={updateUserDetailsForm}>
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
              <FormControl component="fieldset" className={classes.gender}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={genderValue} onChange={handleUserGender}>
                  <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                  <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                  <FormControlLabel value="other" control={<Radio color="primary" />} label="Other" />
                </RadioGroup>
              </FormControl>
              <div className="user__details__submit">
                <Button variant="contained" color="primary" type="submit" onClick={backdropOpen}>
                  Save
                </Button>
                <Button variant="contained" component={Link} to="/">
                  Cancel
                </Button>
                <Backdrop className={classes.backdrop} open={openBackdrop}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              </div>
            </form>
          </div>
          <div className="user__password__reset__container">
            <h1 className="tab__heading">Close Account</h1>
            <p className="profile__para">Delete your account and account data .</p>
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
        </UserDetailsPanel>
      </UserActionsContainer>
    </ProfileContainer>
  );
};

export default Profile;
