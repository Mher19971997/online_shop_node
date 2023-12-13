const CommonService = require('../../../libs/shared/src/sequelize/common.service');
const CardBalance = require('../../../libs/service/src/repository/card/card-balance');

class CardBalanceService extends CommonService {
  constructor() {
    super({ model: CardBalance });
  }
}

module.exports = new CardBalanceService();