const initialState = {
  auth: false,
  id: "",
  name: "",
  noOfPlaces: 0,
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
      myState.noOfPlaces = action.places.length;
      action.userPhoto = action.photo;
      return myState;
    }
    case "PLACE_UPDATE": {
      let myState = { ...state };
      myState.noOfPlaces = state.noOfPlaces + 1;
      return myState;
    }
    default:
      return state;
  }
};

export default reducer;
