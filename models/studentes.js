const mongoose = require('mongoose');

const studente = new mongoose.Schema({
    Birthday: {
        type: String,
        required: false,
      },
    
      Name: {
        type: String,
        required: true,
      },
    
      PhoneN: {
        type: String,
        required: true,
      },
})

module.exports = mongoose.model('studente', studente)