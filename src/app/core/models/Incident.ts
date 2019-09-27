import { TableMap } from '../services/tableMap/table-map';
import { IDataBaseObj } from './_base';

export interface IIncident extends IDataBaseObj {

    date?: Date;
    tID?: string;
    bID?: string;
    bName?: string;
    itemID?: string;
    adminDescription?: string;
    borrowerDescription?: string;
    
}

export class Incident implements IIncident {

    static tableName : string = TableMap.Incident;

    id: string;

    date?: Date;
    tID?: string;
    bID?: string;
    bName?: string;
    itemID?: string;
    adminDescription?: string;
    borrowerDescription?: string;

    constructor(props: IIncident) {
        Object.keys(props).forEach(prop => {
            const value = prop[prop];
            this[prop] = value;
        })
    }

}