const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const cors = require('cors')
const DBStudentes = require('./models/studentes')
const DBReunion = require('./models/reunion');


const app = express()

const port = 3002

const corsOptions ={
  origin:'*', 
}
app.use(express.static(path.join(__dirname, 'front/build')));
app.use(express.json());

app.use(cors(corsOptions))


const routes = require("./src/routes/routes");
app.use(routes)

mongoose.connect(
    'mongodb+srv://maxRe:iZcRDNZPCWfUeIyJ@linktree.fcmpv.mongodb.net/callRoll?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(port || 3001, () => {
      console.log(`Server Running on ${port || 3001}`);
    });
  })
  .catch((err) => console.log(err));