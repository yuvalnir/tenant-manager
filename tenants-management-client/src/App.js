import React, {useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import LoginNavBar from "./components/LoginNavBar";
import MainNavBar from './components/MainNavBar';

function App() {

  const [isLogedin, setIsLogedin] = useState(false);

  const changeLoginState = (boolVar) => {
    setIsLogedin(boolVar);
  }

  return (
      <div className="App">
        {isLogedin ? <MainNavBar setIsLogedin={changeLoginState}/> : <LoginNavBar setIsLogedin={changeLoginState} />}
      </div>
  );
}

export default App;