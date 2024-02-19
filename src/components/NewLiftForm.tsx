import * as React from 'react';
import { Lift } from '../utils/dexie';
import { Button, Select, SelectItem, TextInput } from '@carbon/react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { getUniqueCategories } from '../utils/utils';

interface INewLift {
    name: string;
    category: string;
}

interface INewLiftFormProps {
    lifts: Lift[] | undefined;
}

const NewLiftForm = (props: INewLiftFormProps) => {
    const navigate = useNavigate();

    const formik = useFormik<INewLift>({
        initialValues: {
            name: '',
            category: ''
        },
        onSubmit: (values: INewLift) => {
            if (values.name == '') return;
            if (values.category == '') return;

            navigate(`/lift/${values.category.trim()}/${values.name.trim()}`);
        }
    });

    const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => e.target.select();

    const handleCategorySelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        formik.setFieldValue('category', e.target.value);
    }

    const categories = getUniqueCategories(props?.lifts || []);

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
                {/* TODO: Figure out reset logic select input on change of this element */}
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
                <div className="margin-bottom">
                    <Select id='new-category' labelText='Choose existing category' onChange={handleCategorySelectChange}>
                        <SelectItem value={''} text='' />
                        {
                            categories.map(c => {
                                return <SelectItem value={c} text={c || ''} />
                            })
                        }
                    </Select>
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