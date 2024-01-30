import { Route, Redirect } from 'react-dom';

// Dummy authentication function - replace with actual logic
const isAuthenticated = () => {
  const userToken = localStorage.getItem('token');
  return userToken ? true : false;
};

export {isAuthenticated};

// PrivateRoute component to protect routes
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export {PrivateRoute};