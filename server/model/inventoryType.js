const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let InventoryType = new Schema ({

    class: { type:String},
    type: { type:String}

},
{
    collection: 'inventoryType'
})

module.exports = mongoose.model('InventoryType',InventoryType)