const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Incident = new Schema ({

    date : { type : Date},
    tID : { type: String},
    bID : { type: String},
    bName : { type: String},
    itemID : { type: String},
    adminDescription : { type: String},
    borrowerDescription : { type: String}
   

},
{
    collection: 'incident'
})

module.exports = mongoose.model('Incident',Incident)