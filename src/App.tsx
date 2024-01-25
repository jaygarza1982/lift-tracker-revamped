import React, { useEffect } from 'react';
import './App.css';
import { LiftDB } from './utils/dexie';
import { useLiveQuery } from "dexie-react-hooks";

import Lift from './components/LiftList';

function App() {

  // useEffect(() => {
  //     (async () => {
  //       try {
  //         const liftObj = {
  //           name: 'lift name',
  //           reps: 10,
  //           weight: 25
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

      <Lift lifts={lifts} />

      {
        lifts?.map(l => (
          l.JSONData
        ))
      }
    </div>
  );
}

export default App;
