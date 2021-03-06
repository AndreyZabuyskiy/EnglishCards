import * as uuid from 'uuid';
import * as path from 'path';
import fs from 'fs';

class FileService {
  saveImage (file, user) {
    const pathFolder = `./static/${user.login}`;
    fs.mkdir(pathFolder, { recursive: true }, err => {
      if(err) throw err;
    });

    const fileName = uuid.v4() + '.jpg';
    const filePath = path.resolve(pathFolder, fileName);
    console.log('file path --> ', filePath);
    file.picture.mv(filePath);
    return filePath;
  }
}

export default new FileService;