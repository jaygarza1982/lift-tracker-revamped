import * as React from 'react';
import { Lift, ILiftData } from '../utils/dexie';
import SafeParse from '../utils/SafeParse';

interface ILiftProps {
    lifts?: Lift[] | undefined;
    category?: string | undefined;
} 

const LiftList = (props: ILiftProps) => {
    const { lifts, category } = props;
    
    return (
        <>
            {
                lifts?.map(lift => {
                    const liftData = SafeParse<ILiftData>(lift.JSONData);

                    // TODO: TEST THIS LOGIC

                    // If category defined and lift is not in the category, return nothing
                    if (category && category !== liftData?.category) return <></>

                    // If here we either have no category, or we do and it is our defined category
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