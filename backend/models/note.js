const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    creation: {
        type: Date,
        required: true,
        default: Date.now()
    },

    expiration: {
        type: Date,
    },

    needState: {
        type: Boolean,
        default: false,
        required: true
    },

    state:{
        type: String,
        required: function (){
           return this.needState === true
        } 
    }
})

module.exports = mongoose.model('Note', noteSchema)