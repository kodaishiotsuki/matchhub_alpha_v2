import { CLEAR_SELECTED_TRIAL, CREATE_TRIAL, LISTEN_TO_SELECTED_TRIAL } from "./trialConstants";

const initialState = {
  trials: [],
  // comments: [],
  // moreEvents: true,
  selectedTrial: null,
  // lastVisible: null,
  // filter: "all",
  // startDate: new Date(),
  // retainState: false,
};

export default function trialReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_TRIAL:
      return {
        ...state,
        trials:[...state.trials,payload],
      };
    case LISTEN_TO_SELECTED_TRIAL:
      return {
        ...state,
        selectedTrial: null,
      };
    case CLEAR_SELECTED_TRIAL:
      return {
        ...state,
        trials: [],
      };
    default:
      return state;
  }
}
