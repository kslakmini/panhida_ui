import React from "react";
import { Route, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.auth.token);

  return token ? children : <Navigate to="/permission-denied" />;

  // return (
  //   <Route
  //     {...rest}
  //     render={(props) => {
  //       if (token) {
  //         return <Component {...props} />;
  //       } else {
  //           return <Navigate to={
  //               {
  //                   pathname:'/permission-denied',
  //                   state:{
  //                       from:props.location
  //                   }
  //               }
  //           }/>
  //       }
  //     }}
  //   />
  // );
}

// const mapStateToProps = (state) => {
//   return {
//     token: state.auth.token,
//   };
// };

// export default connect(mapStateToProps, {})(ProtectedRoute);
export default ProtectedRoute;
