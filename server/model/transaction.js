const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Transaction = new Schema ({
    
    borrowerID : { type: Number },
    itemID : { type: String },
    dateBorrowed : { type: Date },
    dateReturned : { type: Date },
    lentBy : { type: String },
    receivedBy : { type: String },
    remarks : { type : String},
    hasIncident : { type: Number} 
},
{
    collection: 'transaction'
})

module.exports = mongoose.model('Transaction',Transaction)