const CommonService = require('../../../libs/shared/src/sequelize/common.service');
const Card = require('../../../libs/service/src/repository/card/card');
const { constants } = require('../../../helpers/constants');
const { pick } = require('lodash');
const response = require('../../../helpers/http/response');
const CardBalanceService = require('../cardBalance/cardBalance.service');

class CardService extends CommonService {
  constructor() {
    super({ model: Card });
    this.cardBalanceService = CardBalanceService;
  }

  createCard = async (req, res, next) => {
    try {
      const user = req.user;
      const inputDto = req.body;
      let association;

      for (const key in constants.CARD_TYPES) {
        if (constants.CARD_TYPES[key].test(inputDto.cardNumber)) {
          association = key;
          break;
        }
      }

      if (!association) association = 'BankCard';

      const card = await this.findOne({
        userUuid: user.uuid,
        association,
        ...pick(inputDto, ['cardNumber', 'expDate'])
      });

      if (card) {
        return res.status(response.status.BAD_REQUEST).json(
          response.dispatch({
            message: 'Card exist',
            statusCode: response.status.BAD_REQUEST,
            path: req.originalUrl
          })
        );
      }

      const cardDefault = this.findOne({ defaultCard: 1 });

      const createCard = await this.create({
        userUuid: user.uuid,
        association,
        defaultCard: cardDefault ? 0 : 1,
        ...pick(inputDto, ['clientName', 'cardNumber', 'cvv', 'expDate'])
      });

      await this.cardBalanceService.create({
        userUuid: user.uuid,
        cardUuid: createCard.uuid
      });

      return res.json(createCard);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  getAllCards = async (req, res, next) => {
    try {
      const user = req.user;
      const cards = await this.cardBalanceService.findAll({
        userUuid: user.uuid,
        // filterMeta: {
        // }
        includeMeta: [
          {
            association: 'users'
            // attributes: { exclude: ['uuid', 'createdAt', 'updatedAt', 'deletedAt', 'catalogUuid'] },
          }
        ]
      });

      return res.json(cards);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

module.exports = new CardService();