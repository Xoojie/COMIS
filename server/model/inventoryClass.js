const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let InventoryClass = new Schema ({

    class: { type:String},
    type: { type:String},
    subType: { type:String},
    subTypeAbbv: { type:String}

},
{
    collection: 'inventoryClass'
})

module.exports = mongoose.model('InventoryClass',InventoryClass)