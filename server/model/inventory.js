const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Inventory = new Schema ({

    itemID: { type: String},
    type: { type: String },
    subType: { type: String },
    itemNum: { type: Number },
    name: { type: String },
    description: { type: String },
    condition: { type: String },
    dateAdded: { type: Date },
    dateEdited: { type: Date },
    addedBy: { type: Number },
    editedBy: { type: Number },
    isDeleted: { type: Number },
}, 
{
    collection: 'inventory'
})

module.exports = mongoose.model('Inventory',Inventory)