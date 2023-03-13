class MemorizationController {
  async getModule(req, res, next) {
    return res.status(200).json('getModule');
  }
}

export default new MemorizationController();