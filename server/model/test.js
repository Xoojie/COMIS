const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Test = new Schema ({

    try: { type: String }
}, 
{
    collection: 'test'
})

module.exports = mongoose.model('Test',Test)