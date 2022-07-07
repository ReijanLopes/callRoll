
module.exports ={
    async index(req, res){
        res.sendFile(__dirname + '/front/build/index.html', (error) => {
            if(error){
                res.status(500).send(error)
            }
        })
          
    }
}