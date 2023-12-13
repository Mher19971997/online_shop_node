const CommonService = require('../../../libs/shared/src/sequelize/common.service');
const Categorie = require('../../../libs/service/src/repository/categorie/categorie');
const response = require('../../../helpers/http/response');

class CategorieService extends CommonService {
  constructor() {
    super({ model: Categorie });
  }

  createCategorie = async (req, res, next) => {
    try {
      const { name } = req.body;
      const categorieOne = await this.findOne({ name });

      if (categorieOne) {
        return res.status(response.status.BAD_REQUEST).json(
          response.dispatch({
            message: 'Categorie name exist',
            statusCode: response.status.BAD_REQUEST,
            path: req.originalUrl
          })
        );
      }

      const categorie = await this.create({ name });

      return res.json(categorie);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  findAllCategorie = async (req, res, next) => {
    try {
      const categorie = await this.findAll();
      return res.json(categorie);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  removeCategorie = async (req, res, next) => {
    try {
      const { uuid } = req.params;
      const categorie = await this.remove({ uuid });
      return res.json(categorie);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

module.exports = new CategorieService();
