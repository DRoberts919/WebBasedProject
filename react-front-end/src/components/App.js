import '../index.css';
import Routes from '../routes/routes.js';

function authenticateUser() {

}

function App() {
  return (
    <div className="App">
      <nav>
        <div>
        <h1>Bello</h1>
          <div className="btn-group">
          <button className="btn outline light">Sign Up</button>
          <button className="btn solid light">Log In</button>
          </div>
        </div>
      </nav>
      <div className="content">
      <Routes />
      </div>
      <footer>
        <h5>Ryan Unroe &amp; Josh Gorham</h5>
      </footer>
    </div>
  );
}

export default App;
