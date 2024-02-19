import * as React from 'react';
import { LiftDexie } from '../utils/dexie';
import LiftByName from './LiftByName';
import { Button, NumberInput, TextInput } from '@carbon/react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

interface INewLift {
    name: string;
    category: string;
}

const NewLiftForm = () => {
    const navigate = useNavigate();

    const formik = useFormik<INewLift>({
        initialValues: {
            name: '',
            category: ''
        },
        onSubmit: (values: INewLift) => {
            if (values.name == '') return;
            if (values.category == '') return;

            navigate(`/lift/${values.category}/${values.name}`);
        }
    });

    const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => e.target.select();

    return (
        <div className="margin">
            <h1>New Lift</h1>
            <div className="margin">
                <div className='margin-bottom'>
                    <TextInput
                        onFocus={handleFocus}
                        autoComplete='off'
                        name='name'
                        id='name'
                        labelText='Lift Name'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className='margin-bottom'>
                    <TextInput
                        onFocus={handleFocus}
                        autoComplete='off'
                        name='category'
                        id='category'
                        labelText='Category'
                        value={formik.values.category}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className='right margin-bottom'>
                    <div>
                        <Button onClick={(e: any) => { formik.handleSubmit(e) }}>Add</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewLiftForm;