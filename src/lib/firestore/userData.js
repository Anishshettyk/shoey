// storeUserData and getUserData can be combined to a single function but it will be hard to read and bulky after combination.

import { db } from '../firebase';

export const storeUserData = async (userAuth) => {
  let userData = {};
  if (!userAuth) return;

  //get user details if any
  const userref = db.doc(`users/${userAuth.email}`);
  const snapshot = await userref.get();

  //if no details store it in database.
  if (!snapshot.exists) {
    const createdAt = new Date();

    try {
      await userref.set({ ...userAuth, createdAt });
      console.log('user data is saved to database');
      //after saving get that user details
      userData = getUserData(userAuth);
    } catch (err) {
      console.error('error creating user : ', err.message);
    }
  }
  //return the user data after saving and retrieving.
  return userData;
};

export const getUserData = async (userAuth) => {
  let userData = {};
  if (!userAuth) return;

  const userref = db.doc(`users/${userAuth.email}`);
  const snapshot = await userref.get();

  //if user return user details.
  if (snapshot.exists) {
    userData = snapshot.data();
    //otherwise save user details to database and return the data retrived.
  } else {
    userData = storeUserData(userAuth);
  }

  return userData;
};

export const deleteUserAccount = async (email) => {
  try {
    await db.doc(`users/${email}`).delete();
    console.log(`user account of ${email} is deleted from database and records.`);
  } catch (error) {
    console.error('Error deleting user account returned', error);
  }
};
