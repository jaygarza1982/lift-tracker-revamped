import * as React from 'react';
import { Lift, ILiftData } from '../utils/dexie';
import SafeParse from '../utils/SafeParse';
import { ClickableTile } from '@carbon/react';
import { useNavigate } from 'react-router-dom';

interface ILiftProps {
    lifts?: Lift[] | undefined;
    category?: string | undefined;
}

interface ILiftDisplayProps {
    name: string | undefined;
    category: string | undefined;
}

const LiftDisplay = (props: ILiftDisplayProps) => {
    const navigate = useNavigate();

    const click = (args: ILiftDisplayProps) => {
        navigate(`/lift/${args.category}/${args.name}`);
    }

    return (
        <ClickableTile onClick={() => click(props)}>
            <div className="lift-display">
                <div>{ props?.name }</div>
                <div>{ props?.category }</div>
            </div>
        </ClickableTile>
    )
}

interface LiftAndCat {
    name: string;
    category: string;
}
// Given a lift array, remove the duplicate names with category
// This is so we could have lift{X} in category{Y} and lift{X} in category{Z} and vice versa
function removeDupeLifts(lifts: Lift[] | undefined): (LiftAndCat | undefined)[] {
    const liftsSet = new Set<string>();

    lifts?.forEach(l => {
        const lift = SafeParse<ILiftData>(l.JSONData);
        if (lift) {
            const toAdd = {
                name: lift.name,
                category: lift.category
            }

            liftsSet.add(JSON.stringify(toAdd));
        }
    });

    return Array.from(liftsSet).map(l => SafeParse<LiftAndCat>(l));
}

const LiftList = (props: ILiftProps) => {
    const { lifts, category } = props;
    
    return (
        <>
            {
                removeDupeLifts(lifts)?.map(lift => {
                    // If category defined and lift is not in the category, return nothing
                    if (category && category !== lift?.category) return <></>

                    // If here we either have no category, or we do and it is our defined category
                    return (
                        <>
                            <div className="margin">
                                <LiftDisplay name={lift?.name} category={lift?.category} />
                            </div>
                        </>
                    )
                })
            }
        </>
    )
}

export default LiftList;