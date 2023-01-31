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
    const userId = req.user.id;
    const module = req.body;

    console.log('module -->', module);
    
    await testModuleService.checkTest(userId, module)
    .then(responseService => {
      res.status(200).json(responseService);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
  }
}

export default new TestModuleController();