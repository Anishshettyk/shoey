const initialState = {
  name: '',
  emailID: '',
  shippingAddress: {},
  contactDetails: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
