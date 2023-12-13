const CatalogInfo = require('../../../libs/service/src/repository/catalogs/catalogs-info');
const CommonService = require('../../../libs/shared/src/sequelize/common.service');

class CatalogInfoService extends CommonService {
  constructor() {
    super({ model: CatalogInfo });
  }
}

module.exports = new CatalogInfoService();