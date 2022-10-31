class LearnModuleController {
  async getLearnModule(req, res, next) {
    res.status(200).json({
      message: "Success"
    });
  }
}

export default new LearnModuleController();