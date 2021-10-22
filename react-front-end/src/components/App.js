import { useState, useEffect, createContext } from 'react';
import '../index.css';
import Routes from '../routes/routes.js';

function authenticateUser() {

}
export const AuthContext = createContext();
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [currUser, setCurrUser] = useState();

  

  const checkAuth = async () => {
    fetch('/api/auth', {credentials:"include"})
    .then(response => response.json())
    .then(data => {
      setCurrUser(data);
      setIsAuth(true);
    })
    .catch(error => setIsAuth(false));
  }
  useEffect(() => {

    checkAuth();
    //setIsAuth(true);
  }, []);

  return (
    <AuthContext.Provider value={isAuth}>
      <div className="App">
        {/* <nav>
          <div>
          <h1>Bello</h1>
            <div className="btn-group">
              <Link className="btn outline light" to="/signup">Sign Up</Link>
              <Link className="btn solid light" to="/login">Log In</Link>
            </div>
          </div>
        </nav> */}
        
          <Routes />
        
        {/* <div className="content">
        </div> */}
        <footer>
          <h5>Ryan Unroe &amp; Josh Gorham</h5>
        </footer>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
