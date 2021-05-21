import React, { useContext } from 'react';
import { Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import AuthContext from './store/auth-context';
import './App.css';
import Header from './Components/Header';
import Home from './Pages/Home';
import Welcome from './Pages/Welcome';
import Trade from './Pages/Trade';
import Portfolio from './Pages/Portfolio'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Router>
        <Header />

      <Switch>
          {!isLoggedIn && (
            <Route exact path="/"  component={Home} />
          )}
          {isLoggedIn && (
            <Route exact path="/"  component={Welcome} />
          )}
          {isLoggedIn && (
            <Route path="/trade" component={Trade} />
          )}
          {isLoggedIn && (
            <Route path="/portfolio" component={Portfolio} />
          )}
          <Route path="*">
            <Redirect to="/" />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
