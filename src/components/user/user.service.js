const User = require('../../../libs/service/src/repository/user/user');

const CommonService = require('../../../libs/shared/src/sequelize/common.service');

class UserService extends CommonService {
  constructor() {
    super({ model: User });
  }

  getAllUsers = async (req, res, next) => {
    try {
      const { queryMeta = {}, includeMeta = '' } = req.query;
      const users = await this.findAll({
        queryMeta,
        includeMeta
      });
      return res.json(users);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  getUserByUuid = async (req, res, next) => {
    try {
      const user = req.user;
      const oneUser = await this.findOne({ uuid: user.uuid });
      return res.json(oneUser);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

module.exports = new UserService();
