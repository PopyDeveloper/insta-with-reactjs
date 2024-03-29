import React from 'react';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
