import React, { useContext } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
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
        {!isLoggedIn && (<Route path="/" exact component={Home} />)}
        {isLoggedIn && (<Route path="/" exact component={Welcome} />)}
        <Route path="/trade" component={Trade} />
        <Route path="/portfolio" component={Portfolio} />
    </Router>
  );
}

export default App;
