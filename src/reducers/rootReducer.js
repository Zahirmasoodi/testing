const initialState = {
  language: "en",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "en":
      return { language: "en" };
    case "ar":
      return { language: "ar" };
    default:
      return state;
  }
}

export default rootReducer;
