import * as React from 'react';
import { Lift, ILiftData } from '../utils/dexie';
import SafeParse from '../utils/SafeParse';
import { ClickableTile } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import NewLiftForm from './NewLiftForm';

interface ILiftProps {
    lifts?: Lift[] | undefined;
}

interface ICategoryDisplayProps {
    category: string | undefined;
}

const CategoryDisplay = (props: ICategoryDisplayProps) => {
    const navigate = useNavigate();

    const click = (args: ICategoryDisplayProps) => {
        navigate(`/lifts/${args.category}`);
    }

    return (
        <div className="margin">
            <ClickableTile onClick={() => click(props)}>
                <div>{ props?.category }</div>
            </ClickableTile>
        </div>
    )
}

const CategoryList = (props: ILiftProps) => {
    const lifts = props.lifts;
    const catSet = new Set(lifts?.map(l => SafeParse<ILiftData>(l.JSONData)?.category));
    const categories = Array.from(catSet);
    
    return (
        <>
            <NewLiftForm />
            {
                categories?.length > 0 ?
                categories?.map(cat => {
                    return (
                        <CategoryDisplay category={cat} />
                    )
                }) : <div>No categories found</div>
            }
        </>
    )
}

export default CategoryList;