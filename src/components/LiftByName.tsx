import * as React from 'react';
import { ILiftData, Lift } from '../utils/dexie';
import SafeParse from '../utils/SafeParse';
import { Tile } from '@carbon/react';

interface ILiftByNameProps {
    name: string | undefined;
    lifts: Lift[] | undefined;
}

interface ILiftProps {
    reps: number | undefined;
    weight: number | undefined;
}

const LiftDisplay = (props: ILiftProps) => {
    return (
        <Tile>
            <div className="lift-display">
                <div>Reps: {props?.reps}</div>
                <div>Weight: {props?.weight}</div>
                <div>Date</div>
            </div>
        </Tile>
    )
}

const LiftByName = (props: ILiftByNameProps) => {

    const { name, lifts } = props;

    return (
        <>
            {
                lifts?.map(l => {
                    const liftData = SafeParse<ILiftData>(l.JSONData);

                    return liftData?.name == name ?
                    <div className="margin-bottom">
                        <LiftDisplay reps={liftData?.reps} weight={liftData?.weight} />
                    </div>
                    :
                    <></>
                })
            }
        </>
    )
}

export default LiftByName;