import learnService from "../services/learnModuleService.js";

class LearnModuleController {
  async getLearnModule(req, res, next) {
    await learnService.createWriteModule().then(responseService => {
      res.status(200).json(responseService);
    })
  }
}

export default new LearnModuleController();