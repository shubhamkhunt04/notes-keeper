import { useReducer, createContext } from 'react';

const initialState = {
  currentUser: null,
  selectedNoteIndex: null,
  selectedNote: null,
  loading: false,
  notes: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_NOTES':
      return { ...state, notes: payload || [] };
    default:
      return { ...state };
  }
};

const AppContext = createContext({
  state: initialState,
  dispatch: () => {},
});

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
