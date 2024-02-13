import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LiftsByCategory from './components/LiftsByCategory';
import CategoryViewer from './components/CategoryViewer';
import LiftByNameViewer from './components/LiftsByNameViewer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<>Hello</>} />
        <Route path='/categories' element={<CategoryViewer />} />
        <Route path='/lifts/:category?' element={<LiftsByCategory />} />
        <Route path='/lift/:name' element={<LiftByNameViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
