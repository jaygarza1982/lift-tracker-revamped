import * as React from 'react';
import { Lift, ILiftData } from '../utils/dexie';
import SafeParse from '../utils/SafeParse';

interface ILiftProps {
    lifts?: Lift[] | undefined;
} 

const LiftList = (props: ILiftProps) => {
    const lifts = props.lifts;
    
    return (
        <>
            {
                lifts?.map(lift => {
                    const liftData = SafeParse<ILiftData>(lift.JSONData);

                    return (
                        <>
                            <div>Lift: {liftData?.name}</div>
                            <div>Cat: {liftData?.category}</div>
                            <div>Weight: {liftData?.weight}</div>
                            <div>Reps: {liftData?.reps}</div>
                        </>
                    )
                })
            }
        </>
    )
}

export default LiftList;