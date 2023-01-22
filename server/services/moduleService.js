import StudyModule from "../models/StudyModule.js";
import Card from '../models/Card.js';
import UserVisitedModule from "../models/UserVisitedModule.js";

class ModuleService {
  async getModulesByUser(userId) {
    const data = [];
    const modules = await StudyModule.find({ user: userId });

    for(let mod of modules) {
      const cards = await Card.find({ module: mod._id });
      
      const obj = {
        ...mod._doc,
        countWords: cards.length
      }

      data.push(obj);
    }

    data.sort((first, second) => {
      const firstTime = new Date(first.createdAt);
      const secondTime = new Date(second.createdAt);
        
      if (firstTime.getTime() < secondTime.getTime()) {
        return 1;
      } else if (firstTime.getTime() > secondTime.getTime()) {
        return -1;
      }

      return 0;
    });

    const dataModules = [];

    const currentDate = new Date();

    const firstMinutesMilliseconds = 10 * 60 * 1000;
    const firstMinutesModules = data.filter(_module => {
      const createdModuleDate = new Date(_module.createdAt);
      return (currentDate.getTime() - firstMinutesMilliseconds) < createdModuleDate.getTime();
    });

    dataModules.push({
      title: 'during a few minutes',
      data: firstMinutesModules
    });

    let count = firstMinutesModules.length;
    let _modules = [];
    for (let i = count; i < data.length; ++i) {
      _modules.push(data[i]);
    }

    const hourMilliseconds = 60 * 60 * 1000;
    const hourModules = _modules.filter(_module => {
      const createdModuleDate = new Date(_module.createdAt);
      return (currentDate.getTime() - hourMilliseconds) < createdModuleDate.getTime();
    });

    dataModules.push({
      title: 'during a hour',
      data: hourModules
    });

    count += hourModules.length;
    _modules = [];
    for (let i = count; i < data.length; ++i) {
      _modules.push(data[i]);
    }
    
    const dayMilliseconds = 24 * 60 * 60 * 1000;
    const todayModules = _modules.filter(_module => {
      const createdModuleDate = new Date(_module.createdAt);
      return (currentDate.getTime() - dayMilliseconds) < createdModuleDate.getTime();
    });

    dataModules.push({
      title: 'during today',
      data: todayModules
    });

    count += todayModules.length;
    _modules = [];
    for (let i = count; i < data.length; ++i) {
      _modules.push(data[i]);
    }

    const weekMilliseconds = 7 * 24 * 60 * 60 * 1000;
    const weekModules = _modules.filter(_module => {
      const createdModuleDate = new Date(_module.createdAt);
      return (currentDate.getTime() - weekMilliseconds) < createdModuleDate.getTime();
    });

    dataModules.push({
      title: 'during the week',
      data: weekModules
    });

    count += weekModules.length;
    _modules = [];
    for (let i = count; i < data.length; ++i) {
      _modules.push(data[i]);
    }

    const mounthMilliseconds = 30 * 24 * 60 * 60 * 1000;
    const mounthModules = _modules.filter(_module => {
      const createdModuleDate = new Date(_module.createdAt);
      return (currentDate.getTime() - mounthMilliseconds) < createdModuleDate.getTime();
    });

    dataModules.push({
      title: 'during the month',
      data: mounthModules
    });

    count += mounthModules.length;
    _modules = [];
    for (let i = count; i < data.length; ++i) {
      _modules.push(data[i]);
    }

    dataModules.push({
      title: 'other time',
      data: _modules
    });

    return dataModules;
  }

  async viewModule (userId, moduleId) {
    const module = await StudyModule.findById({ _id: moduleId });
    const cards = await Card.find({ module: moduleId });

    await this.addOrUpdateUserVisitedModule(userId, moduleId);
    return { module, cards };
  }

  async getVisitedModules(userId) {
    const visitedModules = await UserVisitedModule.find({ user: userId });

    visitedModules.sort((a, b) => {
      if (a.viewingTime > b.viewingTime) {
        return -1;
      } else if (a.visitedModules < b.visitedModules) {
        return 1;
      }

      return 0;
    });

    const modules = [];
    await Promise.all(visitedModules.map(async _visitedModule => {
      const module = await StudyModule.findById(_visitedModule.module);
      modules.push(module);
    }));

    return modules;
  }

  async createModule(userId, title, description, cards) {
    const moduleDoc = new StudyModule({
      title,
      description,
      user: userId
    });
  
    const newModule = await moduleDoc.save();
    
    cards.map(async (card) => {
      const cardDoc = new Card({
        value: card.value,
        translate: card.translate,
        pathToFile: card.pathToFile,
        urlToImage: card.urlToImage,
        module: newModule._id
      });
  
      await cardDoc.save();
    });

    return { module: newModule, cards };
  }

  async updateModule(userId, moduleId, title, description, cards) {
    const module = {
      _id: moduleId,
      title,
      description,
      user: userId
    };

    const updateModule = await StudyModule.findByIdAndUpdate(moduleId, module, { new: true });

    const findCards = await Card.find({ module: moduleId });
    findCards.map(async (card) => await Card.findByIdAndDelete(card._id));

    cards.map(async card => {
      const cardDoc = new Card({
        value: card.value,
        translate: card.translate,
        imgUrl: card.imgUrl,
        module: moduleId
      });

      await cardDoc.save();
    });

    return { module: updateModule, cards };
  }

  async deleteModule (moduleId) {
    const deletedModule = await StudyModule.findByIdAndDelete(moduleId);
    
    const cards = await Card.find({ module: moduleId });
    cards.map(async card => {
      await Card.findByIdAndDelete(card._id);
    });

    return deletedModule;
  }

  async addOrUpdateUserVisitedModule(userId, moduleId) {
    const findedUserModule = await UserVisitedModule.find({ user: userId, module: moduleId });
    if (findedUserModule.length !== 0) {      
      const updatedUserModule = {
        _id: findedUserModule[0]._id,
        user: findedUserModule[0].user,
        module: findedUserModule[0].module,
        viewingTime: new Date().getTime()
      }

      await UserVisitedModule.findByIdAndUpdate(findedUserModule[0]._id, updatedUserModule, { new: true });
    } else {
      const userModuleDoc = new UserVisitedModule({
        user: userId, module: moduleId, viewingTime: new Date().getTime()
      });

      await userModuleDoc.save();
    }
  }
}

export default new ModuleService;