import React, { useContext, useEffect } from 'react';
import SideNavigation from '../../components/SideNavigation';
// import { StoreContext } from '../store/StoreProvider';

const NewMessage = () => {
  // const store = useContext(StoreContext);

  // useEffect(() => {
  //   async event => {
  //     event.preventDefault();
  //     const { email, password } = event.target.elements;
  //     try {
  //       await app
  //         .auth()
  //         .signInWithEmailAndPassword(email.value, password.value);
  //       history.push('/');
  //     } catch (error) {
  //       alert(error);
  //     }
  //   };
  // }, [store]);

  return (
    <>
      <h1>Nieuw bericht</h1>
      <SideNavigation />
      <form>
        <textarea cols="80" rows="10" />
        <button type="submit">Log in</button>
      </form>
    </>
  );
};

export default NewMessage;
