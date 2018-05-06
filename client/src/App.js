import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./pages/Main";
import './App.css';

const App = () => (
  <Router>
    <div>
      <Nav />
        <Route path="/" component={Main} />
    </div>
  </Router>
);

export default App;
