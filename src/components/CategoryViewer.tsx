import * as React from 'react';
import { LiftDB } from '../utils/dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import CategoryList from './CategoryList';

const CategoryViewer = () => {
    const lifts = useLiveQuery(() => LiftDB.Lifts.toArray());

    return <CategoryList lifts={lifts} />
}

export default CategoryViewer;