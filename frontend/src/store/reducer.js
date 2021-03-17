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
      myState.userPhoto = action.photo;
      myState.noOfPlaces = action.places.length;
      return myState;
    }
    case "AUTO_LOGIN": {
      let myState = { ...state };
      myState.auth = true;
      myState.id = action.id;
      myState.name = action.name;
      myState.fav = action.fav;
      myState.userPhoto = action.userPhoto;
      myState.noOfPlaces = action.noOfPlaces;
      return myState;
    }
    case "PLACE_UPDATE": {
      let myState = { ...state };
      myState.noOfPlaces = state.noOfPlaces + 1;
      return myState;
    }
    case "LOGOUT": {
      localStorage.removeItem("placesUser");
      let myState = { ...state };
      myState.auth = false;
      myState.id = "";
      myState.name = "";
      myState.fav = [];
      myState.userPhoto = "";
      myState.noOfPlaces = 0;
      return myState;
    }
    default:
      return state;
  }
};

export default reducer;
