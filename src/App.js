import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { SignUp } from "./Components/componentsForComponents";
import { FeedPage, LoginReginstrationPage } from "./Pages"
import { AuthProvider } from "./Services/Contexts/AuthContext";
import { DatabaseProvider } from "./Services/Contexts/DatabaseContext";
import PrivateRoute from "./Services/PrivateRoute";

function App() {
  
  return (
    <Router>
      <DatabaseProvider>
        <AuthProvider>
        <Routes>
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<FeedPage/>}/>
            <Route path="channel" element={<FeedPage />}>
              <Route path=":channelId" element={<FeedPage />} />
            </Route>
          </Route>
          <Route exact path='/signup' element={<LoginReginstrationPage />}/>

          
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <Link
                  to={'/'}
                >
                  Restart
                </Link>
              </main>
            }
          />

        </Routes>
        </AuthProvider>
      </DatabaseProvider>
    </Router>
  );
}

export default App;
