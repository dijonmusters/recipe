import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const App  = ({ children }) => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title"><Link to={'/'}>Recipe</Link></h1>
      </header>
      {children}
    </div>
  );
}

export default App;
