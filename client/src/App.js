import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Home from './Pages/Home';
import Trade from './Pages/Trade';
import Portfolio from './Pages/Portfolio'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Header />
        <Route path="/" exact component={Home} />
        <Route path="/trade" component={Trade} />
        <Route path="/portfolio" component={Portfolio} />
    </Router>
  );
}

export default App;
