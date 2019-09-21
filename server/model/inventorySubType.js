const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let InventorySubType = new Schema ({

    class: { type:String},
    type: { type:String},
    subType: { type:String},
    subTypeAbbv: { type:String}

},
{
    collection: 'inventorySubType'
})

module.exports = mongoose.model('InventorySubType',InventorySubType)