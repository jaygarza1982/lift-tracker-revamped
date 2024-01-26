import React, { useEffect } from 'react';
import './App.css';
import { LiftDB } from './utils/dexie';
import { useLiveQuery } from "dexie-react-hooks";

import LiftList from './components/LiftList';
import CategoryList from './components/CategoryList';

function App() {

  // useEffect(() => {
  //     (async () => {
  //       try {
  //         const liftObj = {
  //           name: 'lift name',
  //           reps: 10,
  //           weight: 25,
  //           category: 'pull'
  //         }
  //         const insertres = await LiftDB.insert(liftObj);
  //         console.log(insertres);
  //       } catch (error) {
  //         console.log('Error inserting', error);
  //       }
  //     })();
  // });

  const lifts = useLiveQuery(() => LiftDB.Lifts.toArray())

  return (
    <div className="App">
      Hello, World!
      <br />

      <CategoryList lifts={lifts} />

      <LiftList lifts={lifts} />

      {
        lifts?.map(l => (
          l.JSONData
        ))
      }
    </div>
  );
}

export default App;
