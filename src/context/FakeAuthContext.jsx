import { createContext, useContext, useReducer } from "react";

// Fake user data for authentication simulation
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

// Create an AuthContext for managing authentication state
const AuthContext = createContext();

// Initial state for the authentication reducer
const initialState = {
  user: null,
  isAuthenticated: false,
};

// Reducer function to manage authentication state
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Invalid action type");
  }
}

// AuthProvider component to wrap the application and provide auth context
// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated } = state;

  // Function to handle user login
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  // Function to handle user logout
  function logout() {
    dispatch({ type: "logout" });
  }

  // Provide the authentication state and actions to the context
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Export the AuthProvider and useAuth hook for use in other components
export { AuthProvider, useAuth };
