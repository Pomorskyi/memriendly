import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { SignUp } from "./Components/componentsForComponents";
import { FeedPage, LoginReginstrationPage } from "./Pages"
import { AuthProvider } from "./Services/Contexts/AuthContext";
import PrivateRoute from "./Services/PrivateRoute";

function App() {
  
  return (
    <Router>
      <AuthProvider>
      <Routes>
        
        <Route exact path='/' element={<PrivateRoute/>}>
              <Route exact path='/' element={<FeedPage/>}/>
        </Route>
        <Route exact path='/signup' element={<LoginReginstrationPage />}/>
        
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
