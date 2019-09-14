import { TableMap } from '../services/tableMap/table-map'
import { IDataBaseObj } from './_base'

export interface ITransaction extends IDataBaseObj {

    borrowerID? : number;
    itemID? : string;
    purpose?: string;
    dataBorrowed? : Date;
    dateReturned? : Date;
    lentBy? : string;
    receivedBy? : string;
    hasIncident?: number

}

export class Transaction implements ITransaction {

    static tableName: string = TableMap.Transaction;

    id : string;

    borrowerID? : number;
    itemID? : string;
    purpose?: string;
    dataBorrowed? : Date;
    dateReturned? : Date;
    lentBy? : string;
    receivedBy? : string;
    hasIncident?: number

    constructor(props: ITransaction) {
        Object.keys(props).forEach(prop => {
            const value = prop[prop];
            this[prop] = value;
        })
    }
}