import memorizationService from "../services/memorizationService.js";

class MemorizationController {
  async getModule(req, res, next) {
    try {
      const moduleId = req.params.id;
      
      const result = await memorizationService.getModuleById(moduleId);
      res.status(200).json(result);
    } catch(err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async addCard(req, res, next) {
    try {
      const moduleId = req.params.id;
      const { cardId } = req.body;

      const card = await memorizationService.addCard(moduleId, cardId);
      res.status(200).json(card);
    } catch(err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async removeCard(req, res, next) {
    return res.status(200).json('remove card');
  }
}

export default new MemorizationController();