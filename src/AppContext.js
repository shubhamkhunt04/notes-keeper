// import jwtDecode from 'jwt-decode';
import { useReducer, createContext } from 'react';
// import api from './common/api';
// import { TOKEN } from './common/constant';

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
    case 'SET_LOADING':
      console.log("payload",payload)
      return { ...state, loading: payload || false };
    case 'SET_NOTES':
      return { ...state, notes: payload || [] };
    case 'SET_EDITOR_TEXT':
      return { ...state, editorText: payload || {} };
    case 'LOGOUT':
      // delete api.defaults.headers.common.Authorization;
      // localStorage.removeItem(TOKEN);
      return {
        ...initialState,
        authenticated: false,
        authToken: null,
        user: null,
      };
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
