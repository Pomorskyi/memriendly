import React, { useState, useMemo } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { FeedPage, LoginReginstrationPage } from "./Pages"
import { SignUp } from "./Components/componentsForComponents";

//======================FIREBASE======================
import { initializeApp } from "firebase/app";
import firebaseConfig from './Services/constants/firebaseConfig';
// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
//======================FIREBASE======================

function App() {
  // const [ isUserAuthenticated, setIsUserAuthenticated ] = useState(false);
  
  // const model = {};
  // useMemo(()=> {
  //   model.isUserAuthenticated = isUserAuthenticated;
  //   model.firebaseApp = app;
  // }, [isUserAuthenticated, app]);

  return (
    <SignUp />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<LoginReginstrationPage model={model} />}>
    //       <Route path="home" element={<FeedPage />} model={model} />
    //       {/* <Route path="teams" element={<Teams />}> */}
    //         {/* <Route path=":teamId" element={<Team />} />
    //         <Route path="home" element={<FeedPage model={model} />} />
    //         <Route index element={<LeagueStandings />} /> */}
    //       {/* </Route> */}
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<LoginReginstrationPage model={{}}></LoginReginstrationPage>} />
    //   </Routes>
    // </BrowserRouter>
    // <Router>
    //   <div className="App">
    //     <ul className="App-header">
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li>
    //         <Link to="/about">About Us</Link>
    //       </li>
    //       <li>
    //         <Link to="/contact">Contact Us</Link>
    //       </li>
    //     </ul>
    //     <Routes>
    //       {/* <Route exact path='/' element={< Home />}></Route>
    //       <Route exact path='/about' element={< About />}></Route>
    //       <Route exact path='/contact' element={< Contact />}></Route> */}
    //     </Routes>
    //   </div>
    // </Router>
  );
}

export default App;
