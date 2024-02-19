import * as React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'react-router-dom';
import { ILiftData, LiftDB, LiftDexie } from '../utils/dexie';
import LiftByName from './LiftByName';
import { Button, NumberInput } from '@carbon/react';
import { useFormik } from 'formik';

const LiftByNameViewer = () => {
    const { name, category } = useParams();
    const lifts = useLiveQuery(() => LiftDB.Lifts.toArray(), []);

    const formik = useFormik<ILiftData>({
        initialValues: {
            name: name,
            reps: 0,
            weight: 0,
            category: category
        },
        onSubmit: async (values: ILiftData) => {
            if (values.reps == 0) return;
            if (values.weight == 0) return;

            try {
                await new LiftDexie().insert(values)

                console.log('Inserted', values);
                
                formik.resetForm();
            } catch (error) {
                console.log('Could not insert lift', error);
            }
        }
    });

    const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => e.target.select();

    return name ?
        <div className="margin lift-by-name">
            <h1>{ category } | { name }</h1>
            <div className="margin">
                <div className='margin-bottom'>
                    <NumberInput
                        onFocus={handleFocus}
                        autoComplete='off'
                        name='reps'
                        id='reps'
                        label='Reps'
                        hideSteppers
                        value={formik.values.reps}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className='margin-bottom'>
                    <NumberInput
                        onFocus={handleFocus}
                        autoComplete='off'
                        name='weight'
                        id='weight'
                        label='Weight'
                        hideSteppers
                        value={formik.values.weight}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className='right margin-bottom'>
                    <div>
                        <Button onClick={(e: any) => { formik.handleSubmit(e) }}>Add</Button>
                    </div>
                </div>
            </div>
            <LiftByName name={name} lifts={lifts} />
        </div>
    : <></>
}

export default LiftByNameViewer;