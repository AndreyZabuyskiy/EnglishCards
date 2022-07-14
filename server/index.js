import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/index.js';
import errorHandler from './middleware/ErrorHandlingMiddleware.js';
import fileUpload from 'express-fileupload';

const PORT = config.get('port') || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandler);

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