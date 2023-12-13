const ConfigService = require('../../config/config.service');
const TemplateService = require('../template/template.service');
const ConfigurationService = require('../../../../../src/components/configuration/configuration.service')
const nodemailer = require('nodemailer');
const Logger = require('../../util/logger');

class NodemailerService {
  constructor() {
    queueMicrotask(() => this.loadConfig());
    this.logger = new Logger(NodemailerService.name)
    this.emailConfiguration 
    this.configurationService = ConfigurationService 
    this.configService = ConfigService
    this.templateService = TemplateService
    this.transporter
  }

  senEmailCode = async (data) => {
    const template = await this.templateService.loadTemplate('email');

    const mailOptions = {
      from: this.emailConfiguration.value.defaults.from,
      to: data.to,
      subject: 'Online Shop company',
      text: 'verification content',
      html: template.get('email')({ code: data.code }),
      ...this.configService.get('service.nodemailer.options.attachments')
    };

    return this.transporter.sendMail(mailOptions);
  };

  async loadConfig() {
    this.emailConfiguration = await this.configurationService.getNodeMailerConfig();
    
    this.transporter = await nodemailer.createTransport(this.emailConfiguration.value.transport);
    await this.transporter.verify((error, success) =>
    this.logger.debug(
        error
          ? `MailerError: ${JSON.stringify(error.message)}`
          : `Server is ready to take our messages`
      )
    );  
  }
}

module.exports = new NodemailerService();
