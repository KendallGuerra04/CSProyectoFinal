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
  app,
  sequelize
} = require('./app');
const PORT = stryMutAct_9fa48("107") ? process.env.PORT && 3000 : stryMutAct_9fa48("106") ? false : stryMutAct_9fa48("105") ? true : (stryCov_9fa48("105", "106", "107"), process.env.PORT || 3000);
sequelize.sync(stryMutAct_9fa48("108") ? {} : (stryCov_9fa48("108"), {
  alter: stryMutAct_9fa48("109") ? false : (stryCov_9fa48("109"), true)
})) // or use { alter: true } for less destructive changes
.then(() => {
  if (stryMutAct_9fa48("110")) {
    {}
  } else {
    stryCov_9fa48("110");
    app.listen(PORT, () => {
      if (stryMutAct_9fa48("111")) {
        {}
      } else {
        stryCov_9fa48("111");
        console.log(stryMutAct_9fa48("112") ? `` : (stryCov_9fa48("112"), `Server is running on http://localhost:${PORT}`));
        console.log(stryMutAct_9fa48("113") ? "" : (stryCov_9fa48("113"), 'Database synced successfully'));
      }
    });
  }
}).catch(error => {
  if (stryMutAct_9fa48("114")) {
    {}
  } else {
    stryCov_9fa48("114");
    console.error(stryMutAct_9fa48("115") ? "" : (stryCov_9fa48("115"), 'Unable to sync database:'), error);
  }
});