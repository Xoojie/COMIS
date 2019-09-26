const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Borrower = new Schema ({

    bID : { type: String}, // borrowerID
    IDType : { type: String},
    Occupation : { type: String},
    firstName : { type: String },
    lastName: { type: String},
    isBan: { type: Number}

},
{
    collection: 'borrower'
})

module.exports = mongoose.model('Borrower',Borrower)