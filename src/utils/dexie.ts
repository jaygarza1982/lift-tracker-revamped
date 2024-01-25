import Dexie, { IndexableType, Table } from 'dexie';

export interface Lift {
    id?: number;
    JSONData: string;
    insertedDatetime: Date;
    deletedDatetime?: Date | undefined;
}

export class LiftDexie extends Dexie {
    // 'Lifts' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    Lifts!: Table<Lift>;

    constructor() {
        super('liftDatabase');
        this.version(1).stores({
            Lifts: '++id, JSONData, insertedDatetime, deletedDatetime'
        });
    }

    insert(data: Object) {
        return this.Lifts.add({
            JSONData: JSON.stringify(data),
            insertedDatetime: new Date(),
            deletedDatetime: undefined
        });
    }
}

const LiftDB = new LiftDexie();

export { LiftDB }
