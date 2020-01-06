import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Input } from './components/Input';

interface AppProps {
}

export function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Input />
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}


