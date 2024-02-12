import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LiftsByCategory from './components/LiftsByCategory';
import CategoryViewer from './components/CategoryViewer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<>Hello</>} />
        <Route path='/categories' element={<CategoryViewer />} />
        <Route path='/lifts/:category?' element={<LiftsByCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
