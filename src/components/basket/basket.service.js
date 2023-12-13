const Basket = require('../../../libs/service/src/repository/basket/basket');
const CommonService = require('../../../libs/shared/src/sequelize/common.service');
const response = require('../../../helpers/http/response');

class BasketService extends CommonService {
  constructor() {
    super({ model: Basket });
  }

  createBasket = async (req, res, next) => {
    try {
      const { uuid: userUuid } = req.user;
      const { catalogUuid } = req.body;
      const brand = await this.create({ userUuid, catalogUuid });
      return res.json(brand);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  updateBasket = async (req, res, next) => {
    try {
      const { uuid: userUuid } = req.user;
      const { uuid } = req.params;
      const { quantity } = req.body;

      const catalog = await this.findOne({ userUuid, uuid });

      if (!catalog) {
        return res.status(response.status.BAD_REQUEST).json(
          response.dispatch({
            message: 'Catalog not found',
            statusCode: response.status.BAD_REQUEST,
            path: req.originalUrl
          })
        );
      }

      const brand = await this.update(
        { userUuid, uuid },
        { quantity: catalog.quantity + quantity }
      );
      return res.json(brand);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  findAllBasket = async (req, res, next) => {
    try {
      const { uuid: userUuid } = req.user;

      const brand = await this.findAll({
        userUuid: userUuid,
        includeMeta: [
          {
            association: 'catalog',
            attributes: { exclude: ['catalogUuid', 'userUuid', 'catalogUuid'] },
            include: [
              {
                association: 'images',
                attributes: {
                  exclude: ['uuid', 'createdAt', 'updatedAt', 'deletedAt']
                }
              }
            ]
          }
        ]
      });
      return res.json(brand);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  removeBasket = async (req, res, next) => {
    try {
      const { uuid: userUuid } = req.user;
      const { uuid } = req.params;

      const brand = await this.remove({
        uuid,
        userUuid
      });
      return res.json(brand);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

module.exports = new BasketService();
