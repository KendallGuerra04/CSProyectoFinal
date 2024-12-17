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
  Sequelize
} = require('sequelize');
if (stryMutAct_9fa48("23") ? process.env.NODE_ENV !== 'test' : stryMutAct_9fa48("22") ? false : stryMutAct_9fa48("21") ? true : (stryCov_9fa48("21", "22", "23"), process.env.NODE_ENV === (stryMutAct_9fa48("24") ? "" : (stryCov_9fa48("24"), 'test')))) {
  if (stryMutAct_9fa48("25")) {
    {}
  } else {
    stryCov_9fa48("25");
    const sequelize = new Sequelize(stryMutAct_9fa48("26") ? {} : (stryCov_9fa48("26"), {
      dialect: stryMutAct_9fa48("27") ? "" : (stryCov_9fa48("27"), 'sqlite'),
      storage: stryMutAct_9fa48("28") ? "" : (stryCov_9fa48("28"), ':memory:'),
      logging: stryMutAct_9fa48("29") ? true : (stryCov_9fa48("29"), false)
    }));
    module.exports = stryMutAct_9fa48("30") ? {} : (stryCov_9fa48("30"), {
      sequelize
    });
  }
} else {
  if (stryMutAct_9fa48("31")) {
    {}
  } else {
    stryCov_9fa48("31");
    const sequelize = new Sequelize(stryMutAct_9fa48("32") ? {} : (stryCov_9fa48("32"), {
      dialect: stryMutAct_9fa48("33") ? "" : (stryCov_9fa48("33"), 'sqlite'),
      storage: stryMutAct_9fa48("34") ? "" : (stryCov_9fa48("34"), './db.sqlite')
    }));
    module.exports = stryMutAct_9fa48("35") ? {} : (stryCov_9fa48("35"), {
      sequelize
    });
  }
}