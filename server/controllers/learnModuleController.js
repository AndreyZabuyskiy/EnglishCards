import ApiError from "../error/ApiError.js";
import learnService from "../services/learnModuleService.js";

class LearnModuleController {
  async getLearnModule(req, res, next) {
    const userId = req.user.id;
    const moduleId = req.params.id;

    await learnService.getWriteModule(userId, moduleId)
    .then(responseService => {
      res.status(200).json(responseService);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    })
  }

  async checkCardAnswer(req, res, next) {
    const cardId = req.params.id;
    const { answer } = req.body;

    await learnService.checkAnswer(cardId, answer)
    .then(responseService => {
      res.status(200).json(responseService);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
  }

  async getResultWriteModule(req, res, next) {
    const userId = req.user.id;
    const moduleId = req.params.id;

    await learnService.getResultWriteModule(userId, moduleId)
    .then(responseService => {
      res.status(200).json(responseService);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
  }
}

export default new LearnModuleController();