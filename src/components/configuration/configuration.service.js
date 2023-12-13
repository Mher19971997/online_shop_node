const Configuration = require('../../../libs/service/src/repository/configuration/configuration');
const CommonService = require('../../../libs/shared/src/sequelize/common.service');

class ConfigurationService extends CommonService {
  constructor() {
    super({ model: Configuration });
  }

  async getConfig(module, name) {
    return await this.findOne({ filterMeta: { module, name } });
  }

  async getNodeMailerConfig() {
    return await this.getConfig('lib', 'nodemailer.service');
  }
}

module.exports = new ConfigurationService();
