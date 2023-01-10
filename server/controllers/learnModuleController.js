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
    
    await learnModuleService.getLearnRoundByModuleId(moduleId)
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

  async getLearnRoundById(req, res, next) {
    const roundId = req.params.id;
    
    await learnModuleService.getLearnRoundById(roundId)
    .then(responseService => {
      res.status(200).json(responseService);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
  }

  async getResultRoundById(req, res, next) {
    const roundId = req.params.id;
    
    await learnModuleService.getResultRoundById(roundId)
    .then(responseService => {
      res.status(200).json(responseService);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
  }

  async createRound(req, res, next) {
    const moduleId = req.params.id;
      
    await learnModuleService.createLearnModuleRound(moduleId)
    .then(responseService => {
      res.status(200).json(responseService);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
  }

  async checkLearnWriteCard(req, res, next) {
    const cardId = req.params.id;
    const answer = req.body.answer;
    
    await learnModuleService.checkLearnWriteCard(cardId, answer)
    .then(responseService => {
      res.status(200).json(responseService);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
  }
}

export default new LearnModuleController();