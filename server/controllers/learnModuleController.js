import ApiError from "../error/ApiError.js";
import learnModuleService from "../services/learnModuleService.js";

class LearnModuleController {
  async getLearnModule(req, res, next) {
    const userId = req.user.id;
    const moduleId = req.params.id;

    await learnModuleService.getLearnModule(userId, moduleId)
    .then(responseService => {
      res.status(200).json(responseService);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
  }

  async getLearnModuleRound(req, res, next) {
    const userId = req.user.id;
    const moduleId = req.params.id;

    await learnModuleService.getLearnModuleRound(userId, moduleId)
    .then(responseService => {
      res.status(200).json(responseService);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
  }
}

export default new LearnModuleController();