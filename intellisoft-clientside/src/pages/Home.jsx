import logo from '../logo.svg';
import '../App.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src='https://www.intellisoftkenya.com/wp-content/uploads/2018/09/cropped-High-Res-IntelliSOFT-Logo.png' className="App-logo" alt="logo" />

        <Link to="/register" className="App-link">
          New Patient Registration
        </Link>
        <Link to="/patient-visit" className="App-link">
          Existing Patient Visit
        </Link>
      </header>
    </div>
  );
}

export default Home;
