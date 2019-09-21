import { TableMap } from '../services/tableMap/table-map';
import { IDataBaseObj } from './_base';

export interface IInventorySubType extends IDataBaseObj {

    class?: string;
    type?: string;
    subType?: string;
    subTypeAbbv?: string;
}

export class InventorySubType implements IInventorySubType {

    static tableName: string = TableMap.InventorySubType;

    id: string;

    class?: string;
    type?: string;
    subType?: string;
    subTypeAbbv?: string;

    constructor(props: IInventorySubType) {
        Object.keys(props).forEach(prop => {
            const value = prop[prop];
            this[prop] = value;
        })
    }

}