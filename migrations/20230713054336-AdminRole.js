'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('configurations', [
      {
        uuid: "d472d5cf-1b0a-43a4-91bc-d6f443e4bf01",
        module: 'lib',
        name: 'nodemailer.service',
        value: JSON.stringify({
          defaults: { from: 'KingCode' },
          transport: {
            auth: {
              pass: 'jtnwhhnuzeofcrqs',
              user: 'tigran.manukyan.2002@gmail.com'
            },
            service: 'gmail'
          }
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {}
};
