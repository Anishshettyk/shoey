import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux';

const useUserDetails = (email) => {
  const [userDetails, setUserDetails] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = db.doc(`users/${email}`).onSnapshot((snapshot) => {
      setUserDetails(snapshot.data());
      if (userDetails) {
        dispatch(setUser(userDetails));
      }
    });
    return unsubscribe;
  }, [email, userDetails, dispatch]);

  return { userDetails };
};

export default useUserDetails;
