const DBStudentes = require('../../models/studentes');
const DBReunion = require('../../models/reunion');

module.exports = {
    async index(req, res){
        const dataStudents = await DBStudentes.find()
        const dataR = await DBReunion.find()

        let dataReunion = dataR.slice(-3)
    
        res.json({dataStudents, dataReunion})
    },

    async store(req, res){
        const {Name, PhoneN, Birthday} = req.body
  
        if(Name && PhoneN){
        const data = await DBStudentes.create({Name, PhoneN, Birthday});
            data.save().then(
            data => { res.json(data);}
        ).catch(err => {res.status(500).json({error: err})})
        }else{
            res.status(400).json({message: 'name and number not defined'})
        }
    },

 
}