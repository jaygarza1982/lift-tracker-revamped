import * as React from 'react';
import { useParams } from 'react-router-dom';
import LiftList from './LiftList';
import { LiftDB } from '../utils/dexie';
import { useLiveQuery } from 'dexie-react-hooks';

const LiftsByCategory = () => {

    const { category } = useParams();

    const lifts = useLiveQuery(() => LiftDB.Lifts.toArray());

    return <LiftList category={category} lifts={lifts} />
}

export default LiftsByCategory;