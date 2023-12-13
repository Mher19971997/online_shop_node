const Catalog = require('../../../libs/service/src/repository/catalogs/catalogs');
const CommonService = require('../../../libs/shared/src/sequelize/common.service');
const CatalogInfoService = require('../catalogInfo/catalogInfo.service');
const response = require('../../../helpers/http/response');

class CatalogService extends CommonService {
  constructor() {
    super({ model: Catalog });
    this.catalogInfoService = CatalogInfoService;

  }

  createCatalog = async (req, res, next) => {
    try {
      let { name, price, categoryUuid, subCategoryUuid, info, description } = req.body;
      const catalogFind = await this.findOne({ name, description }) 
     
      if (catalogFind) {
        return res.status(response.status.BAD_REQUEST).json(
          response.dispatch({
            message: 'Catalog name or description exist',
            statusCode: response.status.BAD_REQUEST,
            path: req.originalUrl
          })
        );
      }

      const catalog = await this.create({ name, price, subCategoryUuid, categoryUuid,description });

      if (info) {
        info = info;
        info.forEach(async ({ title, description }) => {
          await this.catalogInfoService.create({
            title,
            description,
            catalogUuid: catalog.uuid
          });
        });
      }

      return res.json(catalog);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  findAllCatalog = async (req, res, next) => {
    try {
      const {queryMeta = {}, filterMeta = {}, includeMeta = ""} = req.query
      // console.log(filter,"filterfilter");
      const catalogs = await this.findAll({
        filterMeta,
        includeMeta: [
          {
            association: 'images',
            attributes: { exclude: ['uuid', 'createdAt', 'updatedAt', 'deletedAt', 'catalogUuid'] },
          },
          {
            association: 'comments',
            attributes: { exclude: ['uuid','catalogUuid', 'userUuid', 'createdAt', 'updatedAt', 'deletedAt'] },
            include: [
              {
                association: 'users',
                attributes: { exclude: ['uuid','status', 'role', 'createdAt', 'updatedAt', 'deletedAt'] },
              },
            ],
          },
          includeMeta,
        ],
        queryMeta,

      });
      return res.json(catalogs);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  getOneCatalog = async (req, res, next) => {
    try {
      const { uuid } = req.params;
      const device = await this.findOne({
        filterMeta: { uuid },
        includeMeta: [
          {
            association: 'images',
            attributes: { exclude: ['uuid', 'createdAt', 'updatedAt', 'deletedAt', 'catalogUuid'] },

          },
          {
            association: 'catalogInfos',
            attributes: { exclude: ['uuid', 'createdAt', 'updatedAt', 'deletedAt', 'catalogUuid'] },
          },
          {
            association: 'subCategory',
            attributes: { exclude: ['uuid', 'createdAt', 'updatedAt', 'deletedAt'] },

          },
          {
            association: 'category',
            attributes: { exclude: ['uuid', 'createdAt', 'updatedAt', 'deletedAt'] },

          },
          {
            association: 'comments',
            attributes: { exclude: ['uuid','catalogUuid', 'userUuid', 'createdAt', 'updatedAt', 'deletedAt'] },
            include: [
              {
                association: 'users',
                attributes: { exclude: ['uuid','status', 'role', 'createdAt', 'updatedAt', 'deletedAt'] },
              },
            ],
          }
        ]
      });
      return res.json(device);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  removeCatalog = async (req, res, next) => {
    try {
      const { uuid } = req.params;
      const categorie = await this.remove({uuid});
      return res.json(categorie);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

module.exports = new CatalogService();