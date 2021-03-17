const initialState = {
  auth: false,
  id: "",
  name: "",
  fav: [],
  userPhoto: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      let myState = { ...state };
      myState.auth = true;
      myState.id = action.id;
      myState.name = action.name;
      myState.fav = action.fav;
      action.userPhoto = action.photo;
      return myState;
    }
    default:
      return state;
  }
};

export default reducer;
