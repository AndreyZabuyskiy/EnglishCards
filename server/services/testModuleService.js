import StudyModule from "../models/StudyModule.js";
import Card from '../models/Card.js';
import { countGroupsByModuleSize } from '../helpers/countGroupsByModuleSize.js';


class TestModuleService {
  async getTestModule(userId, moduleId) {
    const module = await StudyModule.findById(moduleId);
    const cards = await Card.find({ module: moduleId });

    const testModule = {
      title: module.title,
      countCards: cards.length,
      groups: {
        trueOrFalseCards: [],
        testCards: [],
        joinCards: [],
        writeCards: []
      }
    }
    
    return 'getTestModule';
  }
}

export default new TestModuleService();