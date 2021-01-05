/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "./App.css";
import { useState } from "react";
import { isAuth } from "./helpers/auth";
import Navbar from "./components/Navbar";
import ActivatePage from "./screens/ActivatePage";
import Register from "./screens/Register";
import Login from "./screens/Login";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./screens/Main";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(isAuth());
  const loginToast = () => {
    toast.success("Logged In Succesfully");
  };
  const logoutToast = () => {
    toast.warning("Goodbye, See you soon !");
  };

  return (
    <div className="App" css={styles}>
      <ToastContainer />
      <Navbar {...{ isLoggedIn, setLoggedIn, logoutToast }} />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) =>
            isAuth() ? (
              <Main {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location },
                }}
              />
            )
          }
        />
        <Route
          path="/login"
          exact
          render={(props) =>
            !isAuth() ? (
              <Login {...{ ...props, setLoggedIn, loginToast }} />
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location },
                }}
              />
            )
          }
        />
        <Route
          path="/register"
          exact
          render={(props) =>
            !isAuth() ? (
              <Register {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location },
                }}
              />
            )
          }
        />
        <Route
          path="/user/activation/:token"
          exact
          render={(props) => <ActivatePage {...props} />}
        />
        <Route path="*" exact render={(props) => <h1>Page Not Found</h1>} />
      </Switch>
    </div>
  );
}

const styles = css``;

export default App;
