const path = require('path');
const fs = require('fs');
const { template } = require('lodash');

class TemplateService {
  constructor() {
    this.templates = new Map();
  }

  async loadTemplate(templateName) {
    const templatesFolder = path.join(process.cwd(), 'src', 'views');
    this.templates.set(
      templateName,
      template(
        fs
          .readFileSync(path.join(templatesFolder, `${templateName}.html`))
          .toString('utf-8')
      )
    );
    return this.templates;
  }
}

module.exports = new TemplateService();
