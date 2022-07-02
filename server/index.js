const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/index');


const PORT = config.get('port') || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

async function start(){
  try{
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true
     });
    
    app.listen(PORT, () => console.log(`App has been started on ${PORT}...`));
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit();
  }
}

start();