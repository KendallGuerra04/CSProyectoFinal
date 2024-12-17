// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
const Product = require('../models/product');
const Category = require('../models/category');
const {
  Op
} = require('sequelize');
class ProductService {
  static async getAllProducts() {
    if (stryMutAct_9fa48("185")) {
      {}
    } else {
      stryCov_9fa48("185");
      return await Product.findAll();
    }
  }
  static async getProductById(id) {
    if (stryMutAct_9fa48("186")) {
      {}
    } else {
      stryCov_9fa48("186");
      return await Product.findByPk(id);
    }
  }
  static async createProduct(product) {
    if (stryMutAct_9fa48("187")) {
      {}
    } else {
      stryCov_9fa48("187");
      // Check if category exists
      const category = await Category.findByPk(product.categoryId);
      if (stryMutAct_9fa48("190") ? false : stryMutAct_9fa48("189") ? true : stryMutAct_9fa48("188") ? category : (stryCov_9fa48("188", "189", "190"), !category)) {
        if (stryMutAct_9fa48("191")) {
          {}
        } else {
          stryCov_9fa48("191");
          throw new Error(stryMutAct_9fa48("192") ? `` : (stryCov_9fa48("192"), `Category with id ${product.categoryId} does not exist`));
        }
      }
      return await Product.create(product);
    }
  }
  static async updateProduct(id, product) {
    if (stryMutAct_9fa48("193")) {
      {}
    } else {
      stryCov_9fa48("193");
      // If categoryId is being updated, check if new category exists
      if (stryMutAct_9fa48("195") ? false : stryMutAct_9fa48("194") ? true : (stryCov_9fa48("194", "195"), product.categoryId)) {
        if (stryMutAct_9fa48("196")) {
          {}
        } else {
          stryCov_9fa48("196");
          const category = await Category.findByPk(product.categoryId);
          if (stryMutAct_9fa48("199") ? false : stryMutAct_9fa48("198") ? true : stryMutAct_9fa48("197") ? category : (stryCov_9fa48("197", "198", "199"), !category)) {
            if (stryMutAct_9fa48("200")) {
              {}
            } else {
              stryCov_9fa48("200");
              throw new Error(stryMutAct_9fa48("201") ? `` : (stryCov_9fa48("201"), `Category with id ${product.categoryId} does not exist`));
            }
          }
        }
      }
      return await Product.update(product, stryMutAct_9fa48("202") ? {} : (stryCov_9fa48("202"), {
        where: stryMutAct_9fa48("203") ? {} : (stryCov_9fa48("203"), {
          id
        })
      }));
    }
  }
  static async deleteProduct(id) {
    if (stryMutAct_9fa48("204")) {
      {}
    } else {
      stryCov_9fa48("204");
      return await Product.destroy(stryMutAct_9fa48("205") ? {} : (stryCov_9fa48("205"), {
        where: stryMutAct_9fa48("206") ? {} : (stryCov_9fa48("206"), {
          id
        })
      }));
    }
  }
  static async getProductsByCategories(categoryIdsStr, options = {}) {
    if (stryMutAct_9fa48("207")) {
      {}
    } else {
      stryCov_9fa48("207");
      const categoryIds = categoryIdsStr ? categoryIdsStr.split(stryMutAct_9fa48("208") ? "" : (stryCov_9fa48("208"), ',')).map(stryMutAct_9fa48("209") ? () => undefined : (stryCov_9fa48("209"), id => parseInt(id))) : stryMutAct_9fa48("210") ? ["Stryker was here"] : (stryCov_9fa48("210"), []);
      if (stryMutAct_9fa48("213") ? false : stryMutAct_9fa48("212") ? true : stryMutAct_9fa48("211") ? categoryIds.length : (stryCov_9fa48("211", "212", "213"), !categoryIds.length)) {
        if (stryMutAct_9fa48("214")) {
          {}
        } else {
          stryCov_9fa48("214");
          throw new Error(stryMutAct_9fa48("215") ? "" : (stryCov_9fa48("215"), 'Categories parameter is required'));
        }
      }
      const {
        sort,
        limit,
        offset
      } = options;
      const queryOptions = stryMutAct_9fa48("216") ? {} : (stryCov_9fa48("216"), {
        where: stryMutAct_9fa48("217") ? {} : (stryCov_9fa48("217"), {
          categoryId: stryMutAct_9fa48("218") ? {} : (stryCov_9fa48("218"), {
            [Op.in]: Array.isArray(categoryIds) ? categoryIds : stryMutAct_9fa48("219") ? [] : (stryCov_9fa48("219"), [categoryIds])
          })
        }),
        include: Category
      });

      // Add sorting if specified
      if (stryMutAct_9fa48("221") ? false : stryMutAct_9fa48("220") ? true : (stryCov_9fa48("220", "221"), sort)) {
        if (stryMutAct_9fa48("222")) {
          {}
        } else {
          stryCov_9fa48("222");
          queryOptions.order = stryMutAct_9fa48("223") ? [] : (stryCov_9fa48("223"), [sort.split(stryMutAct_9fa48("224") ? "" : (stryCov_9fa48("224"), ','))]);
        }
      }

      // Add pagination if specified
      if (stryMutAct_9fa48("226") ? false : stryMutAct_9fa48("225") ? true : (stryCov_9fa48("225", "226"), limit)) {
        if (stryMutAct_9fa48("227")) {
          {}
        } else {
          stryCov_9fa48("227");
          queryOptions.limit = parseInt(limit);
        }
      }
      if (stryMutAct_9fa48("229") ? false : stryMutAct_9fa48("228") ? true : (stryCov_9fa48("228", "229"), offset)) {
        if (stryMutAct_9fa48("230")) {
          {}
        } else {
          stryCov_9fa48("230");
          queryOptions.offset = parseInt(offset);
        }
      }
      return await Product.findAll(queryOptions);
    }
  }
  static async getProductsByCategory(categoryId, options = {}) {
    if (stryMutAct_9fa48("231")) {
      {}
    } else {
      stryCov_9fa48("231");
      const {
        sort,
        limit,
        offset
      } = options;
      const queryOptions = stryMutAct_9fa48("232") ? {} : (stryCov_9fa48("232"), {
        where: stryMutAct_9fa48("233") ? {} : (stryCov_9fa48("233"), {
          categoryId
        }),
        include: Category
      });

      // Add sorting if specified
      if (stryMutAct_9fa48("235") ? false : stryMutAct_9fa48("234") ? true : (stryCov_9fa48("234", "235"), sort)) {
        if (stryMutAct_9fa48("236")) {
          {}
        } else {
          stryCov_9fa48("236");
          queryOptions.order = stryMutAct_9fa48("237") ? [] : (stryCov_9fa48("237"), [sort.split(stryMutAct_9fa48("238") ? "" : (stryCov_9fa48("238"), ','))]);
        }
      }

      // Add pagination if specified
      if (stryMutAct_9fa48("240") ? false : stryMutAct_9fa48("239") ? true : (stryCov_9fa48("239", "240"), limit)) {
        if (stryMutAct_9fa48("241")) {
          {}
        } else {
          stryCov_9fa48("241");
          queryOptions.limit = parseInt(limit);
        }
      }
      if (stryMutAct_9fa48("243") ? false : stryMutAct_9fa48("242") ? true : (stryCov_9fa48("242", "243"), offset)) {
        if (stryMutAct_9fa48("244")) {
          {}
        } else {
          stryCov_9fa48("244");
          queryOptions.offset = parseInt(offset);
        }
      }
      return await Product.findAll(queryOptions);
    }
  }
}
module.exports = ProductService;