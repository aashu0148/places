const initialState = {
  auth: false,
  id: "",
  name: "",
  dummy: 0,
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
      myState.dummy = 0;
      return myState;
    }
    case "AUTO_LOGIN": {
      let myState = { ...state };
      myState.auth = true;
      myState.id = action.id;
      myState.name = action.name;
      myState.fav = action.fav;
      myState.userPhoto = action.userPhoto;
      myState.dummy = 0;
      return myState;
    }
    case "PLACE_UPDATE": {
      let myState = { ...state };
      myState.dummy = state.dummy + 1;
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
      myState.dummy = 0;
      return myState;
    }
    default:
      return state;
  }
};

export default reducer;
