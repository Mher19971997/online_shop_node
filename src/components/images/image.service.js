const CommonService = require('../../../libs/shared/src/sequelize/common.service');
const Images = require('./../../../libs/service/src/repository/image/image');

class ImageService extends CommonService {
  constructor() {
    super({ model: Images });
  }

  createImage = async (req, res, next) => {
    try {
      const { catalogUuid } = req.body;
      const catalog = await this.create({
        image: `images/${req.file.filename}`,
        catalogUuid
      });
      return res.json(catalog);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  findAllImages = async (req, res, next) => {
    try {
      const images = await this.findAll();
      return res.json(images);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  findOneImage = async (req, res, next) => {
    try {
      const { uuid } = req.params;
      const device = await this.findOne({ uuid });
      return res.json(device);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  removeImage = async (req, res, next) => {
    try {
      const { uuid } = req.params;
      const device = await this.remove({ uuid });
      return res.json(device);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

module.exports = new ImageService();
