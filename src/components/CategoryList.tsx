import * as React from 'react';
import { Lift, ILiftData } from '../utils/dexie';
import SafeParse from '../utils/SafeParse';

interface ILiftProps {
    lifts?: Lift[] | undefined;
} 

const CategoryList = (props: ILiftProps) => {
    const lifts = props.lifts;
    const catSet = new Set(lifts?.map(l => SafeParse<ILiftData>(l.JSONData)?.category));
    const categories = Array.from(catSet);
    
    return (
        <>
            {
                categories?.length > 0 ?
                categories?.map(cat => {
                    return (
                        <>
                            <div>{cat}</div>
                        </>
                    )
                }) : <div>No categories found</div>
            }
        </>
    )
}

export default CategoryList;