/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import { useState } from "react";

function ActivatePage({ match }) {
  const serverURL = "http://localhost:4000";
  const [actMsg, setActMsg] = useState("");
  const [isActivated, setActivated] = useState(false);

  const token = match.params.token;

  const handleActivate = async () => {
    try {
      const response = await axios.post(`${serverURL}/api/activatelocal`, {
        token,
      });
      setActMsg(response.data);
      setActivated(true);
    } catch (error) {
      console.log(error.response.data);
      setActMsg(error.response.data);
    }
  };

  return (
    <div css={styles}>
      <h1>Activation Page</h1>
      {!isActivated ? (
        <button onClick={handleActivate}>Activate Account</button>
      ) : (
        <button className="activated">Account is Activated</button>
      )}

      <div className="result">
        <p>{actMsg}</p>
      </div>
    </div>
  );
}
const styles = css`
  text-align: center;
  margin-top: 40px;
  button {
    margin-top: 60px;
    padding: 20px 100px;
    border: 0;
    background: teal;
    color: white;
    font-weight: bolder;
    cursor: pointer;
    &.activated {
      background: dimgrey;
    }
  }
  .result {
    margin-top: 50px;
    font-size: 18px;
  }
`;

export default ActivatePage;
