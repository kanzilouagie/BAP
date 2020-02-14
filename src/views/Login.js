import React, { useCallback, useContext } from 'react';
import { Redirect, useHistory } from 'react-router';
import app from '../authentication/base';
import { AuthContext } from '../authentication/Auth';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

const Login = () => {
  const history = useHistory();
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const handleExit = () => {
    history.push('/');
  };

  return (
    <>
      <DarkWrapper></DarkWrapper>
      <PopupWrapper>
        <SecondaryButton
          style={{ position: 'absolute', right: 20, top: 20, fontSize: '30px' }}
          width={'auto'}
          padding={'0 20px'}
          onClick={() => handleExit()}
        >
          x
        </SecondaryButton>
        <PopupLeft>
          <h2>
            Welkom terug!
            <br /> Log je in en ontdek nieuwe verhalen.
          </h2>
          <form onSubmit={handleLogin}>
            <label>Emailadres</label>
            <input name="email" type="email" />
            <label>Wachtwoord</label>
            <input name="password" type="password" />
            <PrimaryButton
              height={'50px'}
              width={'100%'}
              padding={'0 20px'}
              type="submit"
            >
              Log in
            </PrimaryButton>
            <button>
              <Link to="/step1">Register</Link>
            </button>
          </form>
          <a className="forgot" href="#">
            Wachtwoord vergeten?
          </a>
        </PopupLeft>

        <PopupRight>
          <h2>Nog geen account?</h2>
          <div className="loginPic">foto</div>
          <div className="buttons">
            <PrimaryButton
              height={'50px'}
              width={'auto'}
              padding={'0 20px'}
              style={{ top: '0px' }}
              onClick={() => history.push('/step1')}
            >
              Ik wil meedoen
            </PrimaryButton>
            <SecondaryButton
              height={'50px'}
              width={'auto'}
              padding={'0 20px'}
              style={{ fontSize: '20px' }}
            >
              Hoe werkt het?
            </SecondaryButton>
          </div>
        </PopupRight>
      </PopupWrapper>
    </>
  );
};

export default Login;

{
  /* <div>
<h1>Log in</h1>
<form onSubmit={handleLogin}>
  <label>
    Email
    <input name="email" type="email" placeholder="Email" />
  </label>
  <label>
    Password
    <input name="password" type="password" placeholder="Password" />
  </label>
  <button type="submit">Log in</button>
  <button>
    <Link to="/step1">Register</Link>
  </button>
</form>
</div> */
}

const FadedWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(10px);
`;

const DarkWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: #ffdde1;
`;

const PopupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  height: 90vh;
  background: #f69796;
  border-radius: 30px;

  h2 {
    font-size: 35px;
    font-weight: bold;
    color: white;
    line-height: 4rem;
    margin-bottom: 4rem;
  }
`;

const PopupLeft = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 2;
  height: 100%;
  background-color: #e86565;
  border-radius: 30px;
  padding: 0 40px;

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
  }

  label {
    margin-bottom: 4px;
    font-weight: bold;
  }

  .forgot {
    margin-top: 4rem;
    color: black;
    text-decoration: none;
    text-decoration: underline;
  }

  input {
    margin-bottom: 8px;
    background: none;
    border: 2px solid black;
    padding: 1rem;
    width: 300px;
    border-radius: 10px;
    color: white;
  }
`;

const PopupRight = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex: 3;
  height: 100%;
  padding: 100px 40px;
  background-color: #f69796;
  z-index: -1000;
  border-radius: 30px;

  .loginPic {
    background: white;
    width: 400px;
    height: 200px;
  }

  .buttons {
    width: 400px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`;
