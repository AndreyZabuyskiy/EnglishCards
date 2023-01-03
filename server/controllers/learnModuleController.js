import ApiError from "../error/ApiError.js";
import learnModuleService from "../services/learnModuleService.js";

class LearnModuleController {
  async getLearnModule(req, res, next) {
    const userId = req.user.id;
    const moduleId = req.params.id;
    
    await learnModuleService.getLearnModuleByModuleId(userId, moduleId)
    .then(responseService => {
      res.status(200).json(responseService);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
  }

  async getLearnRoundByModuleId(req, res, next) {
    const moduleId = req.params.id;
    
    await learnModuleService.getLearnModuleRound(moduleId)
    .then(responseService => {
      res.status(200).json(responseService);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
  }

  async getLearnCardByRoundId(req, res, next) {
    const roundId = req.params.id;

    await learnModuleService.getCardByRoundId(roundId)
    .then(responseService => {
      res.status(200).json(responseService);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
  }

  async checkLearnTestCard(req, res, next) {
    const cardId = req.params.id;
    const optionId = req.body.optionId;
    
    await learnModuleService.checkLearnTestCard(cardId, optionId)
    .then(responseService => {
      res.status(200).json(responseService);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
  }
}

export default new LearnModuleController();