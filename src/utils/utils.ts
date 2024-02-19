import SafeParse from "./SafeParse";
import { ILiftData, Lift } from "./dexie";

export function getUniqueCategories(lifts: Lift[]): (string | undefined)[] {
    if (lifts.length == 0) return [];

    const catSet = new Set(lifts.map(l => SafeParse<ILiftData>(l.JSONData)?.category));
    return Array.from(catSet);
}
