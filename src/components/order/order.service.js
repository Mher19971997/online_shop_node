const CommonService = require('../../../libs/shared/src/sequelize/common.service');
const Order = require('../../../libs/service/src/repository/order/order');
const { pick } = require('lodash');
const cryptoService = require('../../../libs/shared/src/crypto/crypto.service');
const BasketService = require('../basket/basket.service');
const response = require('../../../helpers/http/response');

class OrderService extends CommonService {
  constructor() {
    super({ model: Order });
    this.basketService = BasketService;
  }

  createOrder = async (req, res, next) => {
    try {
      const { uuid } = req.params;

      const user = req.user;
      const inputDto = req.body;

      const basket = await this.basketService.findOne({
        uuid: uuid,
        userUuid: user.uuid,
        includeMeta: [
          {
            association: 'catalog',
            attributes: { exclude: ['catalogUuid', 'userUuid', 'catalogUuid'] }
          }
        ]
      });

      if (!basket) {
        return res.status(response.status.BAD_REQUEST).json(
          response.dispatch({
            message: 'Catalog not fount in basket',
            statusCode: response.status.BAD_REQUEST,
            path: req.originalUrl
          })
        );
      }

      const order = await this.create({
        ...pick(inputDto, ['type', 'status']),
        price: basket.quantity * basket.catalog.price,
        catalogUuid: basket.catalogUuid,
        quantity: basket.quantity,
        userUuid: user.uuid,
        order_N: cryptoService.numGen(111111, 999999)
      });
      return res.json(order);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  getAllOrders = async (req, res, next) => {
    try {
      const { queryMeta = {}, filterMeta = {}, includeMeta = '' } = req.query;
      console.log(filterMeta, 'filterMetafilterMeta');
      const orders = await this.findAll({
        filterMeta,
        includeMeta: [
          {
            association: 'user',
            attributes: {
              exclude: [
                'uuid',
                'createdAt',
                'updatedAt',
                'deletedAt',
                'catalogUuid'
              ]
            }
          },
          {
            association: 'catalog',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'deletedAt', 'catalogUuid']
            },
            include: [
              {
                association: 'images',
                attributes: {
                  exclude: [
                    'uuid',
                    'status',
                    'role',
                    'createdAt',
                    'updatedAt',
                    'deletedAt'
                  ]
                }
              }
            ]
          },
          includeMeta
        ],
        queryMeta
      });
      return res.json(orders);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  deleteOrder = async (req, res, next) => {
    try {
      const { uuid } = req.params;
      const order = await this.remove({ uuid });
      return res.json(order);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

module.exports = new OrderService();
