import * as React from 'react';
import { Lift } from '../utils/dexie';
import { ClickableTile } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import NewLiftForm from './NewLiftForm';
import { getUniqueCategories } from '../utils/utils';

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

    // Sort categories alphabetically
    const categories = getUniqueCategories(lifts || []).sort((a, b) => a?.localeCompare(b || '') || 0);
    
    return (
        <>
            <NewLiftForm lifts={lifts} />
            {
                categories?.length > 0 ?
                categories?.map(cat => {
                    return (
                        <CategoryDisplay category={cat} />
                    )
                }) : <div className="margin">Add a lift to see categories</div>
            }
        </>
    )
}

export default CategoryList;