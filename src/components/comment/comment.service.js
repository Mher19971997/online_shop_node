const Comment = require('../../../libs/service/src/repository/comments/comments');
const CommonService = require('../../../libs/shared/src/sequelize/common.service');

class CommentService extends CommonService {
  constructor() {
    super({ model: Comment });
  }

  createComment = async (req, res, next) => {
    try {
      const { uuid } = req.params;
      const { uuid: userUuid } = req.user;
      const { text } = req.body;
      const comment = this.create({
        catalogUuid: uuid,
        userUuid: userUuid,
        text: text
      });
      return res.json(comment);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

module.exports = new CommentService();