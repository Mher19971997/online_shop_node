const authRouter = require('./components/auth/auth.controller');
const imagesRouter = require('./components/images/images.controller');
const catalogRouter = require('./components/catalog/catalog.controller');
const categorieRouter = require('./components/categorie/categorie.controller');
const subCategorieRouter = require('./components/subCategorie/subCategorie.controller');
const basketRouter = require('./components/basket/basket.controller');
const userRouter = require('./components/user/user.controller');
const commentRouter = require('./components/comment/comment.controller');
const cardRouter = require('./components/card/card.controller');
const orderRouter = require('./components/order/order.controller');

module.exports = (app) => {
  app.use('/auth', authRouter);
  app.use('/user', userRouter);
  app.use('/catalog', catalogRouter);
  app.use('/images', imagesRouter);
  app.use('/categorie', categorieRouter);
  app.use('/subCategorie', subCategorieRouter);
  app.use('/basket', basketRouter);
  app.use('/comment', commentRouter);
  app.use('/card', cardRouter);
  app.use('/order', orderRouter);
};
