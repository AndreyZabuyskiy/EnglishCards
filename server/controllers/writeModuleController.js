import ApiError from "../error/ApiError.js";
import writeService from "../services/writeModuleService.js";

class WriteModuleController {
  async getLearnModule(req, res, next) {
    const userId = req.user.id;
    const moduleId = req.params.id;

    await writeService.getWriteModule(userId, moduleId)
      .then(responseService => {
      console.log('responsiveService -->', responseService);
      res.status(200).json(responseService);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    })
  }

  async checkCardAnswer(req, res, next) {
    const cardId = req.params.id;
    const { answer } = req.body;

    await writeService.checkAnswer(cardId, answer)
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

    await writeService.getResultWriteModule(userId, moduleId)
    .then(responseService => {
      res.status(200).json(responseService);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
  }

  async removeLearnModuleById(req, res, next) {
    const userId = req.user.id;
    const moduleId = req.params.id;

    await writeService.removeLearnModuleById(userId, moduleId)
    .then(responseService => {
      res.status(200).json(responseService);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
  }
}

export default new WriteModuleController();