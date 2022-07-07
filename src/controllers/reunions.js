const DBReunion = require('../../models/reunion'); 

module.exports ={
    async index(req, res){
        const dataR = await DBReunion.find()

        if(dataR) res.json(dataR)
        else{
            res.status(500).json({message: "non-existing meetings"})
        }
    },

    async store(req, res){
        const {MeetingDate, Participants} = req.body

        let dataR = await DBReunion.find({MeetingDate: MeetingDate})
      
        if(dataR.length == 0){
        if(MeetingDate){
            const data = await DBReunion.create({MeetingDate, Participants});
            data.save().then(
              data => { res.json(data);}
              
            ).catch(err => {res.status(500).json({error: err})})
        }else{
          res.status(400).json({message: 'date undefined'})
        }
      }else{ 
          const dataUP = await DBReunion.updateOne({
          MeetingDate
        }, {
          Participants
        })
        }
    }
}