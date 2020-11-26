import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import Register from './components/views/Register/Register';

function App() {
  return (
    <div>
      
        <Switch>
          <Route path="/" component={LandingPage} exact />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={Register} />
        </Switch>
      
    </div>
  );
}

export default App;
