import * as React from 'react';
import { ILiftData, Lift } from '../utils/dexie';
import SafeParse from '../utils/SafeParse';

interface ILiftByNameProps {
    name: string | undefined;
    lifts: Lift[] | undefined;
}

const LiftByName = (props: ILiftByNameProps) => {

    const { name, lifts } = props;

    return (
        <>
            {
                lifts?.map(l => {
                    const liftData = SafeParse<ILiftData>(l.JSONData);

                    return liftData?.name == name ?
                    <>
                        Name: {liftData?.name}
                        <br />
                        Reps: {liftData?.reps}
                    </>
                    :
                    <></>
                })
            }
        </>
    )
}

export default LiftByName;