import * as React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'react-router-dom';
import { LiftDB } from '../utils/dexie';
import LiftByName from './LiftByName';

const LiftByNameViewer = () => {
    const { name } = useParams();
    const lifts = useLiveQuery(() => LiftDB.Lifts.toArray());

    return name ? <LiftByName name={name} lifts={lifts} /> : <></>
}

export default LiftByNameViewer;