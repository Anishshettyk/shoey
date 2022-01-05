// storeUserData and getUserData can be combined to a single function but it will be hard to read and bulky after combination.

import { db } from "../firebase";
import firebase from "firebase/app";

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
      console.log("user data is saved to database");
      //after saving get that user details
      userData = getUserData(userAuth);
    } catch (err) {
      console.error("error creating user returned=>", err.message);
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
    console.log(
      `user account of ${email} is deleted from database and records.`
    );
  } catch (error) {
    console.error("Error deleting user account returned=>", error.message);
  }
};

export const updateUserDetails = async (email, updateData) => {
  let outputType = "";
  try {
    await db.doc(`users/${email}`).update({ ...updateData });
    console.log(`user account of ${email} is updated in database.`);
    outputType = "success";
    return outputType;
  } catch (error) {
    console.error("Error updating user account returned=>", error.message);
    outputType = "error";
    return outputType;
  }
};

export const addWishedProducts = async (email, wishedProduct) => {
  let status = "";
  try {
    await db.doc(`users/${email}`).update({
      wishlist: firebase.firestore.FieldValue.arrayUnion(wishedProduct),
    });
    status = "success";
    return { status, message: "Product added to wishlist" };
  } catch (error) {
    status = "error";
    return { status, message: "unexpected error occured, please try again!!" };
  }
};

export const removeWishedProducts = async (email, wishedProduct) => {
  let status = "";
  try {
    await db.doc(`users/${email}`).update({
      wishlist: firebase.firestore.FieldValue.arrayRemove(wishedProduct),
    });
    status = "success";
    return { status, message: "Product removed from wishlist" };
  } catch (error) {
    status = "error";
    return { status, message: "unexpected error occured, please try again!!" };
  }
};

export const addShippingAddress = async (email, shippingAddress) => {
  let status = "";
  try {
    await db.doc(`users/${email}`).update({
      shippingAddress:
        firebase.firestore.FieldValue.arrayUnion(shippingAddress),
    });
    status = "success";
    return { status, message: "Shipping address saved successfully" };
  } catch (error) {
    status = "error";
    return { status, message: "unexpected error occured, please try again!!" };
  }
};

export const addOrderDetails = async (email, orderDetails) => {
  let status = "";
  try {
    await db
      .doc(`users/${email}`)
      .update({
        orderDetails: firebase.firestore.FieldValue.arrayUnion(orderDetails),
      });
    status = "success";
    return { status };
  } catch (error) {
    status = "error";
    return { status, error };
  }
};
