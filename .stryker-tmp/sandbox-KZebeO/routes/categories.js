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
const express = require('express');
const Category = require('../models/category');
const router = express.Router();

// Create a category
router.post(stryMutAct_9fa48("76") ? "" : (stryCov_9fa48("76"), '/'), async (req, res) => {
  if (stryMutAct_9fa48("77")) {
    {}
  } else {
    stryCov_9fa48("77");
    try {
      if (stryMutAct_9fa48("78")) {
        {}
      } else {
        stryCov_9fa48("78");
        const category = await Category.create(req.body);
        res.status(201).json(category);
      }
    } catch (error) {
      if (stryMutAct_9fa48("79")) {
        {}
      } else {
        stryCov_9fa48("79");
        res.status(400).json(stryMutAct_9fa48("80") ? {} : (stryCov_9fa48("80"), {
          error: error.message
        }));
      }
    }
  }
});

// Get all categories
router.get(stryMutAct_9fa48("81") ? "" : (stryCov_9fa48("81"), '/'), async (req, res) => {
  if (stryMutAct_9fa48("82")) {
    {}
  } else {
    stryCov_9fa48("82");
    const categories = await Category.findAll();
    res.json(categories);
  }
});
module.exports = router;