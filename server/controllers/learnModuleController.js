class LearnModuleController {
  async getLearnModule(req, res, next) {
    const userId = req.user.id;
    const moduleId = req.params.id;

    return res.status(200).json({userId, moduleId});
  }
}

export default new LearnModuleController();