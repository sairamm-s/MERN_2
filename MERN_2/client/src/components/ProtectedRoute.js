import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// const ProtectedRoute = ({ component, auth, ...rest }) => {
//   var RenderComponents = component;
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         return auth.isAuthenticated !== null ? (
//           <RenderComponents {...props} />
//         ) : (
//           <Redirect to='/login' />
//         );
//       }}
//     />
//   );
// };
const ProtectedRoute = ({ component, ...rest }) => {
  var RenderComponents = component;
  let hasToken = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) => {
        return hasToken !== null ? (
          <RenderComponents {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProtectedRoute);
