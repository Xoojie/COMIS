import { TableMap } from '../services/tableMap/table-map';
import { IDataBaseObj } from './_base';

export interface IInventoryType extends IDataBaseObj {

    class?: string;
    type?: string;

}

export class InventoryType implements IInventoryType {

    static tableName: string = TableMap.InventoryType;

    id: string;

    class?: string;
    type?: string;

    constructor(props: IInventoryType) {
        Object.keys(props).forEach(prop => {
            const value = prop[prop];
            this[prop] = value;
        })
    }

}