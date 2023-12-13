const { constants } = require('../../../helpers/constants');
const response = require('../../../helpers/http/response');
const util = require('../../../libs/shared/src/util/util');
const User = require('../../../libs/service/src/repository/user/user');

// Services
const cryptoService = require('../../../libs/shared/src/crypto/crypto.service');
const NodemailerService = require('../../../libs/shared/src/email/nodemailer/nodemailer.service');
const CommonService = require('../../../libs/shared/src/sequelize/common.service');
const ContactService = require('../contact/contact.service');
const JWTService = require('../../../libs/shared/src/jwt/jwt.service');

class AuthService extends CommonService {
  constructor() {
    super({ model: User });
    this.nodemailerService = NodemailerService;
    this.contactService = ContactService;
    this.jwtService = JWTService;
  }

  checkEmail = async (req, res, next) => {
    try {
      const { email } = req.body;

      const emailData = await this.contactService.findOne({
        filterMeta: { value: email, type: constants.VERIFY_CONTACT }
      });

      if (emailData) {
        const lastTime = util.calcLastTime(emailData.updatedAt, 55);

        if (lastTime) {
          return res.json({ after: lastTime });
        }
      }

      const code = cryptoService.numGen(111111, 999999);

      await this.nodemailerService.senEmailCode({ to: email, code: code });

      await this.contactService.create({
        code,
        type: constants.VERIFY_CONTACT,
        status: constants.STATUS_PENDING,
        value: email
      });

      return res.json({ processing: true });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  verifyAndRegister = async (req, res, next) => {
    try {
      const { email, code } = req.body;

      const contact = await this.contactService.findOne({
        filterMeta: { value: email },
        queryMeta: {
          order: [['createdAt', 'DESC']]
        }
      });

      if (!contact) {
        return res.status(response.status.BAD_REQUEST).json(
          response.dispatch({
            message: 'User not found',
            statusCode: response.status.BAD_REQUEST,
            path: req.originalUrl
          })
        );
      }

      if (contact && contact.code !== code) {
        return res.status(response.status.BAD_REQUEST).json(
          response.dispatch({
            message: 'Faild verify',
            statusCode: response.status.BAD_REQUEST,
            path: req.originalUrl
          })
        );
      }

      let user = await this.findOne({ filterMeta: { email } });

      if (!user) {
        user = await this.create({ email, status: constants.STATUS_ENABLED });
      }


      await this.contactService.update(
        { uuid: contact.uuid },
        { status: constants.STATUS_VERIFIED }
      );

      return res.json({
        token: this.jwtService.generateToken({
          email: user.email,
          uuid: user.uuid
        })
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

module.exports = new AuthService();
