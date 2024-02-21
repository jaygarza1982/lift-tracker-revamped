import * as React from 'react';
import { ILiftData, Lift, LiftDB } from '../utils/dexie';
import SafeParse from '../utils/SafeParse';
import { Button, Modal, Tile } from '@carbon/react';

interface ILiftByNameProps {
    name: string | undefined;
    lifts: Lift[] | undefined;
}

interface ILiftProps {
    reps: number | undefined;
    weight: number | undefined;
    date: Date | undefined;
    liftId: number | undefined;
    performedAt: Date | undefined;
}

interface IDeleteModalProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    liftId: number | undefined;
    performedAt: Date | undefined;
}

const DeleteModal = (props: IDeleteModalProps) => {
    const deleteAction = async () => {
        try {
            if (!props.liftId) throw 'Lift ID was undefined'

            console.log('Deleting lift', props.liftId);

            // Soft delete
            await LiftDB.Lifts.update(props.liftId, { deletedDatetime: new Date() });
            
            props.setOpen(false);                
        } catch (error) {
            console.log('Could not delete lift', error);
        }
    }

    return (
        <>
            <Modal
                open={props.open}
                onRequestClose={() => {props.setOpen(false)}}
                onRequestSubmit={deleteAction}
                danger
                modalHeading={`Are you sure you want to delete the lift performed at ${props.performedAt?.toLocaleString()}?`}
                modalLabel="Lift delete"
                primaryButtonText="Delete"
                secondaryButtonText="Cancel"
            />
        </>
    )
}

const LiftDisplay = (props: ILiftProps) => {

    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <Tile>
            <DeleteModal open={open} setOpen={setOpen} liftId={props.liftId} performedAt={props.performedAt} />
            <div className="lift-display-grid">
                <div className="lift-display">
                    <div>Reps: {props?.reps}</div>
                    <div>Weight: {props?.weight}</div>
                    <div>{ props?.date?.toLocaleString() }</div>
                </div>
                <div>
                    <Button kind='danger--ghost' size='sm' onClick={() => {setOpen(true)}}>
                        Delete
                    </Button>
                </div>
            </div>
        </Tile>
    )
}

const LiftByName = (props: ILiftByNameProps) => {

    const { name, lifts } = props;
    // Only return lifts that have not been deleted
    const filteredLifts = lifts?.filter(l => l.deletedDatetime == undefined);
    const sortedLifts = filteredLifts?.sort((a, b) => b.insertedDatetime.getTime() - a.insertedDatetime.getTime());

    return (
        <>
            {
                sortedLifts?.map(l => {
                    const liftData = SafeParse<ILiftData>(l.JSONData);

                    return liftData?.name == name ?
                    <div className="margin-bottom">
                        <LiftDisplay reps={liftData?.reps} weight={liftData?.weight} date={l.insertedDatetime} liftId={l.id} performedAt={l.insertedDatetime} />
                    </div>
                    :
                    <></>
                })
            }
        </>
    )
}

export default LiftByName;