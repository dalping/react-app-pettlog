const init = { open: false, images: [] };

export default function viewer_reducer(state = init, action) {
  if (action.type === "test") {
    return {
      ...state,
      open: action.payload.open,
      images: action.payload.images,
    };
  } else {
    return state;
  }
}
