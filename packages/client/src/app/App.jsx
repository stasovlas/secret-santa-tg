import './App.css';
import Main from '../pages/Main';
import Admin from '../pages/Admin';

const App = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    return (
          <div className={'container mx-auto h-screen'}>
              {!token && <Main />}
              {token && <Admin token={token} />}
          </div>
    );
};

export default App;
