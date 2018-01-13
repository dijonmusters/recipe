import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const App  = ({ children }) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Recipe</h1>
      </header>
      {children}
    </div>
  );
}

export default App;
