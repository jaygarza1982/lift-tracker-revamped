import React, { useEffect } from 'react';
import './App.css';
import { LiftDB } from './utils/dexie';
import { useLiveQuery } from "dexie-react-hooks";

import LiftList from './components/LiftList';
import CategoryList from './components/CategoryList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<>Hello</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
