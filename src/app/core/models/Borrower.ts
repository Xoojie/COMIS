import { TableMap } from '../services/tableMap/table-map';
import { IDataBaseObj } from './_base';

export interface IBorrower extends IDataBaseObj {

    bID?: string;
    IDType?: string;
    Occupation?: string;
    firstName?: string;
    lastName?: string;
    isBan?: number;
}

export class Borrower implements IBorrower {

    static tableName : string = TableMap.Borrower;

    id: string;

    bID?: string;
    IDType?: string;
    Occupation?: string;
    firstName?: string;
    lastName?: string;
    isBan?: number;

    constructor(props: IBorrower) {
        Object.keys(props).forEach(prop => {
            const value = prop[prop];
            this[prop] = value;
        })
    }

}