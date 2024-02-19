import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LiftsByCategory from './components/LiftsByCategory';
import CategoryViewer from './components/CategoryViewer';
import LiftByNameViewer from './components/LiftsByNameViewer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CategoryViewer />} />
        <Route path='/categories' element={<CategoryViewer />} />
        <Route path='/lifts/:category?' element={<LiftsByCategory />} />
        <Route path='/lift/:category/:name' element={<LiftByNameViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
