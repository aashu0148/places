const initialState = {
  auth: false,
  id: "",
  name: "",
  places: [],
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
      myState.places = action.places;
      myState.fav = action.fav;
      action.userPhoto = action.photo;
      return myState;
    }
    default:
      return state;
  }
};

export default reducer;
