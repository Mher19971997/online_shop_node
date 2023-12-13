const Basket = require('./basket/basket');
const BasketDevice = require('./basket/basket-device');
const Categorie = require('./categorie/categorie');
const Contact = require('./contact/contact');
const Catalog = require('./catalogs/catalogs');
const CatalogInfo = require('./catalogs/catalogs-info');
const Images = require('./image/image');
const SubCategorie = require('./subCategorie/subCategories');
const TypeBrand = require('./subCategorie/type-brand');
const User = require('./user/user');
const Comment = require('./comments/comments');
const Card = require('./card/card');
const CardBalance = require('./card/card-balance');
const Order = require('./order/order');

User.hasOne(Order);
Order.belongsTo(User, {
  targetKey: 'uuid',
  foreignKey: 'userUuid',
  as: 'user'
});

Catalog.hasMany(Order);
Order.belongsTo(Catalog, {
  targetKey: 'uuid',
  foreignKey: 'catalogUuid',
  as: 'catalog'
});


User.hasOne(Card);
Card.belongsTo(User, {
  targetKey: 'uuid',
  foreignKey: 'userUuid',
  as: 'users'
});

User.hasOne(CardBalance);
CardBalance.belongsTo(User, {
  targetKey: 'uuid',
  foreignKey: 'userUuid',
  as: 'users'
});

Card.hasOne(CardBalance);
CardBalance.belongsTo(Card, {
  targetKey: 'uuid',
  foreignKey: 'cardUuid',
  as: 'cardsBalances'
});


User.hasOne(Basket);
Basket.belongsTo(User, {
  targetKey: 'uuid',
  foreignKey: 'userUuid',
  as: 'users'
});

Catalog.hasMany(Basket);
Basket.belongsTo(Catalog, {
  targetKey: 'uuid',
  foreignKey: 'catalogUuid',
  as: 'catalog'
});

SubCategorie.hasMany(Catalog);
Catalog.belongsTo(SubCategorie, {
  targetKey: 'uuid',
  foreignKey: 'subCategoryUuid',
  as: 'subCategory'
});

Categorie.hasMany(Catalog);
Catalog.belongsTo(Categorie, {
  targetKey: 'uuid',
  foreignKey: 'categoryUuid',
  as: 'category'
});

Catalog.hasMany(CatalogInfo);
CatalogInfo.belongsTo(Catalog, {
  targetKey: 'uuid',
  foreignKey: 'catalogUuid',
  as: 'catalogInfos'
});

User.hasMany(Comment);
Comment.belongsTo(User, {
  targetKey: 'uuid',
  foreignKey: 'userUuid',
  as: 'users'
});

Catalog.hasMany(Comment);
Comment.belongsTo(Catalog, {
  targetKey: 'uuid',
  foreignKey: 'catalogUuid',
  as: 'comments'
});


Catalog.hasMany(Images);
Images.belongsTo(Catalog, {
  targetKey: 'uuid',
  foreignKey: 'catalogUuid',
  as: 'images'
});

SubCategorie.belongsToMany(Categorie, { through: TypeBrand });
Categorie.belongsToMany(SubCategorie, { through: TypeBrand });

const repositories = [
  User,
  SubCategorie,
  TypeBrand,
  Images,
  Catalog,
  CatalogInfo,
  Contact,
  Categorie,
  Basket,
  BasketDevice,
  Comment,
  Card,
  CardBalance,
  Order
];

module.exports = repositories;