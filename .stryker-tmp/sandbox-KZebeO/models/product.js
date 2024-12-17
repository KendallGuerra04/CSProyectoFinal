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
const {
  DataTypes
} = require('sequelize');
const {
  sequelize
} = require('./index');
const Category = require('./category');
const Product = sequelize.define(stryMutAct_9fa48("36") ? "" : (stryCov_9fa48("36"), 'Product'), stryMutAct_9fa48("37") ? {} : (stryCov_9fa48("37"), {
  name: stryMutAct_9fa48("38") ? {} : (stryCov_9fa48("38"), {
    type: DataTypes.STRING,
    allowNull: stryMutAct_9fa48("39") ? true : (stryCov_9fa48("39"), false)
  }),
  price: stryMutAct_9fa48("40") ? {} : (stryCov_9fa48("40"), {
    type: DataTypes.FLOAT,
    allowNull: stryMutAct_9fa48("41") ? true : (stryCov_9fa48("41"), false)
  }),
  description: stryMutAct_9fa48("42") ? {} : (stryCov_9fa48("42"), {
    type: DataTypes.TEXT
  }),
  inventory: stryMutAct_9fa48("43") ? {} : (stryCov_9fa48("43"), {
    type: DataTypes.INTEGER,
    allowNull: stryMutAct_9fa48("44") ? true : (stryCov_9fa48("44"), false),
    defaultValue: 0,
    validate: stryMutAct_9fa48("45") ? {} : (stryCov_9fa48("45"), {
      min: 0
    })
  }),
  taxRate: stryMutAct_9fa48("46") ? {} : (stryCov_9fa48("46"), {
    type: DataTypes.FLOAT,
    allowNull: stryMutAct_9fa48("47") ? true : (stryCov_9fa48("47"), false),
    defaultValue: 0,
    validate: stryMutAct_9fa48("48") ? {} : (stryCov_9fa48("48"), {
      min: 0,
      max: 1 // Represents tax rate as decimal (e.g., 0.1 for 10%)
    })
  })
}));
Product.belongsTo(Category, stryMutAct_9fa48("49") ? {} : (stryCov_9fa48("49"), {
  foreignKey: stryMutAct_9fa48("50") ? "" : (stryCov_9fa48("50"), 'categoryId')
}));
module.exports = Product;