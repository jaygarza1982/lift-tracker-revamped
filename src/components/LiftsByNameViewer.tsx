import * as React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'react-router-dom';
import { LiftDB } from '../utils/dexie';
import LiftByName from './LiftByName';
import { Button, TextInput } from '@carbon/react';

const LiftByNameViewer = () => {
    const { name } = useParams();
    const lifts = useLiveQuery(() => LiftDB.Lifts.toArray());

    return name ?
        <div className="margin lift-by-name">
            <h1>{ name }</h1>
            <div className="margin">
                <div className='margin-bottom'>
                    <TextInput id='reps' labelText='Reps' />
                </div>
                <div className='margin-bottom'>
                    <TextInput id='weight' labelText='Weight' />
                </div>
                <div className='right margin-bottom'>
                    <div>
                        <Button>Add</Button>
                    </div>
                </div>
            </div>
            <LiftByName name={name} lifts={lifts} />
        </div>
    : <></>
}

export default LiftByNameViewer;