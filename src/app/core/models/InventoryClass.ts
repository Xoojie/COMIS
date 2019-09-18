import { TableMap } from '../services/tableMap/table-map';
import { IDataBaseObj } from './_base';

export interface IInventoryClass extends IDataBaseObj {

    class?: string;
    type?: string;
    subType?: string;
    subTypeAbbv?: string;
}

export class InventoryClass implements IInventoryClass {

    static tableName: string = TableMap.InventoryClass;

    id: string;

    class?: string;
    type?: string;
    subType?: string;
    subTypeAbbv?: string;

    constructor(props: IInventoryClass) {
        Object.keys(props).forEach(prop => {
            const value = prop[prop];
            this[prop] = value;
        })
    }

}