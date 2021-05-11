import { storage } from '../firebase';

export const deleteUserPic = async (email) => {
  const storageRef = storage.ref();
  const deleteRef = storageRef.child(`/userPics/${email}`);
  try {
    await deleteRef.delete();
    console.log(`user pic of ${email} is deleted`);
  } catch (error) {
    console.log(error.message);
  }
};
