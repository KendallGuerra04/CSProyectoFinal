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
  sequelize
} = require('./index');
const {
  DataTypes
} = require('sequelize');
const Cart = require('./cart');
const Product = require('./product');
const CartItem = sequelize.define(stryMutAct_9fa48("8") ? "" : (stryCov_9fa48("8"), 'CartItem'), stryMutAct_9fa48("9") ? {} : (stryCov_9fa48("9"), {
  quantity: stryMutAct_9fa48("10") ? {} : (stryCov_9fa48("10"), {
    type: DataTypes.INTEGER,
    allowNull: stryMutAct_9fa48("11") ? true : (stryCov_9fa48("11"), false),
    defaultValue: 1
  })
}));
CartItem.belongsTo(Cart, stryMutAct_9fa48("12") ? {} : (stryCov_9fa48("12"), {
  foreignKey: stryMutAct_9fa48("13") ? "" : (stryCov_9fa48("13"), 'cartId')
}));
CartItem.belongsTo(Product, stryMutAct_9fa48("14") ? {} : (stryCov_9fa48("14"), {
  foreignKey: stryMutAct_9fa48("15") ? "" : (stryCov_9fa48("15"), 'productId')
}));
module.exports = CartItem;