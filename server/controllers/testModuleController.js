import ApiError from '../error/ApiError.js';
import testModuleService from '../services/testModuleService.js';

class TestModuleController {
  async getTestModule(req, res, next) {
    const userId = req.user.id;
    const moduleId = req.params.id;
    
    await testModuleService.getTestModule(userId, moduleId)
    .then(responseService => {
      res.status(200).json(responseService);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
  }

  async checkTest(req, res, next) {
    const { id } = req.params;
    const testModule = req.body;
    
    await testModuleService.checkTest(id, testModule)
    .then(responseService => {
      res.status(200).json(responseService);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
  }
}

export default new TestModuleController();