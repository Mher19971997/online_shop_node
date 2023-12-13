const CommonService = require('../../../libs/shared/src/sequelize/common.service');
const SubCategorie = require('../../../libs/service/src/repository/subCategorie/subCategories');
const response = require('../../../helpers/http/response');

class SubCategorieService extends CommonService {
  constructor() {
    super({ model: SubCategorie });
  }

  findAllType = async (req, res, next) => {
    try {
      const types = await this.findAll();
      return res.json(types);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  createType = async (req, res, next) => {
    try {
      const { name } = req.body;

      const subCategorieOne = await this.findOne({ name });

      if (subCategorieOne) {
        return res.status(response.status.BAD_REQUEST).json(
          response.dispatch({
            message: 'Categorie name exist',
            statusCode: response.status.BAD_REQUEST,
            path: req.originalUrl
          })
        );
      }

      const type = await this.create({ name });
      return res.json(type);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

module.exports = new SubCategorieService();
