import * as uuid from 'uuid';
import * as path from 'path';
import fs from 'fs';

class FileService {
  saveImage(file, user) {
    try {
    const pathFolder = `./static/${user.login}`;
    fs.mkdir(pathFolder, { recursive: true }, err => {
      if(err) throw err;
    });

    const fileName = uuid.v4() + '.jpg';
    const filePath = path.resolve(pathFolder, fileName);
    
    file.image.mv(filePath);
    return fileName;
    } catch (err) {
      console.log('err --> ', err);
    }
  }

  removeImage(fileName, user) {    try {
      const pathFolder = `./static/${user.login}`;
      const filePath = path.resolve(pathFolder, fileName);
      fs.unlinkSync(filePath);
      return fileName;
    } catch {
      console.log('err --> ', err);
    }
  }
}

export default new FileService;