import React, { useState, forwardRef, useEffect } from "react";
import styled from "styled-components";
import { theme, mixins, media } from "../../styles";
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
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { formatSecondsToDate } from "../../utils";
import { Link } from "react-router-dom";
import {
  deleteUserAccount,
  updateUserDetails,
  getUserData,
  addShippingAddress,
} from "../../lib/firestore/userData";
import { useDispatch, useSelector } from "react-redux";
import {
  signoutUser,
  setUser,
  makeNotification,
  setProfileTab,
} from "../../redux";
import { deleteUser } from "../../lib/firebase";
import { ProgressBar, Kawaii, BackdropMaker } from "../index";
import PropTypes from "prop-types";
import { deleteUserPic } from "../../lib/storage/userData";
import { Helmet } from "react-helmet";
import commerce from "../../lib/commerce";
import { useHistory } from "react-router-dom";

const { colors, transitionTime } = theme;

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  appBar: {
    boxShadow: "none",
  },
  gender: {
    marginTop: "20px",
  },
}));

const StyledAppBar = withStyles({
  root: {
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
})((props) => <AppBar {...props} />);

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: "90%",
      width: "100%",
      backgroundColor: colors.blue,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "uppercase",
    color: colors.black,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(13),
    marginRight: theme.spacing(1),
    padding: "10px 20px",
    backgroundColor: colors.grey3,
    "&:focus": {
      opacity: 1,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.pxToRem(10),
      padding: "5px 10px",
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
    color: ${colors.black};
    padding: 5px 10px;
    background-color: ${colors.green};
    border-radius: 20px;
    font-weight: 500;
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
  const { userDetails, profileTab, paymentPending } = useSelector(
    (state) => state.user
  );
  const { displayName, email, phoneNumber, photoURL, createdAt, gender } =
    userDetails;

  const checkDetailsExist = (data, type) => {
    let dataToResolve;
    if (data?.shippingAddress) {
      dataToResolve = data.shippingAddress[0];
      if (dataToResolve[type]) {
        return dataToResolve[type];
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  const dName = displayName ? displayName : "";
  const pNumber = phoneNumber ? phoneNumber : "";
  const initialGender = gender ? gender : "";
  const fileTypes = ["image/png", "image/jpeg", "image/jpg"];

  const [userName, setUserName] = useState(dName);
  const [userPhoneNumber, setUserPhoneNumber] = useState(pNumber);
  const [open, setOpen] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [tabNumber, setTabNumber] = useState(profileTab ? profileTab : 0);
  const [genderValue, setGenderValue] = useState(initialGender);

  //shipping address
  const [address, setAddress] = useState(
    checkDetailsExist(userDetails, "address")
  );
  const [landmark, setLandmark] = useState(
    checkDetailsExist(userDetails, "landmark")
  );
  const [pincode, setPincode] = useState(
    checkDetailsExist(userDetails, "pincode")
  );
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(
    checkDetailsExist(userDetails, "country")
  );
  const [subDivisions, setSubDivisions] = useState([]);
  const [subDivision, setSubDivision] = useState(
    checkDetailsExist(userDetails, "subDivison")
  );

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  //get all country details
  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await commerce.services.localeListCountries();
        if (data && data?.countries) {
          setCountries(data.countries);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCountries();
  }, []);

  useEffect(() => {
    const getCountrySubDivisions = async (countryCode) => {
      try {
        const data = await commerce.services.localeListSubdivisions(
          countryCode
        );
        if (data && data?.subdivisions) {
          setSubDivisions(data.subdivisions);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (country !== null && country.length > 0) {
      getCountrySubDivisions(country);
    }
  }, [country]);

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
    dispatch(setProfileTab(newValue));
  };
  const handleUserGender = (event) => {
    setGenderValue(event.target.value);
  };

  const DeleteUserAccount = async () => {
    handleClose();
    backdropOpen();
    await deleteUserAccount(email); //firestore data
    await deleteUserPic(email); //storage user pic
    await deleteUser(); //authentication delete
    backdropClose();
    dispatch(signoutUser()); //sign out user and push to home page.
    dispatch(
      makeNotification({
        message: "Account deleted successfully.",
        variant: "success",
        duration: 3000,
      })
    );
  };

  const updateUserDetailsForm = async (event) => {
    event.preventDefault();
    const updatedDetails = {
      displayName: userName,
      phoneNumber: userPhoneNumber,
      gender: genderValue,
    };
    const resultType = await updateUserDetails(email, updatedDetails);
    const userDataRes = await getUserData(userDetails);
    dispatch(setUser(userDataRes));
    backdropClose();
    if (resultType === "success") {
      dispatch(
        makeNotification({
          message: "Profile details updated successfully.",
          variant: "success",
          duration: 3000,
        })
      );
    }
    if (resultType === "error") {
      dispatch(
        makeNotification({
          message: "Unexpected error occured. Please try again.",
          variant: "error",
          duration: 3000,
        })
      );
    }
  };

  const handleUserPhotoUpload = (event) => {
    const fileSelected = event.target.files[0];

    if (fileSelected && fileTypes.includes(fileSelected.type)) {
      setFile(fileSelected);
      setFileError(null);
    } else {
      dispatch(
        makeNotification({
          message: "please select a valid file type (png or jpeg).",
          variant: "warning",
          duration: 4000,
        })
      );
      setFileError("please select a valid file type (png or jpeg).");
      setFile(null);
    }
  };

  const saveShippingAddress = async () => {
    let response;
    response = await addShippingAddress(email, {
      address,
      landmark,
      pincode,
      country,
      subDivision,
    });
    if (response.status === "success") {
      dispatch(
        makeNotification({
          message: response.message,
          variant: "success",
          duration: 2000,
        })
      );
      //retrive user details back
      const userDataRes = await getUserData(userDetails);
      dispatch(setUser(userDataRes));
      if (paymentPending) {
        history.push("/cart");
        dispatch(
          makeNotification({
            message: "proceed with payment",
            variant: "info",
            duration: 2000,
          })
        );
      }
    } else {
      dispatch(
        makeNotification({
          message: response.message,
          variant: "error",
          duration: 2000,
        })
      );
    }
  };

  return (
    <ProfileContainer>
      <Helmet>
        <title>Shoey - Your Profile</title>
      </Helmet>
      <UserInfoContainer>
        <Avatar src={photoURL} alt={email} className={classes.avatar} />
        <h1>Welcome, {displayName ? displayName : email}...</h1>
        <p className='joined__on'>
          {" "}
          Joined on {formatSecondsToDate(createdAt.seconds)}
        </p>
        <p className='profile__para'>
          Manage your info, shipping address to make Shoey work better for you.
        </p>
      </UserInfoContainer>
      <UserActionsContainer>
        <StyledAppBar position='static' className={classes.appBar}>
          <StyledTabs
            aria-label='User actions tab'
            className={classes.tab}
            value={tabNumber}
            onChange={handleTabChange}
          >
            <StyledTab label='User Details' {...a11yProps(0)} />
            <StyledTab label='Shipping Address' {...a11yProps(1)} />
            <StyledTab label='Change Password' {...a11yProps(2)} />
          </StyledTabs>
        </StyledAppBar>
        <UserDetailsPanel value={tabNumber} index={0}>
          <h1 className='tab__heading'>Personal info</h1>
          <p className='profile__para'>
            Basic info, like your name and photo, that you use on Shoey
            services.
          </p>
          <div className='user__pic__container'>
            <Avatar src={photoURL} alt={email} className={classes.avatar} />
            <label>
              <input type='file' onChange={handleUserPhotoUpload} />
              <span>{photoURL ? "Upload new pic" : "Upload pic"}</span>
            </label>
          </div>

          <div className='output__file'>
            {fileError && <div className='error_message'>{fileError}</div>}
            {file && <div className='file__name'>File name: {file.name}</div>}
            {file && (
              <ProgressBar
                file={file}
                setFile={setFile}
                userDetails={userDetails}
              />
            )}
          </div>
          <div className='user__details__container'>
            <form onSubmit={updateUserDetailsForm}>
              <TextField
                type='text'
                label='Name'
                variant='outlined'
                color='primary'
                fullWidth
                value={userName}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
              <TextField
                type='number'
                label='Phone number'
                variant='outlined'
                color='primary'
                fullWidth
                value={userPhoneNumber}
                onChange={(event) => {
                  setUserPhoneNumber(event.target.value);
                }}
              />
              <FormControl component='fieldset' className={classes.gender}>
                <FormLabel component='legend'>Gender</FormLabel>
                <RadioGroup
                  aria-label='gender'
                  name='gender1'
                  value={genderValue}
                  onChange={handleUserGender}
                >
                  <FormControlLabel
                    value='female'
                    control={<Radio color='primary' />}
                    label='Female'
                  />
                  <FormControlLabel
                    value='male'
                    control={<Radio color='primary' />}
                    label='Male'
                  />
                  <FormControlLabel
                    value='other'
                    control={<Radio color='primary' />}
                    label='Other'
                  />
                </RadioGroup>
              </FormControl>
              <div className='user__details__submit'>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  onClick={backdropOpen}
                >
                  Save
                </Button>
                <Button variant='contained' component={Link} to='/'>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
          <div className='user__password__reset__container'>
            <h1 className='tab__heading'>Close Account</h1>
            <p className='profile__para'>
              Delete your account and account data .
            </p>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleClickOpen}
            >
              Delete Account
            </Button>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-labelledby='alert-dialog-slide-title'
              aria-describedby='alert-dialog-slide-description'
            >
              <DialogTitle id='alert-dialog-slide-title'>
                {"Are you sure you want to delete account?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-slide-description'>
                  All the data like your cart, shipping address and products
                  purchased will be lost.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color='primary'>
                  Close
                </Button>
                <Button onClick={DeleteUserAccount} color='secondary'>
                  Delete account
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </UserDetailsPanel>
        <UserDetailsPanel value={tabNumber} index={1}>
          <h1 className='tab__heading'>Shipping address</h1>
          <p className='profile__para'>
            Please add your shipping address, so that we can ship your orders.
          </p>
          <form className='user__details__container'>
            <TextField
              type='text'
              label='Address'
              variant='outlined'
              color='primary'
              fullWidth
              value={address}
              multiline
              rows={4}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
            <TextField
              type='text'
              label='Landmark'
              variant='outlined'
              color='primary'
              fullWidth
              value={landmark}
              onChange={(event) => {
                setLandmark(event.target.value);
              }}
            />
            <TextField
              type='number'
              label='Pincode'
              variant='outlined'
              color='primary'
              fullWidth
              value={pincode}
              onChange={(event) => {
                setPincode(event.target.value);
              }}
            />
            <FormControl fullWidth variant='outlined'>
              <InputLabel id='demo-simple-select-label'>Country</InputLabel>
              <Select
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                fullWidth
                variant='outlined'
                labelId='demo-simple-select-label'
              >
                {Object.entries(countries).map((country) => (
                  <MenuItem key={country[0]} value={country[0]}>
                    {country[1]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant='outlined'>
              <InputLabel id='country_label'>Sub-division</InputLabel>
              <Select
                labelId='country_label'
                id='contry_select'
                value={subDivision}
                onChange={(event) => setSubDivision(event.target.value)}
                fullWidth
                variant='outlined'
              >
                {Object.entries(subDivisions).map((subDiv) => (
                  <MenuItem key={subDiv[0]} value={subDiv[0]}>
                    {subDiv[1]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              color='primary'
              variant='contained'
              onClick={saveShippingAddress}
            >
              {userDetails?.shippingAddress?.length > 0
                ? "Save address"
                : "Add address"}
            </Button>
          </form>
        </UserDetailsPanel>
      </UserActionsContainer>
      <BackdropMaker open={openBackdrop}>
        <Kawaii name='file' message='We are working on it...' />
      </BackdropMaker>
    </ProfileContainer>
  );
};

export default Profile;
