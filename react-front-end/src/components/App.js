import '../index.css';
import Routes from '../routes/routes.js';

function authenticateUser() {

}

function App() {
  return (
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
      <div className="content">
      </div>
      <footer>
        <h5>Ryan Unroe &amp; Josh Gorham</h5>
      </footer>
    </div>
  );
}

export default App;
