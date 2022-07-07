const mongoose = require('mongoose');

const reunion = new mongoose.Schema({
    MeetingDate:{
        type: Date,
        required: true
    },
    
    Participants:{
        type: Array,
        required: false
    }
})

module.exports = mongoose.model('reunion', reunion)