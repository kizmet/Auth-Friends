import React, { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import "./App.css";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";
import {
  fetchFriends,
  saveFriend,
  updateFriend,
  deleteFriend,
  login,
  loadToken,
  logOut
} from "./actions";
import FriendsList from "./components/FriendsList";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.loggedIn ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const PrivateRouteWithProps = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        if (localStorage.getItem("token")) {
          return <Component {...routeProps} {...rest} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export const App = props => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    const hasToken = () => {
      navAuth.authenticate();
    };

    hasToken();
  }, [isAuthenticated]);

  const navAuth = {
    authenticate(cb) {
      localStorage.getItem("token")
        ? setAuthenticated(true)
        : setAuthenticated(false);
      //setInitialized(true);
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      setAuthenticated(false);
      localStorage.clear();
      setTimeout(cb, 100);
    },
    logIn(cb) {
      setLoggingIn(true);
    }
  };

  return (
    <div className="App">
      <Route
        path="/login"
        render={() => (
          <>
            {isAuthenticated && <Redirect to="/friends" />}
            <h1>LogIn:</h1>
            <LoginForm onSubmit={props.login} />
          </>
        )}
      />
      {/* <PrivateRoute */}
      <PrivateRouteWithProps
        path="/friends"
        component={FriendsList}
        friends={props.friends}
        fetchingFriends={props.fetchingFriends}
        fetchFriends={props.fetchFriends}
        saveFriend={props.saveFriend}
        loggedIn={props.loggedIn}
        deleteFriend={props.deleteFriend}
        deletingFriend={props.deletingFriend}
        isAuthenticated={isAuthenticated}
      />
      <Route
        exact
        path="/"
        render={() =>
          props.loggedIn ? <Redirect to="/friends" /> : <Redirect to="/login" />
        }
      />
      {props.loggedIn && (
        <button
          onClick={() => {
            navAuth.signout(() => props.history.push("/"));
          }}
        >
          Log Out
        </button>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  ...state.friends
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchFriends,
      saveFriend,
      updateFriend,
      deleteFriend,
      login,
      loadToken,
      logOut
    }
  )(App)
);
