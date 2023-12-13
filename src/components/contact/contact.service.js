const CommonService = require('../../../libs/shared/src/sequelize/common.service');
const Contact = require('../../../libs/service/src/repository/contact/contact');

class ContactService extends CommonService {
  constructor() {
    super({ model: Contact });
  }
}

module.exports = new ContactService();
