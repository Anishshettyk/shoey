import { useState, useEffect } from 'react';
import { storage, db } from '../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux';
import { getUserData } from '../firestore/userData';

const useStorage = (file, userDetails) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const { email } = userDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    const storageRef = storage.ref(`/userPics/${email}`);
    const userRef = db.doc(`users/${email}`);
    storageRef.put(file).on(
      'state_changed',
      (snapshot) => {
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => {
        setError(error);
      },
      async () => {
        const URL = await storageRef.getDownloadURL();
        userRef.update({ photoURL: URL });
        setUrl(URL);
      }
    );
  }, [file, email]);

  useEffect(() => {
    const refreshProfilePage = async () => {
      const userDataRes = await getUserData(userDetails);
      dispatch(setUser(userDataRes));
    };
    if (url) {
      refreshProfilePage();
    }
  }, [dispatch, url, userDetails]);

  return { url, error, progress };
};

export default useStorage;
