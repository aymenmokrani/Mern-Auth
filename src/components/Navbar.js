/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
import { isAuth, signout } from "../helpers/auth";

const { Title } = Typography;

function Navbar({ setLoggedIn, logoutToast }) {
  return (
    <div className="navbar" css={styles}>
      <div className="logo">
        <Link to="/">
          <Title level={3}>Logo</Title>
        </Link>
      </div>
      {!isAuth() ? (
        <div className="actions">
          {/* <button>login</button> */}
          <Link to="/register">
            <Button type="link" size="large">
              Register
            </Button>
          </Link>

          <Link to="/login">
            <Button type="link" size="large">
              Login
            </Button>
          </Link>
        </div>
      ) : (
        <Link to="/login">
          <Button
            type="link"
            size="large"
            onClick={() => {
              signout();
              setLoggedIn(false);
              logoutToast();
            }}
          >
            logout
          </Button>
        </Link>
      )}
    </div>
  );
}

const styles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  .logo {
    span {
      font-size: 22px;
      font-weight: bolder;
    }
  }
`;
export default Navbar;
